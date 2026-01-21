import { Router } from "express";
import { 
    registerTenantController,
    registerUserController,
    socialRegisterTenantController,
    socialRegisterUserController,
 } from "../controllers/auth.controllers";

const authRouter = Router();

authRouter.post("/register-user", registerUserController);
authRouter.post("/register-tenant", registerTenantController);
authRouter.post("/social-register-user", socialRegisterUserController);
authRouter.post("/social-register-tenant", socialRegisterTenantController);

 export default authRouter;