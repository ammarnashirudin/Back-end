import { Router } from "express";
import { 
    findAvailabiltyController,
    createAvaillabilityController,
    updateAvailabilityController,
    deleteAvailabilityController,
 } from "../controllers/availability.controllers";
import { 
    authMiddleware,
    verifiedMiddleware,
    roleGuard,
} from "../middlewares/auth.middlewares";


 const availabilityRouter = Router();

 availabilityRouter.get("/room/:roomId", authMiddleware, verifiedMiddleware, roleGuard(["TENANT"]),findAvailabiltyController);
 availabilityRouter.post("/",authMiddleware, verifiedMiddleware, roleGuard(["TENANT"]), createAvaillabilityController);
 availabilityRouter.put("/:id",authMiddleware, verifiedMiddleware, roleGuard(["TENANT"]) ,updateAvailabilityController);
 availabilityRouter.delete("/:id",authMiddleware, verifiedMiddleware, roleGuard(["TENANT"]), deleteAvailabilityController);

 export default availabilityRouter;