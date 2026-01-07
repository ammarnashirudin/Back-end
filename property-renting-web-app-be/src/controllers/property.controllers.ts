import { NextFunction, Request, Response } from "express";
import { findAllPropertiesServices } from "../services/property.service";

export async function findAllPropertiesControllers(req :  Request, res : Response){
    const result = await findAllPropertiesServices({
        page : Number(req.query.page),
        limit : Number(req.query.limit),
        name : req.query.name as string,
        categoryid : Number(req.query.categoryid),
        sortby : req.query.sortby as 'name' | 'price',
        order : req.query.order as 'asc' | 'desc',
    });
    res.json(result);
}