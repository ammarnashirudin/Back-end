import { 
    findAvailabilityRepositories,
    createAvailabilityRepositories,
    deleteAvailibiltyRepositories,
    updateAvailabiltyRepositories

 } from "@/repositories/availability.repositories";
import prisma from "@/lib/prisma";
import { createCustomError } from "@/utils/customError";
import { CreateAvailabiltyInput, updateAvailabilityInput } from "@/type/rooms.type";

export async function findAvailabilityService(roomId : number, tenantId : number){
    try {
        const room = await prisma.room.findFirst({
            where: {id : roomId, property : {tenantId}},
        });
        if(!room) throw createCustomError(401, "Unauthorized");
        return findAvailabilityRepositories(roomId);
    } catch (err) {
        throw err
    };
};

export async function createRoomAvailibiltyInputService(
    tenantId : number,
    data : CreateAvailabiltyInput,
){
    try {
        const room = await prisma.room.findFirst({
            where : {id:data.roomId, property: {tenantId}},
        });
        if(!room) throw createCustomError(401, "Unauthorized");

        return createAvailabilityRepositories({
            roomId : data.roomId,
            date : new Date(data.date),
            isAvailable : data.isAvailable, 
        });
    } catch (err) {
        throw err;
    };
};

export async function updateRoomAvailabilityService(data: updateAvailabilityInput){
    try {
        const availability = await prisma.roomAvailability.findFirst({
            where : {
                id : data.availabilityId,
                room : {
                    property : {
                        tenantId : data.tenantId
                    },
                },
            },
        })

        if(!availability) throw createCustomError(401, "Unauthorized")
        
        return updateAvailabiltyRepositories(data.availabilityId, data.isAvailable)
    } catch (err) {
        throw err
    };
};

export async function deleteRoomAvailabilityService(
    availabilityId : number,
    tenantId : number,
){
    try {
        const availability = await prisma.roomAvailability.findFirst({
            where : {
                id : availabilityId,
                room : {property : {tenantId}},
            },
        });
        if(!availability) throw createCustomError(401, "Unauthorized")
        return deleteAvailibiltyRepositories(availabilityId);
    } catch (err) {
        throw err;        
    };
};



