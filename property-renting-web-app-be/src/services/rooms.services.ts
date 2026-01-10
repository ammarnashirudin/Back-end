import { 
    findRoomsByPropertyRepos,
    createRoomsRepositories,
    updateRoomRepositories,
    deleteRoomRepositories,
    findAvailabilityRepositories,
    deleteAvailibiltyRepositories,
    updateAvailabiltyRepositories,
    createAvailabilityRepositories,

 } from "@/repositories/rooms.repositories";
import prisma from "@/lib/prisma";
import { createCustomError } from "@/utils/customError";
import { CreateRoomInput, updateRoomInput } from "@/type/property.type";
import { CreateAvailabiltyInput, updateAvailabilityInput, findAvailabilityInput } from "@/type/rooms.type";
import { property } from "zod";
import { timeEnd } from "node:console";

export async function findRoomsByPropertyService(
    propertyId : number,
    tenantId : number,
){
    try {
        const property = await prisma.property.findFirst({
            where : {id:propertyId , tenantId}
        });
        if(!property) throw createCustomError(401, "Unauthorized");

        return findRoomsByPropertyRepos(propertyId);
    } catch (err) {
        throw err;
    };
};

export async function createRoomService(
    tenantId : number,
    data : CreateRoomInput,
){
    try {
        const property = await prisma.property.findFirst({
            where : {id : data.propertyId, tenantId},
        });
        if(!property) throw createCustomError(401, "Unauthorized");

        if(!data.name || !data.basePrice) throw createCustomError(401, "Invalid Room data");

        return createRoomsRepositories(data);
    } catch (err) {
        throw err
    };
};

export async function updateRoomService(
    roomId: number,
    tenantId : number,
    data : updateRoomInput,
){
    try {
        const room = await prisma.room.findFirst({
            where : {
                id : roomId,
                property : {tenantId},
            },
        });
        if(!room) throw createCustomError (401,"Unauthorized");
        return updateRoomRepositories(roomId, data);
    } catch (err) {
        throw err;
    };
};

export async function deleteRoomServices(
    roomId : number,
    tenantId : number,
){
    try {
        const room = await prisma.findFirst({
            where : {
                id : roomId,
                property : {tenantId},
            }
        });
        if(!room) throw createCustomError(401, "Unauthorized");
        return deleteRoomRepositories(roomId);
    } catch (err) {
        throw err;
    };
};

export async function findAvailabilityService(data: findAvailabilityInput){
    try {
        const room = await prisma.room.findFirst({
            where: {id : data.roomId, property : data.tenantId},
        });
        if(!room) throw createCustomError(401, "Unauthorized")
            return findAvailabilityRepositories(room);
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
        const availability = await prisma.roomAvailibility.findFirst({
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
        const availability = await prisma.roomAvailibility.findFirst({
            where : {
                id : availabilityId,
                room : {property : {tenantId}},
            },
        });
        if(!availability) throw createCustomError(401, "Unauthorized")
        return deleteRoomRepositories(availabilityId);
    } catch (err) {
        throw err;        
    };
};



