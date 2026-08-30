import express, { Router } from "express";
import { protect } from "../../middleware/auth.middleware";
import * as authController from "./auth.controller";
import prisma from "../../../infrastructure/database/connection";

const authRouter = Router();

// 1. Custom Signup/Login Routes
authRouter.post("/sign-up", express.json(), authController.signUp);
authRouter.post("/sign-in", express.json(), authController.signIn);
authRouter.post("/login-initiate", express.json(), authController.loginInitiate);
authRouter.post("/login-verify", express.json(), authController.loginVerify);
authRouter.post("/logout", protect, authController.logout);
authRouter.post("/get-session", protect, authController.getSession);
authRouter.post("/forgot-password", express.json(), authController.forgotPassword);
authRouter.post("/reset-password", express.json(), authController.resetPassword);
authRouter.post("/change-password", protect, express.json(), authController.changePassword);
authRouter.post("/verify-otp", express.json(), authController.verifyOtpCode);
authRouter.post("/verify-reset-otp", express.json(), authController.verifyResetOtp);
authRouter.post("/verify-email-otp", express.json(), authController.verifyEmailOTP);
authRouter.post("/resend-otp", express.json(), authController.resendOtpCode);
authRouter.post("/test-email", express.json(), authController.testEmail);

// 3. Get current user (protected)
authRouter.get("/me", protect, async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        image: true,
        subscription: {
          where: { status: "ACTIVE" },
          select: { plan: true },
          take: 1,
        },
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Session is valid",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        image: user.image,
        subscription: user.subscription?.[0] ? { type: user.subscription[0].plan } : null,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default authRouter;
