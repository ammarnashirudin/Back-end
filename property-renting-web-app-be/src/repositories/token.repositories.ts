import prisma from "../lib/prisma";

export function createEmailToken(userId: number, token: string, expiresAt: Date) {
  return prisma.emailToken.create({
    data: { userId, token, expiresAt },
  });
}

export function findValidEmailToken(token: string) {
  return prisma.emailToken.findFirst({
    where: { token, used: false },
  });
}

export function invalidateEmailTokens(userId: number) {
  return prisma.emailToken.updateMany({
    where: { userId, used: false },
    data: { used: true },
  });
}

export function createResetToken(userId: number, token: string, expiresAt: Date) {
  return prisma.passwordResetToken.create({
    data: { userId, token, expiresAt },
  });
}

export function findValidResetToken(token: string) {
  return prisma.passwordResetToken.findFirst({
    where: { token, used: false },
  });
}

export function invalidateResetTokens(userId: number) {
  return prisma.passwordResetToken.updateMany({
    where: { userId, used: false },
    data: { used: true },
  });
}
