import { 
    findRoomsByPropertyRepos,
    createRoomsRepositories,
    updateRoomRepositories,
    deleteRoomRepositories,
 } from "@/repositories/rooms.repositories";
import prisma from "@/lib/prisma";
import { createCustomError } from "@/utils/customError";
import { CreateRoomInput, updateRoomInput } from "@/type/property.type";
import { exactOptional, property } from "zod";
import { threadCpuUsage } from "node:process";

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
            };
        });
        if(!room) throw createCustomError(401, "Unauthorized");
        return deleteRoomRepositories(roomId);
    } catch (err) {
        throw err;
    };
};
