import { Numeric } from "zod/v4/core/util.cjs";

export type createUser = {
    email : string;
    name : string;
    role : "USER" | "TENANT";
};

export type createTenant = {
    userId : number;
    companyName : string;
    phoneNumber : string;
};

export type registerTenantService = {
    email : string;
    name : string;
    companyName : string;
    phoneNumber : string;
}