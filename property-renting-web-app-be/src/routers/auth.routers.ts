import { Router } from "express";
import { 
    registerTenantController,
    registerUserController,
    verifyEmailController,
 } from "../controllers/auth.controllers";

 const authRouter = Router();

 authRouter.post("/register", registerUserController);
 authRouter.post("/tenant/register", registerTenantController);
 authRouter.post("/verify-email", verifyEmailController);

 export default authRouter;