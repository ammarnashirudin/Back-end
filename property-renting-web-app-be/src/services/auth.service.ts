import { 
    findUserByEmailRepositories,
    createTenantRepositories,
    createUserRepositories,
} from "../repositories/auth.repositories";
import { 
    RegisterTenantInput,
    RegisterUserInput,
 } from "../type/auth.type";
 import { createCustomError } from "../utils/customError";
import { generateAndSendEmailVerificationToken } from "../utils/verification";


export async function registerUserService(data : RegisterUserInput) {
    try {
        const exist = await findUserByEmailRepositories(data.email);
        if (exist) throw createCustomError(401, "User already exists");

        const user = await createUserRepositories({
            name: data.name,
            email: data.email,
            role: "USER",
        });
        await generateAndSendEmailVerificationToken(user.id, user.email);
        return user;
    } catch (err) {
        throw err;
    };
};

export async function registerTenantService(data : RegisterTenantInput) {
    try {
        const exist = await findUserByEmailRepositories(data.email);
        if (exist) throw createCustomError(401, "User already exists");

        const user =  await createUserRepositories({
            name: data.name,
            email: data.email,
            role: "TENANT",
        });
        await createTenantRepositories({
            userId: user.id,
            companyName: data.companyName,
            phoneNumber: data.phoneNumber,
        });

        await generateAndSendEmailVerificationToken(user.id, user.email);
        return user;
    } catch (err) {
        throw err;
    };
};

export async function socialRegisterUserService(data : RegisterUserInput) {
    try {
        const exist = await findUserByEmailRepositories(data.email);
        if (exist) throw createCustomError(401, "User already exists");

        const user = await createUserRepositories({
            name: data.name,
            email: data.email,
            role: "USER",
        });
        await generateAndSendEmailVerificationToken(user.id, user.email);
        return user;
    } catch (err) {
        throw err;
    };
};

export async function socialRegisterTenantService(data : RegisterTenantInput) {
    try {
        const exist = await findUserByEmailRepositories(data.email);
        if (exist) throw createCustomError(401, "User already exists");

        const user =  await createUserRepositories({
            name: data.name,
            email: data.email,
            role: "TENANT",
        });
        await createTenantRepositories({
            userId: user.id,
            companyName: data.companyName,
            phoneNumber: data.phoneNumber,
        });
        await generateAndSendEmailVerificationToken(user.id, user.email);
        return user;
    } catch (err) {
        throw err;
    };
};
