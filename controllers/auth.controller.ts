import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/services/auth.service";
import { getTokenFromRequest, verifyToken } from "@/lib/jwt";

export class AuthController {
  /**
   * Handle Login Request
   */
  static async login(request: NextRequest): Promise<NextResponse> {
    try {
      const body = await request.json();
      const { email, password } = body;

      if (!email || !password) {
        return NextResponse.json(
          { success: false, message: "Email and password are required" },
          { status: 400 }
        );
      }

      const { user, token } = await AuthService.login(email, password);

      const response = NextResponse.json({
        success: true,
        message: "Login successful",
        user,
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
    } catch (error: any) {
      console.error("Login Controller Error:", error.message);
      return NextResponse.json(
        { success: false, message: error.message || "Failed to sign in" },
        { status: 401 }
      );
    }
  }

  /**
   * Handle Registration Request
   */
  static async register(request: NextRequest): Promise<NextResponse> {
    try {
      const body = await request.json();
      const { name, email, password } = body;

      if (!name || !email || !password) {
        return NextResponse.json(
          { success: false, message: "Name, email, and password are required" },
          { status: 400 }
        );
      }

      const { user, token } = await AuthService.register(name, email, password);

      const response = NextResponse.json(
        {
          success: true,
          message: "Registration successful",
          user,
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
    } catch (error: any) {
      console.error("Register Controller Error:", error.message);
      return NextResponse.json(
        { success: false, message: error.message || "Registration failed" },
        { status: 400 }
      );
    }
  }

  /**
   * Get Authenticated User Profile (Me)
   */
  static async getMe(request: NextRequest): Promise<NextResponse> {
    try {
      const token = getTokenFromRequest(request);

      if (!token) {
        return NextResponse.json(
          { success: false, message: "Unauthorized: No token provided", user: null },
          { status: 401 }
        );
      }

      const payload = await verifyToken(token);
      if (!payload || !payload.userId) {
        return NextResponse.json(
          { success: false, message: "Unauthorized: Invalid or expired token", user: null },
          { status: 401 }
        );
      }

      const user = await AuthService.getCurrentUser(payload.userId);
      if (!user) {
        return NextResponse.json(
          { success: false, message: "User not found", user: null },
          { status: 404 }
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
          createdAt: user.createdAt,
        },
      });
    } catch (error: any) {
      console.error("GetMe Controller Error:", error.message);
      return NextResponse.json(
        { success: false, message: "Failed to authenticate session", user: null },
        { status: 401 }
      );
    }
  }

  /**
   * Handle Logout Request
   */
  static async logout(): Promise<NextResponse> {
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    // Clear cookie
    response.cookies.set("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return response;
  }
}
