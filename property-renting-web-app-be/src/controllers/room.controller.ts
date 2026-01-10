import { NextFunction, Request, Response } from "express";
import { 
    findRoomsByPropertyService, 
    createRoomService, 
    updateRoomService, 
    deleteRoomServices,
    findAvailabilityService,
    createRoomAvailibiltyInputService,
    updateRoomAvailabilityService,
     deleteRoomAvailabilityService
} from "@/services/rooms.services";


export async function findRoomByPropertyController(
    req : Request,
    res : Response,
    next : NextFunction,
){
    try {
        const propertyId = Number(req.params.properyId);
        const tenantId = Number(req.params.tenantId);

        const rooms = await findRoomsByPropertyService(propertyId,tenantId);
        res.json(rooms);
    } catch (err) {
        next(err);
    };
};


export async function createRoomController(
    req : Request,
    res : Response,
    next : NextFunction,
){
    try {
    const tenantId = Number(req.params.tenantId);

    const room = await createRoomService(tenantId, req.body);
    res.status(201).json(room);
    } catch (err) {
        next(err);
    };
};

export async function updateRoomController(
    req : Request,
    res : Response,
    next : NextFunction,
){
    try {
        const roomId = Number(req.params.id);
        const tenantId = Number(req.params.tenantId);

        const room = await updateRoomService(roomId, tenantId, req.body);
        res.json(room);
    } catch (err) {
        next(err);
    };
};

export async function deleteRoomController(
    req : Request,
    res : Response,
    next : NextFunction,
){
    try {
        const roomId = Number(req.params.id);
        const tenantId = Number(req.params.tenantId);
        await deleteRoomServices(roomId, tenantId);
    } catch (err) {
        next(err);
    };
};

export async function findAvailabilityInputController(params:type) {
    
}