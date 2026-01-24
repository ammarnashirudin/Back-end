import { Request, Response, NextFunction } from "express";
import { createCustomError } from "../utils/customError";
import prisma from "../lib/prisma";
import { verifyJwt } from "../utils/jwt";

export interface Token{
    id : number;
    email : string;
    name : string;
    role : string;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: Token;
  }
}


declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: "USER" | "TENANT";
      };
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      throw createCustomError(401, "Unauthorized");
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyJwt(token);

    req.user = { id: payload.id, role: payload.role };
    next();
  } catch (err) {
    next(createCustomError(401, "Invalid token"));
  }
}
