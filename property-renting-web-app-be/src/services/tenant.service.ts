import { createCustomError } from "../utils/customError";
import { createTenant, findTenantByUserId } from "../repositories/tenant.repositories";

export async function completeTenantProfileService(
  userId: number,
  data: { companyName: string; phoneNumber: string }
) {
  const exist = await findTenantByUserId(userId);
  if (exist) throw createCustomError(400, "Tenant profile already exists");

  return createTenant({
    userId,
    companyName: data.companyName,
    phoneNumber: data.phoneNumber,
  });
}
