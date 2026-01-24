import { NextFunction, Request, Response } from "express";
import { createCustomError } from "../utils/customError";

export function roleMiddleware(roles: Array<"USER" | "TENANT">) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return next(createCustomError(401, "Unauthorized"));

    if (!roles.includes(req.user.role)) {
      return next(createCustomError(403, "Forbidden: invalid role"));
    }

    next();
  };
}
