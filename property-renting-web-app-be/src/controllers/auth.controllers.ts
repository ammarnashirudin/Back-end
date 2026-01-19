import { Request, Response, NextFunction } from "express";
import { registerTenantService, registerUserService, verifyEmailService } from "../services/auth.service";


export async function registerUserController(req: Request, res : Response, next: NextFunction) {
  try {
    const result = await registerUserService(req.body);
    res.status(201).json(result);
  } catch (err) {
    next (err);
  }
};

export async function registerTenantController(req: Request, res : Response, next: NextFunction) {
  try {
    const result = await registerTenantService(req.body);
    res.status(201).json(result);
  } catch (err) {
    next (err);
  }
}

export async function verifyEmailController(req: Request, res : Response, next: NextFunction) {
  try {
    const result = await verifyEmailService(req.body.token, req.body.password);
    res.status(201).json(result);
  } catch (err) {
    next (err);
  }
}
