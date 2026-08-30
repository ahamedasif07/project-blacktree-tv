import { NextRequest } from "next/server";
import { AuthController } from "@/controllers/auth.controller";

export async function GET(request: NextRequest) {
  return AuthController.getMe(request);
}
