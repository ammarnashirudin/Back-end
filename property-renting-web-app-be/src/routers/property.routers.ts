import { Router } from "express";
import { 
    findAllPropertiesControllers, 
    getPropertyDetailControllers,
    createCategoryControllers,
    updateCategoryControllers,
    deleteCategoryControllers,
    findAllCategoriesControllers,
    findTenantPropertiesControllers,
    createPropertyControllers,
    deletePropertyControllers,
    updatePropertyControllers,
} from "../controllers/property.controllers";

const PropertyRouter = Router();

PropertyRouter.get("/",findAllPropertiesControllers);
PropertyRouter.get("/:propertyId", getPropertyDetailControllers);
PropertyRouter.post("/createCategories", createCategoryControllers);
PropertyRouter.put("/categories/:categoryId", updateCategoryControllers);
PropertyRouter.delete("/categories/:categoryId", deleteCategoryControllers);
PropertyRouter.get("/allCategories", findAllCategoriesControllers);
PropertyRouter.get("/tenant/:tenantId", findTenantPropertiesControllers);
PropertyRouter.post("/tenant/:tenantId", createPropertyControllers);
PropertyRouter.put("/tenant/:tenantId/property/:propertyId", updatePropertyControllers);
PropertyRouter.delete("/tenant/:tenantId/property/:propertyId", deletePropertyControllers);

export default PropertyRouter;
