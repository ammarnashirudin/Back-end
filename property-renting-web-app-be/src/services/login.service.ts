import { getUserByEmail, createUser } from "../repositories/login.repositories";
import { hashSync, genSaltSync, compare, compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import path from "path";
import fs, { access } from "fs";
import handlebars from "handlebars";
import prisma from "../lib/prisma";
import { createCustomError } from "../utils/customError";
import { ROLE } from "../generated/prisma/enums";
import { SECRET_KEY } from "../configs/env.configs";
import { Prisma } from "../generated/prisma/client";

import { userInfo } from "os";
import { email } from "zod";

export async function loginService(email : string, password : string) {
    try {
        const  user = await getUserByEmail(email);
        if(!user) throw createCustomError(401, "Invalid Email");

        const isValid = compareSync(password, user.password);
        if (!isValid) throw createCustomError(401, "Invalid Password");

        const payLoad = {
            email : user.email,
            name : user.name,
            ROLE : user.role,
        };
        return {
            accessToken : sign(payLoad, SECRET_KEY, {expiresIn: "10m"}),
            refreshToken : sign(payLoad, SECRET_KEY, {expiresIn : "30d"}),
        }
    } catch (err) {
        throw err
    }
}

export async function registerService(params:Prisma.UserCreateInput) {
    try {
        const targetPath = path.join(
            __dirname,
            "../templates",
            "registration.hbs"
        );
        const isExist = await getUserByEmail(params.email);
        if(!isExist) throw createCustomError(401, "Email already exist");

        const salt = genSaltSync(20);
        const hashedPassword = hashSync(params.password, salt);

        return prisma.$transaction(async(tx)=>{
            const user = await createUser(tx,{
                email : params.email,
                password : hashedPassword,
            });

            const templateSrc = fs.readFileSync(targetPath, "utf-8");
            const compiledTemplate = handlebars.compile(templateSrc);
            const html = compiledTemplate({email : user.email });

            await transporter.sen

        return user;
        });
    
    } catch (err) {
        throw err;
    }
}