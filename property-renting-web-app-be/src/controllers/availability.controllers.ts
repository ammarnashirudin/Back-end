import { Request, Response, NextFunction} from "express";
import { 
    findAvailabilityService,
    createRoomAvailibiltyInputService,
    updateRoomAvailabilityService,
    deleteRoomAvailabilityService,
 } from "@/services/availability.services";

 export async function findAvailabiltyController(req:Request, res:Response, next : NextFunction){
    try {
        const roomId = Number(req.params.roomId);
        const tenantId = Number(req.params.tenantId);

        const data = await findAvailabilityService({
            roomId, 
            tenantId,
        })
        res.status(201).json(data);
    } catch (err) {
        next(err);
    };
 };

 export async function createAvaillabilityController(req: Request, res : Response, next : NextFunction){
    try {
        const tenantId = Number(req.params.tenantId);
        const availability = await createRoomAvailibiltyInputService(tenantId, req.body);
        res.status(201).json(availability);
    } catch (err) {
        next(err);
    };
 };

 export async function updateAvailabilityController(req: Request, res : Response, next : NextFunction){
    try {
        const data = await updateRoomAvailabilityService({
            availabilityId : Number(req.params.availabilityId),
            tenantId : Number(req.params.tenantId),
            isAvailable : req.body.isAvailable
        });
        res.json(data);
    } catch (err) {
        next(err);
    };
 };

 export async function deleteAvailabilityController(req : Request, res : Response, next : NextFunction) {
    try {
        const tenantId = Number(req.params.tenantId);
        const id = Number(req.params.id);
        await deleteRoomAvailabilityService(id,tenantId);
    } catch (err) {
        next(err);
    };
 };
