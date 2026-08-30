import { ZodError } from "zod";

export const handleAuthError = (error: any) => {
  // Zod validation error
  if (error instanceof ZodError) {
    return {
      statusCode: 400,
      message: "Validation failed",
      errors: error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })),
    };
  }

  // Better Auth known errors
  if (error?.message) {
    const message = error.message.toLowerCase();

    if (message.includes("user already exists")) {
      return {
        statusCode: 409,
        message: "An account with this email already exists",
      };
    }

    if (
      message.includes("invalid email or password") ||
      message.includes("invalid credentials")
    ) {
      return {
        statusCode: 401,
        message: "Invalid email or password",
      };
    }

    if (message.includes("email not verified")) {
      return {
        statusCode: 403,
        message: "Please verify your email before logging in",
      };
    }

    if (message.includes("too many requests")) {
      return {
        statusCode: 429,
        message: "Too many attempts. Please try again later",
      };
    }
  }

  // fallback
  return {
    statusCode: 500,
    message: "Something went wrong. Please try again later",
  };
};


export const generateOTPCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};