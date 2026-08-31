import { NextRequest, NextResponse } from "next/server";
import { superAdminService } from "@/services/super-admin.service";
import { requireSuperAdmin } from "@/lib/auth-guard";
import { UserRole, UserStatus } from "@/models/user.model";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error) return error.message;
  return fallback;
}

// ─── Controller Handlers ──────────────────────────────────────────────────────

/**
 * GET /api/v1/super-admin/stats
 * Overview numbers for Super Admin Dashboard
 */
async function getStats(request: NextRequest): Promise<NextResponse> {
  const auth = await requireSuperAdmin(request);
  if (!auth.authorized) return auth.response;

  try {
    const stats = await superAdminService.getDashboardStats();
    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error: unknown) {
    const message = getErrorMessage(error, "Failed to load dashboard statistics");
    console.error("[SuperAdminController] getStats:", message);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

/**
 * GET /api/v1/super-admin/users
 * Paginated user list with filters (search, role, status, page, limit)
 */
async function getUsers(request: NextRequest): Promise<NextResponse> {
  const auth = await requireSuperAdmin(request);
  if (!auth.authorized) return auth.response;

  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const role = (searchParams.get("role") || "ALL") as UserRole | "ALL";
    const status = (searchParams.get("status") || "ALL") as UserStatus | "ALL";

    const result = await superAdminService.getUsers({
      page,
      limit,
      search,
      role,
      status,
    });

    return NextResponse.json({
      success: true,
      data: result.users,
      pagination: result.pagination,
    });
  } catch (error: unknown) {
    const message = getErrorMessage(error, "Failed to fetch users");
    console.error("[SuperAdminController] getUsers:", message);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

/**
 * POST /api/v1/super-admin/users
 * Create a new admin, moderator, or regular user
 */
async function createUser(request: NextRequest): Promise<NextResponse> {
  const auth = await requireSuperAdmin(request);
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json().catch(() => ({}));
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const newUser = await superAdminService.createStaffUser({
      name,
      email,
      password,
      role: role || "USER",
    });

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = getErrorMessage(error, "Failed to create user");
    console.error("[SuperAdminController] createUser:", message);
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

/**
 * GET /api/v1/super-admin/users/[userId]
 * Get single user profile
 */
async function getUserById(request: NextRequest, userId: string): Promise<NextResponse> {
  const auth = await requireSuperAdmin(request);
  if (!auth.authorized) return auth.response;

  try {
    const user = await superAdminService.getUserById(userId);
    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error: unknown) {
    const message = getErrorMessage(error, "Failed to retrieve user");
    console.error("[SuperAdminController] getUserById:", message);
    return NextResponse.json({ success: false, message }, { status: 404 });
  }
}

/**
 * PATCH /api/v1/super-admin/users/[userId]/role
 * Update user role (e.g. USER -> ADMIN or MODERATOR)
 */
async function updateUserRole(request: NextRequest, userId: string): Promise<NextResponse> {
  const auth = await requireSuperAdmin(request);
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json().catch(() => ({}));
    const { role } = body;

    const validRoles: UserRole[] = ["SUPER_ADMIN", "ADMIN", "MODERATOR", "USER"];
    if (!role || !validRoles.includes(role)) {
      return NextResponse.json(
        {
          success: false,
          message: `Invalid role. Must be one of: ${validRoles.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const updatedUser = await superAdminService.updateUserRole(
      userId,
      role,
      auth.user._id.toString()
    );

    return NextResponse.json({
      success: true,
      message: `User role successfully updated to ${role}`,
      data: updatedUser,
    });
  } catch (error: unknown) {
    const message = getErrorMessage(error, "Failed to update role");
    console.error("[SuperAdminController] updateUserRole:", message);
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

/**
 * PATCH /api/v1/super-admin/users/[userId]/status
 * Update user status (ACTIVE, BLOCKED, PENDING)
 */
async function updateUserStatus(request: NextRequest, userId: string): Promise<NextResponse> {
  const auth = await requireSuperAdmin(request);
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json().catch(() => ({}));
    const { status } = body;

    const validStatuses: UserStatus[] = ["ACTIVE", "BLOCKED", "PENDING"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const updatedUser = await superAdminService.updateUserStatus(
      userId,
      status,
      auth.user._id.toString()
    );

    return NextResponse.json({
      success: true,
      message: `User account status updated to ${status}`,
      data: updatedUser,
    });
  } catch (error: unknown) {
    const message = getErrorMessage(error, "Failed to update status");
    console.error("[SuperAdminController] updateUserStatus:", message);
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

/**
 * DELETE /api/v1/super-admin/users/[userId]
 * Delete user account permanently
 */
async function deleteUser(request: NextRequest, userId: string): Promise<NextResponse> {
  const auth = await requireSuperAdmin(request);
  if (!auth.authorized) return auth.response;

  try {
    const result = await superAdminService.deleteUser(userId, auth.user._id.toString());
    return NextResponse.json({
      success: true,
      message: result.message,
    });
  } catch (error: unknown) {
    const message = getErrorMessage(error, "Failed to delete user");
    console.error("[SuperAdminController] deleteUser:", message);
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

// ─── Export ───────────────────────────────────────────────────────────────────

export const superAdminController = {
  getStats,
  getUsers,
  createUser,
  getUserById,
  updateUserRole,
  updateUserStatus,
  deleteUser,
};
