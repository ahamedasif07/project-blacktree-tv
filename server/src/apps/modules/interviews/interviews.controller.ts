import prisma from "@/infrastructure/database/connection";
import { asyncHandler } from "@/utils/asyncHandler";
import type { Request, Response } from "express";

export const getInterviews = asyncHandler(async (req: Request, res: Response) => {
  try {
    const {
      actor,
      movie,
      series,
      tag,
      isFeatured,
      status,
      search,
      page: qPage,
      limit: qLimit,
      sortBy: qSortBy,
      sortOrder: qSortOrder,
    } = req.query;

    const where: any = {};

    // --- SECURITY FILTERING ---
    // Only allow querying other statuses if requested by an Admin or Moderator
    // Otherwise, strictly force PUBLISHED to avoid leaking draft records
    const reqUser = (req as any).user;
    const isPrivileged = reqUser && (reqUser.role === "ADMIN" || reqUser.role === "MODERATOR");

    if (isPrivileged && status) {
      where.status = status as any;
    } else {
      where.status = "PUBLISHED";
    }

    // --- FUNCTIONAL FILTERS ---
    // 1. Actor filter (by Actor ID or slug)
    if (actor) {
      where.OR = [
        { actorId: actor as string },
        { actor: { slug: actor as string } },
      ];
    }

    // 2. Movie filter (by Movie ID or slug)
    if (movie) {
      where.OR = [
        { movieId: movie as string },
        { movie: { slug: movie as string } },
      ];
    }

    // 3. Series filter (by Series ID or slug)
    if (series) {
      where.OR = [
        { seriesId: series as string },
        { series: { slug: series as string } },
      ];
    }

    // 4. Tag filter (by Tag slug or name)
    if (tag) {
      where.tags = {
        some: {
          tag: {
            slug: tag as string,
          },
        },
      };
    }

    // 5. Featured filter
    if (isFeatured) {
      where.isFeatured = isFeatured === "true";
    }

    // 6. Case-insensitive Search (on PostgreSQL/Neon)
    if (search) {
      const searchStr = search as string;
      where.OR = [
        { title: { contains: searchStr, mode: "insensitive" } },
        { description: { contains: searchStr, mode: "insensitive" } },
      ];
    }

    // --- PAGINATION CONFIG ---
    const page = Math.max(1, Number(qPage) || 1);
    const limit = Math.max(1, Math.min(100, Number(qLimit) || 12));
    const skip = (page - 1) * limit;

    // --- SORTING CONFIG ---
    const validSortFields = [
      "createdAt",
      "publishedAt",
      "viewsCount",
      "durationSeconds",
      "title",
    ];
    const sortBy = validSortFields.includes(qSortBy as string) ? (qSortBy as string) : "createdAt";
    const sortOrder = qSortOrder === "asc" ? "asc" : "desc";

    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // --- DATABASE ACTIONS ---
    // 1. Fetch total counts for pagination metadata
    const totalCount = await prisma.actorInterview.count({ where });

    // 2. Fetch interviews with relations
    const interviews = await prisma.actorInterview.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        actor: true,
        movie: true,
        series: true,
        tags: {
          include: {
            tag: true,
          },
        },
        assets: true,
      },
    });

    // --- SERIALIZATION & JUNCTION FLATTENING ---
    // Flatten relational structures and convert BigInt values safely to Numbers
    const formattedInterviews = interviews.map((interview) => {
      return {
        id: interview.id,
        title: interview.title,
        slug: interview.slug,
        description: interview.description,
        videoUrl: interview.videoUrl,
        thumbnailUrl: interview.thumbnailUrl,
        durationSeconds: interview.durationSeconds,
        languageId: interview.languageId,
        publishedAt: interview.publishedAt,
        viewsCount: Number(interview.viewsCount), // Safe BigInt to Number conversion
        status: interview.status,
        isFeatured: interview.isFeatured,
        createdAt: interview.createdAt,
        updatedAt: interview.updatedAt,
        actor: interview.actor ? {
          id: interview.actor.id,
          name: interview.actor.name,
          slug: interview.actor.slug,
          profileImage: interview.actor.profileImage,
        } : null,
        movie: interview.movie ? {
          id: interview.movie.id,
          title: interview.movie.title,
          slug: interview.movie.slug,
        } : null,
        series: interview.series ? {
          id: interview.series.id,
          title: interview.series.title,
          slug: interview.series.slug,
        } : null,
        tags: interview.tags.map((t) => ({
          id: t.tag.id,
          name: t.tag.name,
          slug: t.tag.slug,
        })),
        assets: interview.assets.map((asset) => ({
          id: asset.id,
          type: asset.type,
          storageKey: asset.storageKey,
          playbackUrl: asset.playbackUrl,
          language: asset.language,
          createdAt: asset.createdAt,
        })),
      };
    });

    return res.status(200).json({
      success: true,
      message: "Interviews retrieved successfully",
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
        totalItems: totalCount,
        hasMore: page * limit < totalCount,
      },
      data: formattedInterviews,
    });
  } catch (error: any) {
    console.error("Error fetching interviews:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error occurred while retrieving interviews.",
      error: error.message,
    });
  }
});

export const createInterview = asyncHandler(async (req: Request, res: Response) => {
  return res.status(501).json({
    success: false,
    message: "Create interview endpoint not implemented yet.",
  });
});

export const updateInterview = asyncHandler(async (req: Request, res: Response) => {
  return res.status(501).json({
    success: false,
    message: "Update interview endpoint not implemented yet.",
  });
});

export const deleteInterview = asyncHandler(async (req: Request, res: Response) => {
  return res.status(501).json({
    success: false,
    message: "Delete interview endpoint not implemented yet.",
  });
});

export const getInterview = asyncHandler(async (req: Request, res: Response) => {
  return res.status(501).json({
    success: false,
    message: "Get interview endpoint not implemented yet.",
  });
});

export const getInterviewById = asyncHandler(async (req: Request, res: Response) => {
  return res.status(501).json({
    success: false,
    message: "Get interview by ID endpoint not implemented yet.",
  });
});