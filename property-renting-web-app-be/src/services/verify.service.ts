import bcrypt from "bcrypt";
import { verifyEmailAndSetPasswordRepositories } from "../repositories/auth.repositories";
import { createCustomError } from "../utils/customError";
import prisma from "../lib/prisma";
import { generateAndSendEmailVerificationToken } from "../utils/verification";

export async function verifyEmailAndSetPasswordService(
    token : string, 
    password : string,
) {
    try {
       const emailToken = await verifyEmailAndSetPasswordRepositories(token);
         if (!emailToken) throw createCustomError(401, "Invalid token");
         if (emailToken.expiresAt < new Date()) 
            throw createCustomError(401, "Token has expired");
        if(password.length < 8) throw createCustomError(400, "Password must be at least 8 characters long");

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

export async function resendVerificationEmailService(
    email : string,
) {
    try {
        const user = await prisma.user.findUnique({where:{email}});
        if (!user) throw createCustomError(404, "User not found");
        if (user.isVerified) throw createCustomError(400, "User is already verified");

        await prisma.emailToken.updateMany({
            where: {
                userId: user.id,
                used: false,
            },
            data: {
                used: true,
            },
        });
        await generateAndSendEmailVerificationToken(
            user.id, 
            user.email
        );
    } catch (err) {
        throw err;
    }
}