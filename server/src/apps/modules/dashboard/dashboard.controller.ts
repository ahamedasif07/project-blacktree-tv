import prisma from "@/infrastructure/database/connection";
import { asyncHandler } from "@/utils/asyncHandler";
import { APIError } from "better-auth";
import type { Request, Response } from "express";

// 1. GET /dashboard/overview
export const getOverview = asyncHandler(async (req: Request, res: Response) => {
  try {
    // User counts
    const totalUsers = await prisma.user.count({
      where: { role: "USER" },
    });

    const totalModerators = await prisma.user.count({
      where: { role: "MODERATOR" },
    });

    const totalBannedUsers = await prisma.user.count({
      where: { banned: true },
    });

    const totalActiveUsers = await prisma.user.count({
      where: { banned: false },
    });

    // Subscriber & Subscription counts
    const totalSubscribers = await prisma.user.count({
      where: {
        subscription: {
          some: { status: "ACTIVE" },
        },
      },
    });

    const activeSubscriptions = await prisma.subscription.count({
      where: { status: "ACTIVE" },
    });

    const expiredSubscriptions = await prisma.subscription.count({
      where: { status: "EXPIRED" },
    });

    const cancelledSubscriptions = await prisma.subscription.count({
      where: { status: "CANCELLED" },
    });

    // Financial calculations
    const revenueAggregation = await prisma.paymentHistory.aggregate({
      where: { status: "SUCCESS" },
      _sum: { amount: true },
    });

    const totalRevenue = revenueAggregation._sum.amount
      ? Number(revenueAggregation._sum.amount)
      : 0;

    return res.status(200).json({
      success: true,
      message: "Dashboard overview stats retrieved successfully",
      data: {
        users: {
          total: totalUsers,
          moderators: totalModerators,
          banned: totalBannedUsers,
          active: totalActiveUsers,
        },
        subscriptions: {
          totalSubscribers,
          active: activeSubscriptions,
          expired: expiredSubscriptions,
          cancelled: cancelledSubscriptions,
        },
        finance: {
          totalRevenue,
        },
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      return res.status(Number(error.status) || 400).json({
        success: false,
        message: error.message,
        code: error.body?.code || "AUTH_ERROR",
      });
    }

    console.error("Dashboard Overview Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// 2. GET /dashboard/analytics
export const getAnalytics = asyncHandler(async (req: Request, res: Response) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    // Fetch data for the last 7 days
    const userSignups = await prisma.user.findMany({
      where: { createdAt: { gte: sevenDaysAgo } },
      select: { createdAt: true },
    });

    const paymentHistory = await prisma.paymentHistory.findMany({
      where: {
        status: "SUCCESS",
        createdAt: { gte: sevenDaysAgo },
      },
      select: {
        createdAt: true,
        amount: true,
      },
    });

    // Helper to generate the last 7 date keys (YYYY-MM-DD)
    const getDatesArray = (days: number) => {
      const dates = [];
      for (let i = days - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dates.push(d.toISOString().split("T")[0]!);
      }
      return dates;
    };

    const dateLabels = getDatesArray(7);

    // Group user signups by date
    const registrationTrends = dateLabels.map((date) => {
      const count = userSignups.filter(
        (u) => u.createdAt.toISOString().split("T")[0] === date
      ).length;
      return { date, count };
    });

    // Group successful revenue by date
    const revenueTrends = dateLabels.map((date) => {
      const amount = paymentHistory
        .filter((p) => p.createdAt.toISOString().split("T")[0] === date)
        .reduce((sum, p) => sum + Number(p.amount), 0);
      return { date, amount };
    });

    return res.status(200).json({
      success: true,
      message: "Dashboard analytics trends retrieved successfully",
      data: {
        registrationTrends,
        revenueTrends,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      return res.status(Number(error.status) || 400).json({
        success: false,
        message: error.message,
        code: error.body?.code || "AUTH_ERROR",
      });
    }

    console.error("Dashboard Analytics Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// 3. GET /dashboard/recent-users
export const getRecentUsers = asyncHandler(async (req: Request, res: Response) => {
  try {
    const recentUsers = await prisma.user.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        banned: true,
        emailVerified: true,
        image: true,
        createdAt: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Recent users retrieved successfully",
      data: recentUsers,
    });
  } catch (error) {
    if (error instanceof APIError) {
      return res.status(Number(error.status) || 400).json({
        success: false,
        message: error.message,
        code: error.body?.code || "AUTH_ERROR",
      });
    }

    console.error("Dashboard Recent Users Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// 4. GET /dashboard/activity
export const getActivity = asyncHandler(async (req: Request, res: Response) => {
  try {
    const recentActivity = await prisma.moderationLog.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        moderator: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        targetUser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Recent dashboard activity logs retrieved successfully",
      data: recentActivity,
    });
  } catch (error) {
    if (error instanceof APIError) {
      return res.status(Number(error.status) || 400).json({
        success: false,
        message: error.message,
        code: error.body?.code || "AUTH_ERROR",
      });
    }

    console.error("Dashboard Activity Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});
