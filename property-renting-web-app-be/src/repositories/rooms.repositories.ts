import prisma from "../lib/prisma";
import { CreateRoomInput, updateRoomInput } from "../type/property.type";

export async function findRoomsByPropertyRepositories(propertyId : number){
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



