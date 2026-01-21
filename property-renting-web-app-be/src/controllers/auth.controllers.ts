import { Request, Response, NextFunction } from "express";
import { 
  registerUserService, 
  registerTenantService,
  socialRegisterTenantService,
  socialRegisterUserService,
} from "../services/auth.service";


export async function registerUserController(
  req: Request,
  res: Response,
  next: NextFunction
){
  try {
    const user = await registerUserService(req.body);
    res.status(201).json({data:user ,message: "Verification email sent"});
  } catch (err) {
    next(err);
  };
};

export async function registerTenantController(
  req: Request,
  res: Response,
  next: NextFunction,
){
  try {
    const user = await registerTenantService(req.body);
    res.status(201).json({data:user ,message: "Verification email sent"});
  } catch (err) {
    next(err);
  };
};

export async function socialRegisterUserController(
  req: Request,
  res: Response,
  next: NextFunction
){
  try {
    const user = await socialRegisterUserService(req.body);
    res.status(201).json({data:user ,message: "Verification email sent"});
  } catch (err) {
    next(err);
  };
};

export async function socialRegisterTenantController(
  req: Request,
  res: Response,
  next: NextFunction,
){
  try {
    const user = await socialRegisterTenantService(req.body);
    res.status(201).json({data:user ,message: "Verification email sent"});
  } catch (err) {
    next(err);
  };
};

