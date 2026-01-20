import { Router } from "express";
import { 
    loginWithEmailController,
    tenantLoginController,
    socialLoginController,
  } from "../controllers/login.controllers";

const loginRouter = Router();

loginRouter.post("/user-login", loginWithEmailController);
loginRouter.post("/tenant-login", tenantLoginController);
loginRouter.post("/social-login", socialLoginController);

export default loginRouter;