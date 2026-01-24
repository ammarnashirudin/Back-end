import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middlewares";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import { completeTenantProfileController } from "../controllers/tenant.controllers";

const tenantRouter = Router();

tenantRouter.post(
  "/complete-profile",
  authMiddleware,
  roleMiddleware(["TENANT"]),
  completeTenantProfileController
);

export default tenantRouter;
