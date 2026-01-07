import prisma from "@/lib/prisma";
import { PropertyQuery } from "../type/property.type";

export async function findAllPropertiesRepositories (query : PropertyQuery) {
    const {
        page = 1,
        limit = 10,
        name,
        categoryid,
        sortby = 'name',
        order = 'asc',
    } = query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const today = new Date();
    const where : any = {
        rooms : {
            some : {
                isAvailable : true,
                date : {gte : today},
            },
        },
    };
    if (name) {
        where.name = {
            contains : name,
            mode : "insensitive",
        };
    }
    if (categoryid) {
        where.categoryId = Number(categoryid);
    }

    const data = await prisma.property.findMany({
        where,
        skip,
        take : Number(limit),
        include : {
            category : true,
            rooms : {
                where : {
                    availabilities : {
                        some : {
                            isAvailable :  true,
                            date : {gte : today},
                        },
                    },
                },
                select : {basePrice : true},
            },
        },
        orderBy : 
            sortby === "price" 
            ? { 
                rooms: { min: { basePrice: order } },
                } 
                : { name: order },
    });
    const totalItems = await prisma.property.count({where});
    return {data, totalItems, page, limit};
}

export async function getPropertDetailRepositories(properyId : Number) {
    return await prisma.property.findUnique({
        where : {id : properyId},
        include : {
            category : true,
            rooms : {
                include : {
                    availabilities : true,
                    peakRates : true,
                },
            },
        },
    });
};




