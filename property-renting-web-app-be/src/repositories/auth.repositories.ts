import { tr } from "zod/v4/locales";
import prisma from "../lib/prisma";
import { createUser, createTenant, createEmailToken } from "../type/auth.type";

export async function findUserByEmail(email: string) {
    try {
        return await prisma.user.findUnique({where:{email}});
    } catch (err) {
        throw err;
    };
};


export async function createUser(data : createUser) {
    try {
        return await prisma.user.create({data});
    } catch (err) {
        throw err;
    };
};


export async function verifyUser(
    userId : number, 
    password : string
) {
    try {
        return await prisma.user.update({
            where : {id: userId},
            data : {
                password,
                isVerified:true
            },
        });
    } catch (err) {
        throw err;
    };
};


export async function createTenant(data : createTenant) {
    try {
        return await prisma.tenant.create({data});
    } catch (err) {
        throw err;
    };
};


export async function createEmailToken(
    userId : number,
    token : string,
    expiresAt : Date,
) {
    try {
        return await prisma.emailToken.create({data:{userId, token, expiresAt}});
    } catch (err) {
        throw err;
    };
};


export async function findEmailToken(token : string) {
    try {
        return await prisma.emailToken.findUnique({where: {token}});
    } catch (err) {
        throw err;
    };
};

export async function markTokenUsed(id : number) {
    try {
        return await prisma.emailToken.update({
            where :{id},
            data: {used:true},
        })
    } catch (err) {
        throw err;
    };
};



