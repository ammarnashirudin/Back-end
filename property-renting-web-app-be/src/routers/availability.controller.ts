import { Router } from "express";
import { 
    findAvailabiltyController,
    createAvaillabilityController,
    updateAvailabilityController,
    deleteAvailabilityController,
 } from "@/controllers/availability.controllers";

 const availabilityRouter = Router();

 availabilityRouter.get("/room/:roomId", findAvailabiltyController);
 availabilityRouter.post("/", createAvaillabilityController);
 availabilityRouter.put("/:id", updateAvailabilityController);
 availabilityRouter.delete("/:id", deleteAvailabilityController);

 export default availabilityRouter;