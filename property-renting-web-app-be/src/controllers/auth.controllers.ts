import { Request, Response, NextFunction } from "express";
import {
  registerUserService,
  registerTenantService,
  verifyEmailAndSetPasswordService,
  resendVerificationService,
  loginEmailService,
  socialLoginService,
  requestResetPasswordService,
  confirmResetPasswordService,
} from "../services/auth.service";

export async function registerUserController(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await registerUserService(req.body);
    res.status(201).json({ message: "User registered, please verify email", user });
  } catch (err) {
    next(err);
  }
}

export async function registerTenantController(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await registerTenantService(req.body);
    res.status(201).json({ message: "Tenant registered, please verify email", user });
  } catch (err) {
    next(err);
  }
}

export async function verifyEmailController(req: Request, res: Response, next: NextFunction) {
  try {
    const { token, password } = req.body;
    const result = await verifyEmailAndSetPasswordService(token, password);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function resendVerificationController(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.body;
    const result = await resendVerificationService(email);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function loginUserController(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const result = await loginEmailService(email, password, "USER");
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function loginTenantController(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const result = await loginEmailService(email, password, "TENANT");
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function socialLoginUserController(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await socialLoginService({ ...req.body, role: "USER" });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function socialLoginTenantController(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await socialLoginService({ ...req.body, role: "TENANT" });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function resetPasswordRequestController(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.body;
    const result = await requestResetPasswordService(email);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function resetPasswordConfirmController(req: Request, res: Response, next: NextFunction) {
  try {
    const { token, newPassword } = req.body;
    const result = await confirmResetPasswordService(token, newPassword);
    res.json(result);
  } catch (err) {
    next(err);
  }
}
