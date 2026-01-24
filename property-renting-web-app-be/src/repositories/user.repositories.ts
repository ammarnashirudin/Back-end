import prisma from "../lib/prisma";

export function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export function findUserById(id: number) {
  return prisma.user.findUnique({ where: { id } });
}

export function createUser(data: {
  name: string;
  email: string;
  role: "USER" | "TENANT";
  password?: string | null;
  isVerified?: boolean;
  provider?: string | null;
}) {
  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      role: data.role,
      password: data.password ?? null,
      isVerified: data.isVerified ?? false,
      provider: data.provider ?? null,
    },
  });
}
