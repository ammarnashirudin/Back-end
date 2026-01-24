import { NextFunction, Request, Response } from "express";
import prisma from "../lib/prisma";
import { createCustomError } from "../utils/customError";

export async function verifiedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) throw createCustomError(401, "Unauthorized");

    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) throw createCustomError(404, "User not found");

    if (!user.isVerified) throw createCustomError(403, "User is not verified");

    next();
  } catch (err) {
    next(err);
  }
}
