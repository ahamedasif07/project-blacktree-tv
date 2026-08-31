import { NextRequest } from "next/server";
import { superAdminController } from "@/controllers/super-admin.controller";

/**
 * GET /api/v1/super-admin/stats
 * Overview numbers for Super Admin Dashboard
 */
export async function GET(request: NextRequest) {
  return superAdminController.getStats(request);
}
