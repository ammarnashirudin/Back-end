import { 
    findUserByEmailRepositories,
    createEmailTokenRepositories,
    createTenantRepositories,
    createUserRepositories,
    verifyEmailAndSetPasswordRepositories,
} from "../repositories/auth.repositories";
import { 
    RegisterTenantInput,
    RegisterUserInput,
 } from "../type/auth.type";
 import { createCustomError } from "../utils/customError";
import crypto from "crypto";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import { generateAndSendEmailVerificationToken } from "../utils/verification";


export async function registerUserService(data : RegisterUserInput) {
    try {
        const exist = await findUserByEmailRepositories(data.email);
        if (exist) throw createCustomError(401, "User already exists");

        const user = await createUserRepositories({
            name: data.name,
            email: data.email,
            role: "USER",
        });
        await generateAndSendEmailVerificationToken(user.id, user.email);
        return user;
    } catch (err) {
        throw err;
    };
};

export async function registerTenantService(data : RegisterTenantInput) {
    try {
        const exist = await findUserByEmailRepositories(data.email);
        if (exist) throw createCustomError(401, "User already exists");

        const user =  await createUserRepositories({
            name: data.name,
            email: data.email,
            role: "TENANT",
        });
        await createTenantRepositories({
            userId: user.id,
            companyName: data.companyName,
            phoneNumber: data.phoneNumber,
        });

        await generateAndSendEmailVerificationToken(user.id, user.email);
        return user;
    } catch (err) {
        throw err;
    };
};

export async function socialRegisterUserService(data : RegisterUserInput) {
    try {
        const exist = await findUserByEmailRepositories(data.email);
        if (exist) throw createCustomError(401, "User already exists");

        const user = await createUserRepositories({
            name: data.name,
            email: data.email,
            role: "USER",
        });
        await generateAndSendEmailVerificationToken(user.id, user.email);
        return user;
    } catch (err) {
        throw err;
    };
};

export async function socialRegisterTenantService(data : RegisterTenantInput) {
    try {
        const exist = await findUserByEmailRepositories(data.email);
        if (exist) throw createCustomError(401, "User already exists");

        const user =  await createUserRepositories({
            name: data.name,
            email: data.email,
            role: "TENANT",
        });
        await createTenantRepositories({
            userId: user.id,
            companyName: data.companyName,
            phoneNumber: data.phoneNumber,
        });
        await generateAndSendEmailVerificationToken(user.id, user.email);
        return user;
    } catch (err) {
        throw err;
    };
};


export async function verifyEmailAndSetPasswordService(
    token : string, 
    password : string,
) {
    try {
       const emailToken = await verifyEmailAndSetPasswordRepositories(token);
         if (!emailToken) throw createCustomError(401, "Invalid token");
         if (emailToken.expiresAt < new Date()) {
            throw createCustomError(401, "Token has expired");
         };
         const hashed = await bcrypt.hash(password, 10);
         await prisma.$transaction([
            prisma.user.update({
                where: {id: emailToken.userId},
                data: {
                    isVerified: true,
                    password: hashed,
                },
            }),
            prisma.emailToken.update({
                where: {id: emailToken.id},
                data: {used: true},
            }),
         ]);
    } catch (err) {
        throw err;
    };
};
