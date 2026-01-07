import { Router } from "express";
import { findAllPropertiesControllers, getPropertyDetailControllers } from "@/controllers/property.controllers";

const PropertyRouter = Router();

PropertyRouter.get("/",findAllPropertiesControllers);
PropertyRouter.get("/:propertyId", getPropertyDetailControllers);

export default PropertyRouter;
