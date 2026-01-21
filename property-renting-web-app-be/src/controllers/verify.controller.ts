
import { Request, Response, NextFunction } from "express";
import { 
    verifyEmailAndSetPasswordService,
    resendVerificationEmailService,
 } from "../services/verify.service";


export async function verifyEmailAndSetPasswordController(
  req: Request,
  res: Response,
  next: NextFunction,
){
  try {
    const { token, password } = req.body;
    
    await verifyEmailAndSetPasswordService( token, password );
    res.status(200).json({message: "account verified"});
  } catch (err) {
    next(err);
  };
};

export async function resendVerificationEmailController(
  req: Request,
  res: Response,
  next: NextFunction,
){
    try {
        const { email } = req.body;
        if(!email) {
            return res.status(400).json({message: "Email is required"});
        };
        await resendVerificationEmailService(email);
        res.status(200).json({message: "Verification email resent"});
    } catch (err) {
        next(err);
    }
}