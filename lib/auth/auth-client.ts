import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: (process.env.NEXT_PUBLIC_BETTER_AUTH_URL?.trim()) || 
    (typeof window !== "undefined" 
      ? window.location.origin + "/api/auth" 
      : "http://localhost:5000/api/auth"),
});