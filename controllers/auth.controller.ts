import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/services/auth.service";
import { getTokenFromRequest, verifyToken } from "@/lib/jwt";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error) return error.message;
  return fallback;
}

// ─── Handlers ─────────────────────────────────────────────────────────────────

/**
 * POST /api/v1/auth/login
 * Authenticate user with email/username + password
 */
async function login(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json().catch(() => ({}));
    const identifier = body.identifier || body.email || body.username;
    const { password } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, message: "Username/Email and password are required" },
        { status: 400 }
      );
    }

    const { user, token } = await authService.login(identifier, password);

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        ...user,
        image: user.avatar,
      },
      token,
    });

    // Set secure HTTP-only cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: unknown) {
    const message = getErrorMessage(error, "Failed to sign in");
    console.error("[AuthController] login:", message);
    return NextResponse.json({ success: false, message }, { status: 401 });
  }
}

/**
 * POST /api/v1/auth/register
 * Register a new user account
 */
async function register(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json().catch(() => ({}));
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const { user, token } = await authService.register(name, email, password);

    const response = NextResponse.json(
      {
        success: true,
        message: "Registration successful",
        user: {
          ...user,
          image: user.avatar,
        },
        token,
      },
      { status: 201 }
    );

    // Set secure HTTP-only cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: unknown) {
    const message = getErrorMessage(error, "Registration failed");
    console.error("[AuthController] register:", message);
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

/**
 * GET /api/v1/auth/me
 * Return the currently authenticated user's profile
 */
async function getMe(request: NextRequest): Promise<NextResponse> {
  try {
    const token = getTokenFromRequest(request);

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No token provided", user: null },
        { status: 401 }
      );
    }

    const payload = await verifyToken(token);
    if (!payload?.userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Invalid or expired token", user: null },
        { status: 401 }
      );
    }

    const user = await authService.getCurrentUser(payload.userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found", user: null },
        { status: 404 }
      );
    }

    if (user.status === "BLOCKED") {
      return NextResponse.json(
        { success: false, message: "Your account has been suspended", user: null },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        avatar: user.avatar,
        image: user.avatar,
        createdAt: user.createdAt,
      },
    });
  } catch (error: unknown) {
    const message = getErrorMessage(error, "Failed to authenticate session");
    console.error("[AuthController] getMe:", message);
    return NextResponse.json({ success: false, message, user: null }, { status: 401 });
  }
}

/**
 * POST /api/v1/auth/logout
 * Clear the auth cookie and log the user out
 */
async function logout(): Promise<NextResponse> {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  // Clear auth cookie
  response.cookies.set("auth-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}

// ─── Export ───────────────────────────────────────────────────────────────────

export const authController = { login, register, getMe, logout };

/** @deprecated Use `authController` (camelCase) instead */
export const AuthController = authController;