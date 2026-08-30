import { APIError } from "better-auth/api";
import { fromNodeHeaders } from "better-auth/node";
import type { Request, Response } from "express";

import { asyncHandler } from "../../../utils/asyncHandler";
import { auth } from "./auth.config";
import prisma from "../../../infrastructure/database/connection";
import { sendOTPEmail } from "@/infrastructure/email/auth.email";
import emailService from "../../../infrastructure/email/email";


export const signIn = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, password, rememberMe } = req.body;

    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
        rememberMe: !!rememberMe,
      },

      headers: fromNodeHeaders(req.headers),
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    if (error instanceof APIError) {
      return res.status(Number(error.status) || 400).json({
        success: false,
        message: error.message,
        code: error.body?.code || "AUTH_ERROR",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export const signUp = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const result = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },

      headers: fromNodeHeaders(req.headers),
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: result,
    });
  } catch (error) {
    if (error instanceof APIError) {
      return res.status(Number(error.status) || 400).json({
        success: false,
        message: error.message,
        code: error.body?.code || "AUTH_ERROR",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  try {
    const result = await auth.api.signOut({
      headers: fromNodeHeaders(req.headers),
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
      data: result,
    });
  } catch (error) {
    if (error instanceof APIError) {
      return res.status(Number(error.status) || 400).json({
        success: false,
        message: error.message,
        code: error.body?.code || "AUTH_ERROR",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export const getSession = asyncHandler(async (req: Request, res: Response) => {
  try {
    const result = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    return res.status(200).json({
      success: true,
      message: "Session retrieved successfully",
      data: result,
    });
  } catch (error) {
    if (error instanceof APIError) {
      return res.status(Number(error.status) || 400).json({
        success: false,
        message: error.message,
        code: error.body?.code || "AUTH_ERROR",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      const result = await auth.api.sendVerificationOTP({
        body: {
          email,
          type: "forget-password",
        },
        
        headers: fromNodeHeaders(req.headers),
      });

      return res.status(200).json({
        success: true,
        message: "Verification OTP sent to your email",
        data: result,
      });
    } catch (error) {
      if (error instanceof APIError) {
        return res.status(Number(error.status) || 400).json({
          success: false,
          message: error.message,
          code: error.body?.code || "AUTH_ERROR",
        });
      }

      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { token, email, otp, password } = req.body;

      let result;
      if (otp && email) {
        // OTP-based password reset (Better Auth emailOTP plugin)
        result = await (auth.api as any).resetPasswordEmailOTP({
          body: {
            email,
            otp,
            password,
          },
          headers: fromNodeHeaders(req.headers),
        });
      } else {
        // Token-based password reset (standard emailAndPassword link-based reset)
        result = await auth.api.resetPassword({
          body: {
            token,
            newPassword: password,
          },
          headers: fromNodeHeaders(req.headers),
        });
      }

      return res.status(200).json({
        success: true,
        message: "Reset password successful",
        data: result,
      });
    } catch (error: any) {
      const isApiError = error instanceof APIError || (error && typeof error === 'object' && ('statusCode' in error || 'status' in error));
      
      if (isApiError) {
        const status = error.statusCode || error.status || 400;
        const body = error.body || {};
        return res.status(Number(status) || 400).json({
          success: false,
          message: error.message || "Failed to reset password",
          code: body.code || "AUTH_ERROR",
        });
      }

      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

export const changePassword = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { oldPassword, newPassword } = req.body;

      const result = await auth.api.changePassword({
        body: {
          currentPassword: oldPassword,
          newPassword,
        },

        headers: fromNodeHeaders(req.headers),
      });

      return res.status(200).json({
        success: true,
        message: "Change password successful",
        data: result,
      });
    } catch (error) {
      if (error instanceof APIError) {
        return res.status(Number(error.status) || 400).json({
          success: false,
          message: error.message,
          code: error.body?.code || "AUTH_ERROR",
        });
      }

      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

export const verifyOtpCode = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { email, code, otp, type } = req.body;
      const finalOtp = code || otp;

      if (!finalOtp) {
        return res.status(400).json({
          success: false,
          message: "OTP code is required",
        });
      }

      const result = await auth.api.verifyEmailOTP({
        body: {
          email,
          otp: finalOtp,
        },

        headers: fromNodeHeaders(req.headers),
      });

      return res.status(200).json({
        success: true,
        message: "OTP code verified successfully",
        data: result,
      });
    } catch (error: any) {
      const isApiError = error instanceof APIError || (error && typeof error === 'object' && ('statusCode' in error || 'status' in error));
      
      if (isApiError) {
        const status = error.statusCode || error.status || 400;
        const body = error.body || {};
        return res.status(Number(status) || 400).json({
          success: false,
          message: error.message || "Verification failed",
          code: body.code || "AUTH_ERROR",
        });
      }

      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

export const resendOtpCode = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { email, type } = req.body;

      const result = await auth.api.sendVerificationOTP({
        body: {
          email,
          type,
        },
        headers: fromNodeHeaders(req.headers),
      });

      return res.status(200).json({
        success: true,
        message: "OTP code resent successfully",
        data: result,
      });
    } catch (error) {
      if (error instanceof APIError) {
        return res.status(Number(error.status) || 400).json({
          success: false,
          message: error.message,
          code: error.body?.code || "AUTH_ERROR",
        });
      }

      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

export const verifyEmailOTP = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { email, otp } = req.body;

      const result = await auth.api.verifyEmailOTP({
        body: {
          email,
          otp,
        },
        headers: fromNodeHeaders(req.headers),
      });

      return res.status(200).json({
        success: true,
        message: "Email OTP verified successfully",
        data: result,
      });
    } catch (error) {
      if (error instanceof APIError) {
        return res.status(Number(error.status) || 400).json({
          success: false,
          message: error.message,
          code: error.body?.code || "AUTH_ERROR",
        });
      }

      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

export const verifyResetOtp = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) {
        return res.status(400).json({
          success: false,
          message: "Email and OTP are required",
        });
      }

      const verifications = await prisma.verification.findMany({
        where: {
          identifier: {
            in: [email, `forget-password-otp-${email}`],
          },
          expiresAt: { gt: new Date() },
        },
      });

      const verification = verifications.find(
        (v) => v.value === otp || v.value.startsWith(`${otp}:`)
      );

      if (!verification) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired OTP code",
        });
      }

      return res.status(200).json({
        success: true,
        message: "OTP code verified successfully",
      });
    } catch (error: any) {
      console.error("Verify reset OTP error:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }
);

export const loginInitiate = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 1. Verify credentials by invoking Better Auth programmatically (without client headers/cookies)
    try {
      await auth.api.signInEmail({
        body: {
          email,
          password,
        },
      });
    } catch (err: any) {
      // If Better Auth throws an error, the credentials are invalid
      return res.status(401).json({
        success: false,
        message: err.message || "Invalid email or password",
      });
    }

    // 2. Credentials are correct! Let's generate a 6-digit secure numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 3. Save the OTP to the Verification table (expire in 5 minutes)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    const identifier = `login-otp:${email}`;

    // Clean up any existing login OTPs for this email first
    await prisma.verification.deleteMany({
      where: { identifier },
    });

    await prisma.verification.create({
      data: {
        identifier,
        value: otp,
        expiresAt,
      },
    });

    // 4. Send the OTP to the user's email
    await sendOTPEmail(email, otp, "sign-in");

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email. Please verify OTP to complete login.",
      data: {
        email,
        requireOTP: true,
      },
    });
  } catch (error) {
    console.error("Login initiate error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export const loginVerify = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, password, otp, rememberMe } = req.body;

    if (!email || !password || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and OTP are required",
      });
    }

    // 1. Find the OTP record in the Verification table
    const identifier = `login-otp:${email}`;
    const verification = await prisma.verification.findFirst({
      where: {
        identifier,
        value: otp,
        expiresAt: { gt: new Date() },
      },
    });

    if (!verification) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP code",
      });
    }

    // 2. OTP is valid! Delete the verification record to prevent replay attacks
    await prisma.verification.delete({
      where: { id: verification.id },
    });

    // 3. Complete the login using Better Auth (passing actual client headers to set session cookies)
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
        rememberMe: !!rememberMe,
      },
      headers: fromNodeHeaders(req.headers),
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    if (error instanceof APIError) {
      return res.status(Number(error.status) || 400).json({
        success: false,
        message: error.message,
        code: error.body?.code || "AUTH_ERROR",
      });
    }

    console.error("Login verify error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export const testEmail = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { to, service } = req.body;
    if (!to) {
      return res.status(400).json({
        success: false,
        message: "Recipient email (to) is required",
      });
    }

    if (service === "generic") {
      await emailService.sendEmail({
        to,
        subject: "Test Generic Email - Blacktree TV",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #E50914; text-align: center;">Blacktree TV</h2>
            <p>This is a test email sent from the Blacktree TV generic email service.</p>
            <p>The service is configured and working perfectly!</p>
          </div>
        `,
        text: "This is a test email sent from the Blacktree TV generic email service.",
      });
    } else {
      await sendOTPEmail(to, "987654", "email-verification");
    }

    return res.status(200).json({
      success: true,
      message: `Test email (${service || "auth"}) sent successfully to ${to}`,
    });
  } catch (error: any) {
    console.error("Test email failed:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send test email",
      error: error.message || error,
    });
  }
});
