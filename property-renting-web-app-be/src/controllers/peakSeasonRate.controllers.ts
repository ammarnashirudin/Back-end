import { Request, Response, NextFunction } from "express";
import { 
    updatePeakRateSeasonService,
    deletePeakRateSeasonService,
    getPeakSeasonByRoomService,
    createPeakSeasonService,
    deletePeakSeasonByDateService,

} from "../services/peakSeasonRate.services";


export async function updatePeakSeasonRateController(req: Request, res: Response, next : NextFunction) {
    try {
        const tenantId = Number(req.params.tenantId);
        const id = Number(req.params.id);
        const rate = await updatePeakRateSeasonService(tenantId, id, req.body);
        res.json(rate);
    } catch (err) {
        next(err);
    };
};

export async function deletePeakSeasonRateController(req: Request, res: Response, next: NextFunction) {
    try {
        const tenantId = Number(req.params.tenantId);
        const id = Number(req.params.id);

        await deletePeakRateSeasonService(id, tenantId,);
        res.status(201).json({message : "peak season deleted"});
    } catch (err) {
        next(err);
    };
};

export async function createPeakSeasonController(req: Request, res:Response, next : NextFunction) {
    try {
        const tenantId = Number(req.params.tenantId);
        const data = await createPeakSeasonService(tenantId, req.body);
        res.status(201).json(data);
    } catch (err) {
        next(err);
    };
};


export async function getPeakSeasonController(req: Request, res: Response, next : NextFunction) {
    try {
        const tenantId = Number(req.params.tenantId);
        const roomId = Number(req.params.roomId);
        const data = await getPeakSeasonByRoomService(tenantId, roomId);
        res.json(data);
    } catch (err) {
        next(err);
    };
};

export async function deletePeakSeasonByDateController(req: Request, res: Response, next: NextFunction) {
    try {
        const tenantId = Number(req.params.tenantId);
        const {roomId, date} = req.body
        await deletePeakSeasonByDateService(tenantId, roomId, date);
        res.status(201).json({message : "peak season by date deleted"});
    } catch (err) {
        next(err);
    };
};



