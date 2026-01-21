import { Router } from "express";
import { 
    resendVerificationEmailController,
    verifyEmailAndSetPasswordController
 } from "../controllers/verify.controller";


const verifyRouter = Router();

verifyRouter.post("/verify-email", verifyEmailAndSetPasswordController);
verifyRouter.post("/resend-verification-email", resendVerificationEmailController);

export default verifyRouter;