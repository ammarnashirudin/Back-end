import { Request, Response, NextFunction } from "express";
import { createCustomError } from "../utils/customError";
import {verify} from "jsonwebtoken";
import { SECRET_KEY } from "../configs/env.configs";
import prisma from "../lib/prisma";

export interface Token{
    email : string;
    name : string;
    role : string;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: Token;
  }
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer "))
      throw createCustomError(401, "Unauthorized");

    const token = authHeader.split(" ")[1];
    const decoded = verify(token, SECRET_KEY) as Token;
    console.log(decoded);
    req.user = decoded;

    next();
  } catch (err) {
    next(err);
  }
}

export function roleGuard(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) throw createCustomError(401, "invalid token");

      if (!allowedRoles.includes(user?.role))
        throw createCustomError(401, "Insufficient permissions");

      next();
    } catch (err) {
      next(err);
    }
  };
}

export async function verifiedMiddleware(
  req: Request, 
  res: Response, 
  next: NextFunction  ) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.user?.email,
      },
    });
    if(!user || !user.isVerified){
      throw createCustomError(401, "User is not verified");
    }
  } catch (err) {
    next(err);
  }
}