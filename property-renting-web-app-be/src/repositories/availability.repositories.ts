import prisma from "@/lib/prisma";
import { CreateAvailabiltyInput } from "@/type/rooms.type";

export async function createAvailabilityRepositories(data:CreateAvailabiltyInput){
    try {
        return await prisma.RoomAvailibility.create(data);
    } catch (err) {
        throw err
    };
};

export async function updateAvailabiltyRepositories(
    availabilityId : number,
    isAvailable : boolean,
){
    try {
        return await prisma.RoomAvailibility.update({
            where : {
                id : availabilityId
            },
            data : {
                isAvailable : isAvailable
            },
        });
    } catch (err) {
        throw err
    };
};

export async function deleteAvailibiltyRepositories(id : number){
    try {
        return await prisma.RoomAvailibility.delete({
            where : {id}
        })
    } catch (err) {
        throw err
    };
};

export async function findAvailabilityRepositories(roomId : number){
    try {
        return await prisma.RoomAvailibility.findMany({
            where : {roomId},
            orderBy : {date : "asc"},
        })
    } catch (err) {
        throw err
    };
};