import prisma from "@/lib/prisma";
import { CreatPeakInput } from "@/type/peakSeasonRate";


export async function updatePeakSeasonRepositories(id : number, data : Partial<CreatPeakInput>) {
    try {
        return await prisma.peakSeasonRate.update({
            where : {id},
            data,
        })
    } catch (err) {
        throw err;
    };
};

export async function deletePeakSeasonRepositories(id:number) {
    try {
    return await prisma.peakSeasonRate.delete({where:{id}});        
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
                roomId_startDate : {roomId, startDate: date},
            },
            update : {value},
            create : {roomId, startDate: date, endDate: date, type, value},
        });
    } catch (err) {
        throw err
    };
};

export async function getPeakSeasonByRoomRepoistories(roomId : number) {
    try {
        return prisma.peakSeasonRate.findMany({
            where : {roomId},
            orderBy : {startDate : "asc"},
        });
    } catch (err) {
        throw err;
    };
};

export async function deletePeakSeasonByDateRepositories(roomId : number, startDate : Date) {
    try {
        return prisma.peakSeasonRate.delete({
            where : {
                roomId_startDate: {
                    roomId,
                    startDate,
                },
            },
        });
    } catch (err) {
        throw err
    };
};
