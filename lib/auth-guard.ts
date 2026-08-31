import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest, verifyToken } from "@/lib/jwt";
import { connectDB } from "@/lib/db";
import User, { IUser, UserRole } from "@/models/user.model";

/**
 * Result object returned by the auth guard check
 */
export type AuthGuardResult =
  | { authorized: true; user: IUser }
  | { authorized: false; response: NextResponse };

/**
 * Helper to check if the incoming request has a valid token and user has the required role.
 * 
 * @param request - NextRequest object
 * @param allowedRoles - Array of allowed roles (e.g. ["SUPER_ADMIN", "ADMIN"])
 */
export async function authorizeRoles(
  request: NextRequest,
  allowedRoles: UserRole[]
): Promise<AuthGuardResult> {
  try {
    // 1. Get token from Cookies or Authorization Header
    const token = getTokenFromRequest(request);
    if (!token) {
      return {
        authorized: false,
        response: NextResponse.json(
          {
            success: false,
            message: "Authentication required. No token provided.",
          },
          { status: 401 }
        ),
      };
    }

    // 2. Verify JWT token signature and expiration
    const payload = await verifyToken(token);
    if (!payload?.userId) {
      return {
        authorized: false,
        response: NextResponse.json(
          {
            success: false,
            message: "Invalid or expired token. Please log in again.",
          },
          { status: 401 }
        ),
      };
    }

    // 3. Find user in Database
    await connectDB();
    const user = await User.findById(payload.userId);
    if (!user) {
      return {
        authorized: false,
        response: NextResponse.json(
          { success: false, message: "User account not found." },
          { status: 404 }
        ),
      };
    }

    // 4. Check if user is blocked
    if (user.status === "BLOCKED") {
      return {
        authorized: false,
        response: NextResponse.json(
          {
            success: false,
            message: "Your account is suspended. Access denied.",
          },
          { status: 403 }
        ),
      };
    }

    // 5. Check if user role matches allowed roles
    if (!allowedRoles.includes(user.role)) {
      return {
        authorized: false,
        response: NextResponse.json(
          {
            success: false,
            message: `Forbidden: Requires one of [${allowedRoles.join(", ")}] role.`,
          },
          { status: 403 }
        ),
      };
    }

    return { authorized: true, user };
  } catch (error) {
    console.error("[AuthGuard] Error verifying authorization:", error);
    return {
      authorized: false,
      response: NextResponse.json(
        { success: false, message: "Internal server authentication error." },
        { status: 500 }
      ),
    };
  }
}

/**
 * Guard strictly for Super Admin
 */
export async function requireSuperAdmin(request: NextRequest): Promise<AuthGuardResult> {
  return authorizeRoles(request, ["SUPER_ADMIN"]);
}

/**
 * Guard for Super Admin or Admin
 */
export async function requireAdmin(request: NextRequest): Promise<AuthGuardResult> {
  return authorizeRoles(request, ["SUPER_ADMIN", "ADMIN"]);
}
