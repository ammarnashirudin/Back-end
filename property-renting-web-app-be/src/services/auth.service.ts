import prisma from "../lib/prisma";
import { genSaltSync, hashSync, compareSync } from "bcrypt";
import { createCustomError } from "../utils/customError";
import { signJwt } from "../utils/jwt";
import { createTenant, findTenantByUserId } from "../repositories/tenant.repositories";
import { createUser, findUserByEmail } from "../repositories/user.repositories";
import { findValidEmailToken, findValidResetToken } from "../repositories/token.repositories";
import { generateAndSendEmailVerificationToken } from "../utils/verification";
import { generateAndSendResetPasswordToken } from "../utils/resetPassword";

export async function registerUserService(data: { name: string; email: string }) {
  const exist = await findUserByEmail(data.email);
  if (exist) throw createCustomError(400, "Email already registered");

  const user = await createUser({
    name: data.name,
    email: data.email,
    role: "USER",
    password: null,
    isVerified: false,
  });

  await generateAndSendEmailVerificationToken(user.id, user.email);
  return user;
}

export async function registerTenantService(data: {
  name: string;
  email: string;
  companyName: string;
  phoneNumber: string;
}) {
  const exist = await findUserByEmail(data.email);
  if (exist) throw createCustomError(400, "Email already registered");

  const user = await createUser({
    name: data.name,
    email: data.email,
    role: "TENANT",
    password: null,
    isVerified: false,
  });

  await createTenant({
    userId: user.id,
    companyName: data.companyName,
    phoneNumber: data.phoneNumber,
  });

  await generateAndSendEmailVerificationToken(user.id, user.email);
  return user;
}

export async function verifyEmailAndSetPasswordService(token: string, password: string) {
  if (password.length < 8) throw createCustomError(400, "Password must be at least 8 characters");

  const emailToken = await findValidEmailToken(token);
  if (!emailToken) throw createCustomError(401, "Invalid token");
  if (emailToken.expiresAt < new Date()) throw createCustomError(401, "Token expired");

  const salt = genSaltSync(10);
  const hashed = hashSync(password, salt);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: emailToken.userId },
      data: { isVerified: true, password: hashed },
    }),
    prisma.emailToken.update({
      where: { id: emailToken.id },
      data: { used: true },
    }),
  ]);

  return { message: "Verified successfully. Please login again." };
}

export async function resendVerificationService(email: string) {
  const user = await findUserByEmail(email);
  if (!user) throw createCustomError(404, "User not found");
  if (user.isVerified) throw createCustomError(400, "User already verified");

  await generateAndSendEmailVerificationToken(user.id, user.email);
  return { message: "Verification email resent" };
}

export async function loginEmailService(email: string, password: string, role: "USER" | "TENANT") {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw createCustomError(401, "User not found");
  if (!user.password) throw createCustomError(401, "Please login using social login");
  if (!user.isVerified) throw createCustomError(401, "Please verify your email first");
  if (user.role !== role) throw createCustomError(403, "Invalid role");

  const match = compareSync(password, user.password);
  if (!match) throw createCustomError(401, "Invalid password");

  const token = signJwt({ id: user.id, role: user.role });

  return {
    token,
    role: user.role,
    redirect: user.role === "TENANT" ? "/tenant/dashboard" : "/user/home",
  };
}

export async function socialLoginService(data: {
  email: string;
  name: string;
  provider: string;
  role: "USER" | "TENANT";
}) {
  let user = await findUserByEmail(data.email);

  if (!user) {
    user = await createUser({
      email: data.email,
      name: data.name,
      role: data.role,
      password: null,
      isVerified: true,
      provider: data.provider,
    });
  }

  if (user.role !== data.role) throw createCustomError(403, "Invalid role");

  // TENANT must complete profile if missing
  if (user.role === "TENANT") {
    const tenant = await findTenantByUserId(user.id);
    if (!tenant) {
      const token = signJwt({ id: user.id, role: user.role });
      return { token, role: user.role, redirect: "/tenant/complete-profile" };
    }
  }

  const token = signJwt({ id: user.id, role: user.role });
  return {
    token,
    role: user.role,
    redirect: user.role === "TENANT" ? "/tenant/dashboard" : "/user/home",
  };
}

export async function requestResetPasswordService(email: string) {
  const user = await findUserByEmail(email);
  if (!user) throw createCustomError(404, "User not found");

  if (!user.password) {
    throw createCustomError(400, "Social login account cannot reset password");
  }

  await generateAndSendResetPasswordToken(user.id, user.email);
  return { message: "Reset password email sent" };
}

export async function confirmResetPasswordService(token: string, newPassword: string) {
  if (newPassword.length < 8) throw createCustomError(400, "Password must be at least 8 characters");

  const resetToken = await findValidResetToken(token);
  if (!resetToken) throw createCustomError(401, "Invalid token");
  if (resetToken.expiresAt < new Date()) throw createCustomError(401, "Token expired");

  const salt = genSaltSync(10);
  const hashed = hashSync(newPassword, salt);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: hashed },
    }),
    prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { used: true },
    }),
  ]);

  return { message: "Password updated. Please login again." };
}
