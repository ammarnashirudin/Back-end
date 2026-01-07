import { Router } from "express";
import { findAllPropertiesControllers } from "@/controllers/property.controllers";

const PropertyRouter = Router();

PropertyRouter.get("/",findAllPropertiesControllers);


export default PropertyRouter;
