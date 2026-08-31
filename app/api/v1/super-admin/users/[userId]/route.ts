import { NextRequest } from "next/server";
import { superAdminController } from "@/controllers/super-admin.controller";

/**
 * GET /api/v1/super-admin/users/[userId]
 * Fetch single user by ID
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  const { userId } = await context.params;
  return superAdminController.getUserById(request, userId);
}

/**
 * DELETE /api/v1/super-admin/users/[userId]
 * Delete user account permanently
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  const { userId } = await context.params;
  return superAdminController.deleteUser(request, userId);
}
