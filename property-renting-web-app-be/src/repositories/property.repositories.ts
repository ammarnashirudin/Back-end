import prisma from "@/lib/prisma";
import { PropertyQuery, CreatePropertyInput } from "../type/property.type";
import { cloudinaryUpload, cloudinaryRemove } from "@/utils/cloudinary";
import { createCustomError } from "@/utils/customError";


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
        where.cetagoryId = Number(categoryid);
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
        orderBy: { name: order },
    });
    const totalItems = await prisma.property.count({where});
    return {data, totalItems, page, limit};
}

export async function getPropertDetailRepositories(properyId : number) {
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

export async function createCategoryRepositories(name : string) {
    return await prisma.propertyCategory.create({
        data : {name},
    });
};

export async function updateCategoryRepositories(id : number, name : string) {
    return await prisma.propertyCategory.update({
        where : {id},
        data : {name},
    });
};

export async function deleteCategoryRepositories(id : number) {
    return await prisma.propertyCategory.delete({
        where : {id},
    });
};

export async function findAllCategoriesRepositories() {
    return await prisma.propertyCategory.findMany({
        orderBy : {name : 'asc'},
    });
};

export async function findTenantPropertiesRepositories(tenantId : number) {
    return await prisma.property.findMany({
        where : {tenantId},
        include : {
            category : true,
            rooms : true,
        },
        orderBy : {name : 'asc'},
    });
};

export async function createPropertyRepositories(
    tenantId : number, 
    data : CreatePropertyInput,
    file_img : Express.Multer.File
) {
    const {secure_url} = await cloudinaryUpload (file_img);
    try {
        const property = await prisma.property.create({
        data : {
            tenantId,
            cetagoryId : data.categoryId,
            name : data.name,
            description : data.description,
            address : data.address,
            image : secure_url,
            rooms : {
                create : data.rooms,
            },
        },
        include : {
            rooms : true,
            category : true,
        },
    });
    return property;
    } catch (err) {
        cloudinaryRemove(secure_url);
        throw err
    }
};

export async function updatePropertyRepositories(
    propertyId : number,
    tenantId : number,
    data : CreatePropertyInput,
    file_img : Express.Multer.File,
){
    const {secure_url} = await cloudinaryUpload(file_img);
    try {
        const property = await prisma.property.update({
            where : {
                id : propertyId,
                tenantId,
            },
            data : {
                name : data.name,
                description : data.description,
                image : secure_url,
                cetagoryId : data.categoryId,
            },
            include : {
                rooms : true,
                category : true,
            },
        });
        return property;
    } catch (err) {
        cloudinaryRemove(secure_url)
        throw createCustomError(404, "Update Property Repository fail")
    };
};

export async function deletePropertyRepositories(
    propertyId : number,
    tenantId : number,
){
    try {
    return await prisma.property.delete({
        where : {
            id : propertyId,
            tenantId,
        },
    });
    } catch (err) {
        throw err
    }

};



