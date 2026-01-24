import prisma from "../lib/prisma";
import { createCustomError } from "../utils/customError";
import { generateAndSendEmailVerificationToken } from "../utils/verification";
import { genSaltSync, hashSync, compareSync } from "bcrypt";

export async function getMeService(userId: number) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: { tenants: true },
  });
}

export async function updateMeService(userId: number, data: { name?: string }) {
  return prisma.user.update({
    where: { id: userId },
    data: { name: data.name },
  });
}

export async function updatePasswordService(userId: number, oldPassword: string, newPassword: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw createCustomError(404, "User not found");
  if (!user.password) throw createCustomError(400, "Social login account cannot change password here");

  const match = compareSync(oldPassword, user.password);
  if (!match) throw createCustomError(400, "Old password incorrect");

  if (newPassword.length < 8) throw createCustomError(400, "Password must be at least 8 characters");

  const salt = genSaltSync(10);
  const hashed = hashSync(newPassword, salt);

  return prisma.user.update({
    where: { id: userId },
    data: { password: hashed },
  });
}

export async function updateEmailService(userId: number, newEmail: string) {
  const exist = await prisma.user.findUnique({ where: { email: newEmail } });
  if (exist) throw createCustomError(400, "Email already used");

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      email: newEmail,
      isVerified: false,
    },
  });

  await generateAndSendEmailVerificationToken(user.id, user.email);
  return { message: "Email updated. Please verify again." };
}
