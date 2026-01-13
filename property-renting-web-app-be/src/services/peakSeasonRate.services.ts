import prisma from "@/lib/prisma";
import { 
    createPeakRateSeasonRepositories,
    updatePeakSeasonRepositories,
    deletePeakSeasonRepositories,
    findPeakSeasonByRoomRepositories,
    upsertPeakSeasonRepositories,
    getPeakSeasonByRoomRepoistories,
    deletePeakSeasonByDateRepositories,
 } from "@/repositories/peakSeasonRate.Repositories";
import { CreatePeakSeasonInput, CreatPeakInput } from "@/type/peakSeasonRate";
import { createCustomError } from "@/utils/customError";



export async function findPeakRatesService(roomId : number, tenantId: number) {
    try {
        const room = await prisma.room.findFirst({
            where : {id : roomId, property:{tenantId}},
        });
        if(!room) throw createCustomError(401, "Unauthorized");
        return findPeakSeasonByRoomRepositories(roomId);
    } catch (err) {
        throw err;
    };
};

export async function createPeakRateSeasonService(
    tenantId : number,
    data : CreatPeakInput,
) {
    try {
        const room = await prisma.room.findFirst({
            where : {id:data.roomId, property:{tenantId}},
        });
        if(!room) throw createCustomError(401, "Unauthorized")
        return createPeakRateSeasonRepositories({
            roomId : data.roomId,
            startDate : data.startDate,
            endDate : data.endDate,
            value : data.value,
        });
    } catch (err) {
        throw err;
    };
};

export async function updatePeakRateSeasonService(
    id: number,
    tenantId : number,
    data : Partial<CreatPeakInput>,
) {
    try {
        const rate = await prisma.peakSeasonRate.findFirst({
            where: {id, room:{property:{tenantId}}},
        });
        if(!rate) throw createCustomError(401, "Unauthorized");
        return updatePeakSeasonRepositories(id,{
            startDate : data.startDate
            ? new Date(data.startDate)
            : undefined,
            endDate : data.endDate 
            ? new Date(data.endDate) 
            : undefined,
            value : data.value,
        });
    } catch (err) {
        throw err;
    };
};

export async function deletePeakRateSeasonService(
    id:number, 
    tenantId:number,
) {
    try {
        const rate = await prisma.peakSeasonRate.findFirst({
            where : {id, room: {property: {tenantId}}},
        });
        if(!rate) throw createCustomError(401, "Unauthorized");
        return deletePeakSeasonRepositories(id)
    } catch (err) {
        throw err;
    };
};

function getDatesBetween (start : Date, end : Date){
    const dates : Date[] = [];
    const current = new Date(start);

    while (current <= new Date){
        dates.push(new Date(current));
        current.setDate(current.getDate()+1);
    }
    return dates;
};

export async function createPeakSeasonService(
    tenantId : number,
    data : CreatePeakSeasonInput,
) {
    try {
        const room = await prisma.room.findFirst({
            where : {id: data.roomId, property:{tenantId}},
        });
        if(!room) throw createCustomError(401, "Unauthorized");

        let dates : Date[]=[];
        if(data.dates?.length){
            dates = data.dates.map((d)=>new Date(d));
        } else if(data.startDate && data.endDate){
            dates = getDatesBetween(
                new Date(data.startDate),
                new Date(data.endDate)
            );
        } else {
            throw createCustomError(401, "Invalid Data Input");
        };
        const results = [];
        for (const date of dates){
            results.push(
                upsertPeakSeasonRepositories(
                    data.roomId,
                    date,
                    data.type,
                    data.value
                )
            );
        }
        return Promise.all(results);
    } catch (err) {
        throw err;
    };
};

export async function getPeakSeasonByRoomService(
    roomId : number,
    tenantId : number,
) {
    try {
        const room = await prisma.room.findFirst({
            where : {id: roomId, property:{tenantId}},
        });
        if(!room) throw createCustomError(401, "Unauthorized");

        return getPeakSeasonByRoomRepoistories(roomId);
    } catch (err) {
        throw err;
    };
};

export async function deletePeakSeasonByDateService(
    tenantId : number,
    roomId : number,
    date : Date,
) {
    try {
        const room = await prisma.room.findFirst({
            where : {id:roomId, property:{tenantId}},
        })
        if(!room) throw createCustomError(401,"Unauthorized");
        return deletePeakSeasonByDateRepositories(roomId, new Date(date));
    } catch (err) {
        throw err
    };
};