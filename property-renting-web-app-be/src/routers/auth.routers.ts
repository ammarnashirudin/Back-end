import { Router } from "express";
import {
  registerUserController,
  registerTenantController,
  verifyEmailController,
  resendVerificationController,
  loginUserController,
  loginTenantController,
  socialLoginUserController,
  socialLoginTenantController,
  resetPasswordRequestController,
  resetPasswordConfirmController,
} from "../controllers/auth.controllers";

const authRouter = Router();

authRouter.post("/register/user", registerUserController);
authRouter.post("/register/tenant", registerTenantController);

authRouter.post("/verify-email", verifyEmailController);
authRouter.post("/resend-verification", resendVerificationController);

authRouter.post("/login/user", loginUserController);
authRouter.post("/login/tenant", loginTenantController);

authRouter.post("/social-login/user", socialLoginUserController);
authRouter.post("/social-login/tenant", socialLoginTenantController);

authRouter.post("/reset-password", resetPasswordRequestController);
authRouter.post("/reset-password/confirm", resetPasswordConfirmController);

export default authRouter;
