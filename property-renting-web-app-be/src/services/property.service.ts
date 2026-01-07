import { findAllPropertiesRepositories, getPropertDetailRepositories } from "../repositories/property.repositories";
import { PropertyQuery} from "../type/property.type";

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

