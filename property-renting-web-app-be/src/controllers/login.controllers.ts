import { Request, Response, NextFunction } from "express";
import { loginWithEmailService } from "../services/login.service";
import { socialloginService } from "../services/login.service";

export async function loginWithEmailController(
    req: Request,
    res: Response,
    next: NextFunction
){
    try {
        const { email, password} = req.body;
        const data = await loginWithEmailService(
            email, 
            password, 
            "USER"
        );
        res.status(200).json({data, message: "Login successful"});
    } catch (err) {
        next(err);
    };
};

export async function tenantLoginController(
    req: Request,
    res: Response,
    next: NextFunction,
){
    try {
        const { email, password } = req.body;
        const data = await loginWithEmailService(
            email, 
            password, 
            "TENANT"
        );
        res.status(200).json({data, message: "Login successful"});
    } catch (err) {
        next(err);
    };
};

export async function socialLoginController(
    req: Request,
    res: Response,
    next: NextFunction,
){
    try {
        const { email, name, role } = req.body;
        const data = await socialloginService(
            email, 
            name, 
            role
        );
        res.status(200).json({data, message: "Login successful"});
    } catch (err) {
        next(err);
    };
};