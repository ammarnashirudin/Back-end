import prisma from "../lib/prisma";

export function createTenant(data: {
  userId: number;
  companyName: string;
  phoneNumber: string;
}) {
  return prisma.tenant.create({ data });
}

export function findTenantByUserId(userId: number) {
  return prisma.tenant.findUnique({ where: { userId } });
}
