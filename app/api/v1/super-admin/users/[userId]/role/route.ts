import { NextRequest } from "next/server";
import { superAdminController } from "@/controllers/super-admin.controller";

/**
 * PATCH /api/v1/super-admin/users/[userId]/role
 * Update user's role (SUPER_ADMIN, ADMIN, MODERATOR, USER)
 */
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  const { userId } = await context.params;
  return superAdminController.updateUserRole(request, userId);
}
