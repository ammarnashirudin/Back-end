export type CreateAvailabiltyInput = {
    roomId : number;
    date : Date;
    isAvailable : boolean;
};

export type updateAvailabilityInput = {
    id : number;
    isAvailable : boolean;
    tenantId : number;
    availabilityId : number;
};

export type findAvailabilityInput = {
    roomId : number;
    tenantId : number;
}