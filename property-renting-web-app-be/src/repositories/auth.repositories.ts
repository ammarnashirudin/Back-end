import prisma from "../lib/prisma";

export async function findUserByEmailRepositories(email: string) {
    try {
        return await prisma.user.findUnique({where:{email}});
    } catch (err) {
        throw err;
    };
};

export async function createUserRepositories(data : {
    name: string; 
    email: string;
    role : "USER" | "TENANT";
}) {
    try {
        return await prisma.user.create({
            data :{
                ...data,
                password : null,
                isVerified : false,
            }});
    } catch (err) {
        throw err;
    };
};

export async function createTenantRepositories(data : {
    userId: number;
    companyName: string;
    phoneNumber: string;
}) {
    try {
     return await prisma.tenant.create({data});   
    } catch (err) {
        throw err;
    };
};

export async function createEmailTokenRepositories(
    userId: number,
    token: string,
    expiresAt: Date
) {
    try {
        return await prisma.emailToken.create({data:{
            userId,
            token,
            expiresAt
        }});    
    } catch (err) {
        throw err;
    };
};

export async function verifyEmailAndSetPasswordRepositories(
    token: string, 

) {
    try {
        const emailToken = await prisma.emailToken.findUnique({
            where: { token, used: false },
            include: { user: true },
        });
        return emailToken;
    } catch (err) {
        throw err;
    };   
};