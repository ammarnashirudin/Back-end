export type CreateAvailabiltyInput = {
    roomId : number;
    date : Date;
    isAvailable : boolean;
};

export type updateAvailabilityInput = {
    availabilityId : number;
    isAvailable : boolean;
    tenantId : number;
};

export type findAvailabilityInput = {
    roomId : Number;
    tenantId : Number;
}