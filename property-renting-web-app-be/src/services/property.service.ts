import { findAllPropertiesRepositories } from "@/repositories/property.repositories";
import { PropertyQuery} from "@/types/property.type";

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


    




