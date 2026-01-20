import prisma from "../lib/prisma";

export async function findLoginByEmailRepositories(email: string) {
    try {
        return await prisma.user.findUnique({
            where:{email},
            include: { tenants: true },
        });
    } catch (err) {
        throw err;
    };
};