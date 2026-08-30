import { SignJWT, jwtVerify, JWTPayload } from "jose";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "blacktree-tv-super-secret-jwt-key-2026-secure";
const key = new TextEncoder().encode(JWT_SECRET);

export interface TokenPayload extends JWTPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
}

/**
 * Generate a signed JWT token using jose
 */
export async function signToken(payload: TokenPayload, expiresIn: string = "7d"): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(key);
}

/**
 * Verify a JWT token using jose
 */
export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload as unknown as TokenPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Extract token from NextRequest (Cookies or Authorization Header)
 */
export function getTokenFromRequest(request: NextRequest): string | null {
  // 1. Try reading from auth-token cookie
  const cookieToken = request.cookies.get("auth-token")?.value || request.cookies.get("token")?.value;
  if (cookieToken) {
    return cookieToken;
  }

  // 2. Try reading from Authorization: Bearer <token>
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7).trim();
  }

  return null;
}
