import bcrypt from "bcrypt";
import  Jwt  from "jsonwebtoken";
import { findUserByEmailRepositories } from "../repositories/auth.repositories";
import { findLoginByEmailRepositories } from "../repositories/login.repositories";
import { SECRET_KEY } from "../configs/env.configs";
import { createCustomError } from "../utils/customError";
import prisma from "../lib/prisma";

export async function loginWithEmailService(
    email : string, 
    password : string,
    role : "USER" | "TENANT",
) {
    try {
        const user = await findLoginByEmailRepositories(email);
        if (!user) throw createCustomError(401, "User not found");
        if (!user.password) throw createCustomError(401, "Please login using social login");
        if (!user.isVerified) throw createCustomError(401, "Please verify your email first");
        if (user.role !== role) throw createCustomError(401, "Invalid role");

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw createCustomError(401, "Invalid password");

        const token = Jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            SECRET_KEY,
            { expiresIn: "3d" }
        );
        return {
            token,
            role : user.role,
            redirect :
            user.role 
            === "TENANT" 
            ? "/tenant/dashboard" 
            : "/user/home",
        }
    } catch (err) {
        throw err;
    };
};


export async function socialloginService(
    email : string, 
    name : string,
    role : "USER" | "TENANT",
) {
    try {
        let user = await findUserByEmailRepositories(email);

        if (!user){
            user = await prisma.user.create({
                data:{
                    email,
                    name,
                    role,
                    isVerified : true,
                    password : null,
                }
            });
        }

        if (user.role !== role) throw createCustomError(401, "Invalid role");

        const token = Jwt.sign(
            {
                id: user.id, role : user.role,
            },
            SECRET_KEY,
            { expiresIn: "1d" }
        );
        
        return {
            token,
            role : user.role,
            redirect :
            user.role 
            === "TENANT" 
            ? "/tenant/dashboard" 
            : "/user/home",
        }
    } catch (err) {
        throw err;
    };
};