import { NextRequest, NextResponse } from "next/server";

export function proxyMiddleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const backendHost = process.env.BACKEND_URL || "http://localhost:5000";
  const targetUrl = new URL(pathname + search, backendHost);
  
  // Set headers to forward details
  const headers = new Headers(request.headers);
  headers.set("x-forwarded-host", request.nextUrl.host);
  headers.set("x-forwarded-proto", request.nextUrl.protocol.replace(":", ""));

  return NextResponse.rewrite(targetUrl, {
    request: {
      headers,
    },
  });
}
