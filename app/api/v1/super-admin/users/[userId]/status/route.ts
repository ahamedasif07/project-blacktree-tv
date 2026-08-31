import { NextRequest } from "next/server";
import { superAdminController } from "@/controllers/super-admin.controller";

/**
 * PATCH /api/v1/super-admin/users/[userId]/status
 * Update user's account status (ACTIVE, BLOCKED, PENDING)
 */
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  const { userId } = await context.params;
  return superAdminController.updateUserStatus(request, userId);
}
