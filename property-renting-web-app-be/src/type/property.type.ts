export type PropertyQuery = {
    page? : number | string,
    limit? : number | string,
    categoryid? : number | string,
    name? : string,
    sortby? : 'name' | 'price',
    order? : 'asc' | 'desc',
};

export type CreateRoomInput = {
    propertyId : string;
    name : string,
    description : string,
    basePrice : number,
    capacity? : number,
};

export type CreatePropertyInput = {
    name : string,
    description : string,
    image : string,
    categoryId : number,
    rooms : CreateRoomInput[],
};

export type updateRoomInput = {
    name? : string;
    description? : string;
    basePrice? : number;
    capacity? : number;
}


