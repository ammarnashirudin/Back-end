import { Router } from "express";
import { 
    registerTenantController,
    registerUserController,
    verifyEmailAndSetPasswordController,
    socialRegisterTenantController,
    socialRegisterUserController,
 } from "../controllers/auth.controllers";

const authRouter = Router();

authRouter.post("/register-user", registerUserController);
authRouter.post("/register-tenant", registerTenantController);
authRouter.post("/verify-email", verifyEmailAndSetPasswordController);
authRouter.post("/social-register-user", socialRegisterUserController);
authRouter.post("/social-register-tenant", socialRegisterTenantController);

 export default authRouter;