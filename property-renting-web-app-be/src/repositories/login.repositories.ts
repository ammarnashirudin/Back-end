import { Prisma } from "../generated/prisma/client";
import prisma from "../lib/prisma";


export async function getUserByEmail(email : string) {
    try {
        const user = await prisma.user.findUnique({
            where : {
                email,
            },
        });
        return user;
    } catch (err) {
        throw err;
    }
};


export async function createUser(
    tx : Prisma.TransactionClient,
    data : Prisma.UserCreateInput
) {
    return tx.user.create({
        select : {
            email : true,
        },
        data,
    })
}