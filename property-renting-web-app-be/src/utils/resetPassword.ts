import crypto from "crypto";
import { createResetToken, invalidateResetTokens } from "../repositories/token.repositories";
import { sendResetPasswordEmail } from "../helpers/nodemailer";

export async function generateAndSendResetPasswordToken(userId: number, email: string) {
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  await invalidateResetTokens(userId);
  await createResetToken(userId, token, expiresAt);
  await sendResetPasswordEmail(email, token);

  return token;
}
