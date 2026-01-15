import { Router } from "express";
import { 
    findRoomByPropertyController,
    updateRoomController,
    createRoomController,
    deleteRoomController,
 } from "../controllers/room.controller";

 const roomsRouter = Router();

 roomsRouter.get("'/property/:propertyId", findRoomByPropertyController);
 roomsRouter.post("/", createRoomController);
 roomsRouter.put("/:id", updateRoomController);
 roomsRouter.delete("/:id", deleteRoomController);

 export default roomsRouter;