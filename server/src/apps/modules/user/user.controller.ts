import prisma from "@/infrastructure/database/connection";
import { asyncHandler } from "@/utils/asyncHandler";
import { APIError } from "better-auth";
import type { Request, Response } from "express";
import { ZUpdateProfile } from "./user.validators";

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  try {
    const result = await prisma.user.findMany({
      where: {
        role: "USER",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        sessions: {
          select: {
            id: true,
            expiresAt: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        profile: true,
        emailVerified: true,
        image: true,
        accounts: {
          select: {
            id: true,
            providerId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
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

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (
      (req.user as any)?.role !== "ADMIN" &&
      (req.user as any)?.role !== "MODERATOR" &&
      (req.user as any)?.id !== id
    ) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to view this profile",
      });
    }

    const result = await prisma.user.findUnique({
      where: {
        id: id as string,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        sessions: {
          select: {
            id: true,
            expiresAt: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        profile: true,
        emailVerified: true,
        image: true,
        accounts: {
          select: {
            id: true,
            providerId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "User retrieved successfully",
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

export const deleteAccount = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if ((req.user as any)?.role !== "ADMIN" && (req.user as any)?.id !== id) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to delete this account",
        });
      }

      const result = await prisma.user.delete({
        where: {
          id: id as string,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Account deleted successfully",
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
  },
);

export const userProfile = asyncHandler(async (req: Request, res: Response) => {
  try {
    const userId = req.params.id as string;

    // if ((req.user as any)?.role !== "ADMIN" && (req.user as any)?.id !== userId) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "You do not have permission to view this profile",
    //   });
    // }

    const user = await prisma.user.findUnique({
      where: {
        id: userId as string,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        emailVerified: true,
        image: true,
        profile: {
          select: {
            id: true,
            displayName: true,
            avatar: true,
            banner: true,
            bio: true,
            country: true,
            language: true,
            facebookUrl: true,
            youtubeUrl: true,
            discordUrl: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        sessions: {
          select: {
            id: true,
            expiresAt: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        accounts: {
          select: {
            id: true,
            providerId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        subscription: {
          select: {
            id: true,
            status: true,
            plan: true,
            startDate: true,
            endDate: true,
            cancelledAt: true,
            payments: {
              select: {
                id: true,
                amount: true,
                currency: true,
                status: true,
                paidAt: true,
                failureReason: true,
                metadata: true,
                createdAt: true,
              },
            },
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "User profile retrieved successfully",
      data: user,
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

export const getCurrentUserProfile = asyncHandler(async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        emailVerified: true,
        image: true,
        profile: {
          select: {
            id: true,
            displayName: true,
            avatar: true,
            banner: true,
            bio: true,
            country: true,
            language: true,
            facebookUrl: true,
            youtubeUrl: true,
            discordUrl: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        sessions: {
          select: {
            id: true,
            expiresAt: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        accounts: {
          select: {
            id: true,
            providerId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        subscription: {
          select: {
            id: true,
            status: true,
            plan: true,
            startDate: true,
            endDate: true,
            cancelledAt: true,
            payments: {
              select: {
                id: true,
                amount: true,
                currency: true,
                status: true,
                paidAt: true,
                failureReason: true,
                metadata: true,
                createdAt: true,
              },
            },
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Current user profile retrieved successfully",
      data: user,
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

export const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
    try {
      const userId = req.params.id as string;

      // 1. Authorization check
      if ((req.user as any)?.role !== "ADMIN" && (req.user as any)?.id !== userId) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to update this profile",
        });
      }

      // 2. Validate request body using ZUpdateProfile schema
      const parsed = ZUpdateProfile.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        });
      }

      const { name, image, ...profileData } = parsed.data;

      // 3. Construct Prisma update payload
      const updatePayload: any = {};

      if (name !== undefined) {
        updatePayload.name = name;
      }
      if (image !== undefined) {
        updatePayload.image = image;
      }

      if (Object.keys(profileData).length > 0) {
        updatePayload.profile = {
          upsert: {
            create: profileData,
            update: profileData,
          },
        };
      }

      const user = await prisma.user.update({
        where: {
          id: userId as string,
        },
        data: updatePayload,
        select: {
          name: true,
          email: true,
          image: true,
          profile: {
            select: {
              displayName: true,
              avatar: true,
              banner: true,
              bio: true,
              country: true,
              language: true,
              facebookUrl: true,
              youtubeUrl: true,
              discordUrl: true,
            },
          },
        },
      });

      return res.status(200).json({
        success: true,
        message: "User profile updated successfully",
        data: user,
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
  },
);
