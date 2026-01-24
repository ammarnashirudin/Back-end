import { Request, Response, NextFunction } from "express";
import { completeTenantProfileService } from "../services/tenant.service";

export async function completeTenantProfileController(req: Request, res: Response, next: NextFunction) {
  try {
    const tenant = await completeTenantProfileService(req.user!.id, req.body);
    res.status(201).json({ message: "Tenant profile completed", tenant });
  } catch (err) {
    next(err);
  }
}
