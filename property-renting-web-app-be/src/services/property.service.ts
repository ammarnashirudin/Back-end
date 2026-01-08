import { 
    findAllPropertiesRepositories, 
    getPropertDetailRepositories,
    createCategoryRepositories,
    updateCategoryRepositories,
    deleteCategoryRepositories,
    findAllCategoriesRepositories,
    findTenantPropertiesRepositories,
    createPropertyRepositories,
    updatePropertyRepositories,
    deletePropertyRepositories,
} from "../repositories/property.repositories";
import { PropertyQuery, CreatePropertyInput } from "../type/property.type";

export async function findAllPropertiesServices(query : PropertyQuery) {
    const result = await findAllPropertiesRepositories(query);
    const limit = Number(query.limit);
    const page = Number(query.page);
    const totalItems = Number(result.totalItems);

    const properties = result.data.map((property:any)=>({
        id : property.id,
        name : property.name,
        description : property.description,
        address : property.address,
        image : property.image,
        category : property.category,
        price :  Math.min(...property.rooms.map((room:any) => room.basePrice)),
    }));

    return {
        data : properties,
        pagination : {
            page,
            limit,
            total : totalItems,
            totalPages : Math.ceil(totalItems/limit),
        },
    };
};

export async function getPropertyDetailServices(propertyId : number, startDate? : string, endDate? : string) {
    const property = await getPropertDetailRepositories(propertyId);
    if (!property) return null;

    const start = startDate ? new Date(startDate) : new Date();
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    const rooms = property.rooms.map((room:any) => {
        const calender = [];
    
    for (
        let date = new Date(start);
        date <= end;
        date.setDate(date.getDate() + 1)
        ) {
        const availability = room.availabilities.find((a:any) => 
            a.date.toDateString() === date.toDateString()
        );
        if (!availability || !availability.isAvailable) {
            calender.push({
            date: new Date(date),
            isAvailable: false,
            price : null,
            });
            continue;
        }
        const peak = room.peakRates.find(
            (p:any) => date >= p.startDate && date <= p.endDate
        );
        calender.push({
            date: new Date(date),
            isAvailable: true,
            price: peak ? peak.rate : room.basePrice,
        });
    }
    return {
        id : room.id,
        name : room.name,
        description : room.description,
        capacity : room.capacity,
        calender,
    };
});
return {
    id : property.id,
    name : property.name,
    description : property.description,
    address : property.address,
    image : property.image,
    category : property.category,
    rooms,
};

};

export async function createCategoryServices(name : string) {
    if(!name || name.trim() === "") {
        throw new Error("Category name is required");
    }
    return await createCategoryRepositories(name);
}

export async function updateCategoryServices(id : number, name : string) {
    if(!id) throw new Error("Category id is required");
    if(!name) throw new Error("Category name is required");

    return await updateCategoryRepositories(id, name);
};

export async function deleteCategoryServices(id : number) {
    if(!id) throw new Error("Category id is required");
    return await deleteCategoryRepositories(id);
};

export async function findAllCategoriesServices() {
    return await findAllCategoriesRepositories();
};

export async function findTenantPropertiesServices(tenantId : number) {
    return await findTenantPropertiesRepositories(tenantId);
};

export async function createPropertyServices(
    tenantId : number,
    data : CreatePropertyInput,
    file_img : Express.Multer.File
){
    if(!data.name || !data.categoryId || !data.rooms?.length) {
        throw new Error("Invalid property data");
    }
    return await createPropertyRepositories(tenantId, data, file_img);
};

export async function updatePropertyServices(
    propertyId : number,
    tenantId : number,
    data : CreatePropertyInput,
){
    return await updatePropertyRepositories(propertyId, tenantId, data);
}

export async function deletePropertyServices(
    propertyId : number,
    tenantId : number,
){
    return await deletePropertyRepositories(propertyId, tenantId);
};

