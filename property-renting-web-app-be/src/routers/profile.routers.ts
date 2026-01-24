import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middlewares";
import { getMeController, updateEmailController, updateMeController, updatePasswordController } from "../controllers/profile.controllers";

const pofileRouter = Router();

pofileRouter.get("/", authMiddleware, getMeController);
pofileRouter.patch("/", authMiddleware, updateMeController);
pofileRouter.patch("/password", authMiddleware, updatePasswordController);
pofileRouter.patch("/email", authMiddleware, updateEmailController);

export default pofileRouter;
