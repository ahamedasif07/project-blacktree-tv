import { NextRequest } from "next/server";
import { superAdminController } from "@/controllers/super-admin.controller";

/**
 * GET /api/v1/super-admin/users
 * List and filter all users with pagination
 */
export async function GET(request: NextRequest) {
  return superAdminController.getUsers(request);
}

/**
 * POST /api/v1/super-admin/users
 * Super Admin creates a new user or staff account (ADMIN, MODERATOR, USER)
 */
export async function POST(request: NextRequest) {
  return superAdminController.createUser(request);
}
