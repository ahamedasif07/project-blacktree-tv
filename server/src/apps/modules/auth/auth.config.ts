import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, bearer, emailOTP, jwt } from "better-auth/plugins";
import prisma from "../../../infrastructure/database/connection";
import { sendOTPEmail } from "../../../infrastructure/email/auth.email";
import config from "../../../config";

export const auth = betterAuth({
  secret: config.betterAuth.secret,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  baseURL: config.betterAuth.url,
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost",
    ...(config.cors.origin === "*" ? [] : config.cors.origin),
  ],

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: config.betterAuth.google.clientId || "",
      clientSecret: config.betterAuth.google.clientSecret || "",
    },
  },

  advanced: {
    cookiePrefix: "blacktree",
    useSecureCookies: false,
  },

  debug: true,

  plugins: [
    admin({
      defaultRole: "USER",
      adminRoles: ["ADMIN"],
    }),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        await sendOTPEmail(email, otp, type);
      },
    }),
    jwt({
      jwt: {
        expirationTime: "1h",
      },
    }),
    bearer(),
  ],
});

console.log("[Better Auth] Configured Base URL:", auth.options.baseURL);
