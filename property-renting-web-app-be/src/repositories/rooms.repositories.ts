import prisma from "@/lib/prisma";
import { CreateRoomInput, updateRoomInput } from "@/type/property.type";
import { CreateAvailabiltyInput, updateAvailabilityInput } from "@/type/rooms.type";
export async function findRoomsByPropertyRepos(propertyId : number){
    try {
        const rooms = await prisma.room.findMany({
            where : {propertyId},
            orderBy : {createdAt : "asc"},
        });
        return rooms;
    } catch (err) {
        throw err
    };
};

export async function createRoomsRepositories(data : CreateRoomInput) {
    try {
        return await prisma.room.create({data});
    } catch (err) {
        throw err
    };
};

export async function updateRoomRepositories(
    roomId : number,
    data : updateRoomInput
){
    try {
        return await prisma.room.update({
            where: {id:roomId},
            data,
        });
    } catch (err) {
        throw err
    };
};

export async function deleteRoomRepositories(
    roomId : number,
){
    try {
        return await prisma.room.delete({
            where: {id:roomId},
        });
    } catch (err) {
        throw err
    };
};

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
            Where : {
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

