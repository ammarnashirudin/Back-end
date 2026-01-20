import { Router } from "express";
import { 
    findRoomByPropertyController,
    updateRoomController,
    createRoomController,
    deleteRoomController,
 } from "../controllers/room.controller";
import { 
    roleGuard,
    authMiddleware,
    verifiedMiddleware,
 } from "../middlewares/auth.middlewares";

 const roomsRouter = Router();

 roomsRouter.get("'/property/:propertyId", authMiddleware, verifiedMiddleware, roleGuard(["USER"]),findRoomByPropertyController);
 roomsRouter.post("/", authMiddleware, verifiedMiddleware, roleGuard(["TENANT"]),createRoomController);
 roomsRouter.put("/:id", authMiddleware, verifiedMiddleware, roleGuard(["TENANT"]),updateRoomController);
 roomsRouter.delete("/:id", authMiddleware, verifiedMiddleware, roleGuard(["TENANT"]),deleteRoomController);

 export default roomsRouter;