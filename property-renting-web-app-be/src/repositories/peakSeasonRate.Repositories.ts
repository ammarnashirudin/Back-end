import prisma from "@/lib/prisma";
import { CreatPeakInput } from "@/type/peakSeasonRate";

export async function createPeakRateSeasonRepositories(data:CreatPeakInput) {
    try {
        return await prisma.peakSeasonRate.create({data});
    } catch (err) {
        throw err;
    };
};

export async function updatePeakSeasonRepositories(id : number, data : Partial<CreatPeakInput>) {
    try {
        return await prisma.peakSeasonrate.update({
            where : {id},
            data,
        })
    } catch (err) {
        throw err;
    };
};

export async function deletePeakSeasonRepositories(id:number) {
    try {
    return await prisma.peakSeasonRate({where:{id}});        
    } catch (err) {
        throw err;
    };
};

export async function findPeakSeasonByRoomRepositories(roomId : number) {
    try {
        return await prisma.peakSeasonRate.findMany({
            where : {roomId},
            orderBy : {startDate : "asc"},
        });
    } catch (err) {
        throw err;
    };
};

export async function upsertPeakSeasonRepositories(
    roomId : number,
    date: Date,
    type : "Nominal" | "Percentage",
    value : number,
) {
    try {
        return await prisma.peakSeasonRate.upsert({
            where : {
                roomId_date : {roomId, date},
            },
            update : {type, value},
            create : {roomId, date, type, value},
        });
    } catch (err) {
        throw err
    };
};

export async function getPeakSeasonByRoomRepoistories(roomId : number) {
    try {
        return prisma.peakSeasonRate.findMany({
            where : {roomId},
            orderBy : {date : "asc"},
        });
    } catch (err) {
        throw err;
    };
};

export async function deletePeakSeasonByDateRepositories(roomId : number, date : Date) {
    try {
        return prisma.peakSeasonRate.delete({
            where : {
                roomId_date : {
                    roomId,
                    date,
                },
            },
        });
    } catch (err) {
        throw err
    };
};