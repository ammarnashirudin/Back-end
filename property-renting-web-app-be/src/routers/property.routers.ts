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
import { 
    authMiddleware,
    roleGuard,
    verifiedMiddleware, 
} from "../middlewares/auth.middlewares";

const PropertyRouter = Router();

PropertyRouter.get("/",findAllPropertiesControllers);
PropertyRouter.get("/:propertyId", authMiddleware, verifiedMiddleware, roleGuard(["USER"]),getPropertyDetailControllers);
PropertyRouter.get("/allCategories",authMiddleware, verifiedMiddleware, roleGuard(["USER"]), findAllCategoriesControllers);
PropertyRouter.get("/tenant/:tenantId",authMiddleware, verifiedMiddleware, roleGuard(["USER"]), findTenantPropertiesControllers);
PropertyRouter.post("/createCategories",authMiddleware, verifiedMiddleware, roleGuard(["TENANT"]), createCategoryControllers);
PropertyRouter.put("/categories/:categoryId", authMiddleware, verifiedMiddleware, roleGuard(["TENANT"]),updateCategoryControllers);
PropertyRouter.delete("/categories/:categoryId", authMiddleware, verifiedMiddleware, roleGuard(["TENANT"]),deleteCategoryControllers);
PropertyRouter.post("/tenant/:tenantId", authMiddleware, verifiedMiddleware, roleGuard(["TENANT"]),createPropertyControllers);
PropertyRouter.put("/tenant/:tenantId/property/:propertyId",authMiddleware, verifiedMiddleware, roleGuard(["TENANT"]), updatePropertyControllers);
PropertyRouter.delete("/tenant/:tenantId/property/:propertyId",authMiddleware, verifiedMiddleware, roleGuard(["TENANT"]), deletePropertyControllers);

export default PropertyRouter;
