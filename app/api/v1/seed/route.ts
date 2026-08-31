import { NextResponse } from "next/server";
import { runDatabaseSeed } from "@/scripts/seed";

export async function GET() {
  try {
    const result = await runDatabaseSeed();
    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      data: result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error during seeding";
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  return GET();
}
