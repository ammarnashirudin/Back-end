import { getUserByEmailRepositories, createUser, loginGoogleRepositories } from "../repositories/auth.repositories";
import { hashSync, genSaltSync, compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import path from "path";
import fs from "fs";
import handlebars from "handlebars";
import prisma from "../lib/prisma";
import { createCustomError } from "../utils/customError";
import { ROLE } from "../generated/prisma/enums";
import { SECRET_KEY } from "../configs/env.configs";
import { Prisma } from "../generated/prisma/client";
import { transporter } from "../helpers/nodemailer";


export async function loginService(
    email : string,
    password : string,
    Role : "USER" | "TENANT"
) {
    try {
        const user = await getUserByEmailRepositories(email);
        if(!user) throw createCustomError(401, "User not found");

        if(user.role !== Role) throw createCustomError(401, "Invalid role access");

        if(!user.password) throw createCustomError(401, "Use sosial login");

        const isValid = compareSync(password, user.password);
        if(!isValid) throw createCustomError(401, "Invalid password");

        const payLoad = {
            email : user.email,
            name : user.name,
            ROLE : user.role,
        };
        return {
            accessToken : sign(payLoad, SECRET_KEY, {expiresIn: "10m"}),
            refreshToken : sign(payLoad, SECRET_KEY, {expiresIn : "30d"}),
        };
    } catch (err) {
        throw err;
    };
};

export async function loginGoogleService(
    email : string,
    name : string,
    role : "USER" | "TENANT",
) {
    try {
        let user = await loginGoogleRepositories(email);
        if(!user) {
            user = await prisma.user.create({
                data : {
                    email,
                    name,
                    role,
                    isVerified: true,
                    password: null,
                },
            });
        }

        if(user.role !== role) throw createCustomError(401, "Role invalid");

        const payLoad = {
            email : user.email,
            name : user.name,
            ROLE : user.role,
        };
        return {
            accessToken : sign(payLoad, SECRET_KEY, {expiresIn: "10m"}),
            refreshToken : sign(payLoad, SECRET_KEY, {expiresIn : "30d"}),
        };
    } catch (err) {
        throw err;
    };
};

export async function registerService(params: Prisma.UserCreateInput) {
    try {
        const targetPath = path.join(
            __dirname,
            "../templates",
            "registration.hbs"
        );

        const isExist = await getUserByEmailRepositories(params.email);
        if (isExist) throw createCustomError(401, "Email already exist");

        const salt = genSaltSync(10);
        const hashedPassword = hashSync(params.password!, salt);

        return prisma.$transaction(async (tx) => {
            const user = await createUser(tx, {
                email: params.email,
                password: hashedPassword,
                role: params.role,
                name: params.name,
            });

            const templateSrc = fs.readFileSync(targetPath, "utf-8");
            const compiledTemplate = handlebars.compile(templateSrc);
            const html = compiledTemplate({ email: user.email });

            await transporter.sendMail({
                to: user.email,
                subject: "Thank you for joining us",
                html,
            });

        return user;
        });
        
    } catch (err) {
        throw err;
    };  
};