import { NextRequest } from "next/server";
import { proxyMiddleware } from "@/lib/proxy";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/") && !pathname.startsWith("/api/video")) {
    return proxyMiddleware(request);
  }
}

export const config = {
  matcher: ["/api/:path*"],
};
