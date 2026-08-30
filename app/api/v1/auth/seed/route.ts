import { NextResponse } from "next/server";
import { AuthService } from "@/services/auth.service";

export async function GET() {
  try {
    await AuthService.seedSuperAdmin();
    return NextResponse.json({
      success: true,
      message: "Super Admin initialized: rxasif31@gmail.com (Name: RX asif 100, Role: SUPER_ADMIN)",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to seed super admin";
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}

export async function POST() {
  return GET();
}
