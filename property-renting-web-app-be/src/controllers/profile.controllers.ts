import { Request, Response, NextFunction } from "express";
import { getMeService, updateEmailService, updateMeService, updatePasswordService } from "../services/profile.service";

export async function getMeController(req: Request, res: Response, next: NextFunction) {
  try {
    const me = await getMeService(req.user!.id);
    res.json(me);
  } catch (err) {
    next(err);
  }
}

export async function updateMeController(req: Request, res: Response, next: NextFunction) {
  try {
    const updated = await updateMeService(req.user!.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function updatePasswordController(req: Request, res: Response, next: NextFunction) {
  try {
    const { oldPassword, newPassword } = req.body;
    const updated = await updatePasswordService(req.user!.id, oldPassword, newPassword);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function updateEmailController(req: Request, res: Response, next: NextFunction) {
  try {
    const { newEmail } = req.body;
    const result = await updateEmailService(req.user!.id, newEmail);
    res.json(result);
  } catch (err) {
    next(err);
  }
}
