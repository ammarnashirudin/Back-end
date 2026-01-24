import crypto from "crypto";
import { createEmailToken, invalidateEmailTokens } from "../repositories/token.repositories";
import { sendVerificationEmail } from "../helpers/nodemailer";

export async function generateAndSendEmailVerificationToken(userId: number, email: string) {
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  await invalidateEmailTokens(userId);
  await createEmailToken(userId, token, expiresAt);
  await sendVerificationEmail(email, token);

  return token;
}
