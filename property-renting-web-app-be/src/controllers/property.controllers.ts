import { NextFunction, Request, Response } from "express";
import { 
    findAllPropertiesServices, 
    getPropertyDetailServices,
    createCategoryServices,
    updateCategoryServices,
    deleteCategoryServices,
    findAllCategoriesServices,
    findTenantPropertiesServices,
    createPropertyServices,
    updatePropertyServices,
    deletePropertyServices,
 } from "../services/property.service";

export async function findAllPropertiesControllers(req :  Request, res : Response, next : NextFunction) {
    try {
        const result = await findAllPropertiesServices({
        page : Number(req.query.page),
        limit : Number(req.query.limit),
        name : req.query.name as string,
        categoryid : Number(req.query.categoryid),
        sortby : req.query.sortby as 'name' | 'price',
        order : req.query.order as 'asc' | 'desc',
    });
    res.json(result);
    } catch (err) {
        next(err)
    }
    
}

export async function getPropertyDetailControllers(req : Request, res : Response, next : NextFunction) {
    try {
        const propertyId = Number(req.params.propertyId);
        const startDate = req.query.startDate as string;
        const data = await getPropertyDetailServices(propertyId, startDate);
        if (!data) {
        return res.status(404).json({message : "Property not found"});
    }
    res.json(data);
    } catch (err) {
        next(err);
    }
} 

export async function createCategoryControllers (req : Request, res : Response, next : NextFunction) {
    try {
        const {name} = req.body;
        const data = await createCategoryServices(name);
        res.status(201).json(data);  
    } catch (err) {
        next(err);
    };
};

export async function updateCategoryControllers (req : Request, res : Response, next : NextFunction) {
    try {
        const id = Number(req.params.categoryId);
        const {name} = req.body;
        const data = await updateCategoryServices(id, name);
        res.json(data);
        
    } catch (err) {
        next(err);
    }
    const id = Number(req.params.categoryId);
    const {name} = req.body;
    const data = await updateCategoryServices(id, name);
    res.json(data);
};

export async function deleteCategoryControllers (req : Request, res : Response, next : NextFunction) {
    try {
        const id = Number(req.params.categoryId);
        await deleteCategoryServices(id);
        res.status(204).json({message : "Category deleted"});
    } catch (err) {
        next(err);        
    };
};

export async function findAllCategoriesControllers (req : Request, res : Response, next : NextFunction) {
    try {
        const data = await findAllCategoriesServices();
        res.json(data);
    } catch (err) {
        next(err);
    };
};

export async function findTenantPropertiesControllers (req : Request, res : Response, next : NextFunction) {
    try {
        const tenantId = Number(req.params.tenantId);
        const data = await findTenantPropertiesServices(tenantId);
        res.json(data);
    } catch (err) {
        next(err);
    };
};

export async function createPropertyControllers (req : Request, res : Response, next : NextFunction) {
    try {
        const tenantId = Number(req.params.tenantId);

        const property = await createPropertyServices(
            tenantId,
            req.body,
        );
    res.status(201).json(property);
    } catch (err) {
        next(err);
    }
}

export async function updatePropertyControllers (req : Request, res : Response, next : NextFunction) {
    try {
        const tenantId = Number(req.params.tenantId);
        const propertyId = Number(req.params.propertyId);
        const property =  await updatePropertyServices(
            propertyId,
            tenantId,
            req.body,
        );
    res.json(property); 
    } catch (err) {
        next(err);
    };
};

export async function deletePropertyControllers (req : Request, res : Response, next : NextFunction) {
    try {
        const tenantId = Number(req.params.tenantId);
        const propertyId = Number(req.params.propertyId);

        await deletePropertyServices(
            propertyId,
            tenantId,
        );
    res.status(204).json({message : "Property deleted"});
    } catch (err) {
        next(err);
    };
};
