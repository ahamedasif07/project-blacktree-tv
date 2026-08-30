import prisma from "@/infrastructure/database/connection";
import { asyncHandler } from "@/utils/asyncHandler";
import type { Request, Response } from "express";

export const getMovies = asyncHandler(async (req: Request, res: Response) => {
  try {
    const {
      genre,
      language,
      featured,
      search,
      status,
      visibility,
      page: qPage,
      limit: qLimit,
      sortBy: qSortBy,
      sortOrder: qSortOrder,
    } = req.query;

    const where: any = {
      deletedAt: null, // support soft delete
    };

    // --- SECURITY FILTERING ---
    // Only allow querying other statuses/visibilities if requested by an Admin or Moderator
    // Otherwise, strictly force PUBLISHED and PUBLIC to avoid leaking drafts or private movies
    const reqUser = (req as any).user;
    const isPrivileged = reqUser && (reqUser.role === "ADMIN" || reqUser.role === "MODERATOR");

    if (isPrivileged && status) {
      where.status = status as any;
    } else {
      where.status = "PUBLISHED";
    }

    if (isPrivileged && visibility) {
      where.visibility = visibility as any;
    } else {
      where.visibility = "PUBLIC";
    }

    // --- FUNCTIONAL FILTERS ---
    // 1. Genre filter (by Genre slug)
    if (genre) {
      where.genres = {
        some: {
          genre: {
            slug: genre as string,
          },
        },
      };
    }

    // 2. Language filter (by Language code)
    if (language) {
      where.language = {
        code: language as string,
      };
    }

    // 3. Featured filter
    if (featured) {
      where.featured = featured === "true";
    }

    // 4. Case-insensitive Search (on PostgreSQL/Neon)
    if (search) {
      const searchStr = search as string;
      where.OR = [
        { title: { contains: searchStr, mode: "insensitive" } },
        { description: { contains: searchStr, mode: "insensitive" } },
        { shortDescription: { contains: searchStr, mode: "insensitive" } },
      ];
    }

    // --- PAGINATION CONFIG ---
    const page = Math.max(1, Number(qPage) || 1);
    const limit = Math.max(1, Math.min(100, Number(qLimit) || 12));
    const skip = (page - 1) * limit;

    // --- SORTING CONFIG ---
    const validSortFields = [
      "createdAt",
      "releaseDate",
      "popularityScore",
      "viewsCount",
      "imdbRating",
      "title",
    ];
    const sortBy = validSortFields.includes(qSortBy as string) ? (qSortBy as string) : "createdAt";
    const sortOrder = qSortOrder === "asc" ? "asc" : "desc";

    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // --- DATABASE ACTIONS ---
    // 1. Fetch total counts for pagination metadata
    const totalCount = await prisma.movie.count({ where });

    // 2. Fetch movies with relations
    const movies = await prisma.movie.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        maturityRating: true,
        language: true,
        genres: {
          include: {
            genre: true,
          },
        },
        cast: {
          include: {
            actor: true,
          },
          orderBy: {
            displayOrder: "asc",
          },
        },
        assets: true,
        trailers: true,
        keywords: {
          include: {
            keyword: true,
          },
        },
      },
    });

    // --- SERIALIZATION & JUNCTION FLATTENING ---
    // Flatten Prisma's relational structures and convert BigInt values safely to Numbers
    const formattedMovies = movies.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        slug: movie.slug,
        shortDescription: movie.shortDescription,
        description: movie.description,
        releaseDate: movie.releaseDate,
        durationSeconds: movie.durationSeconds,
        imdbRating: movie.imdbRating,
        popularityScore: movie.popularityScore,
        status: movie.status,
        visibility: movie.visibility,
        featured: movie.featured,
        viewsCount: Number(movie.viewsCount), // Safe BigInt to Number conversion
        publishedAt: movie.publishedAt,
        createdAt: movie.createdAt,
        updatedAt: movie.updatedAt,
        maturityRating: movie.maturityRating ? {
          id: movie.maturityRating.id,
          code: movie.maturityRating.code,
          description: movie.maturityRating.description,
        } : null,
        language: movie.language ? {
          id: movie.language.id,
          name: movie.language.name,
          code: movie.language.code,
        } : null,
        genres: movie.genres.map((g) => ({
          id: g.genre.id,
          name: g.genre.name,
          slug: g.genre.slug,
        })),
        keywords: movie.keywords.map((k) => k.keyword.name),
        cast: movie.cast.map((c) => ({
          actorId: c.actor.id,
          name: c.actor.name,
          characterName: c.characterName,
          roleType: c.roleType,
          displayOrder: c.displayOrder,
        })),
        assets: movie.assets.map((asset) => ({
          id: asset.id,
          type: asset.type,
          storageKey: asset.storageKey,
          playbackUrl: asset.playbackUrl,
          mimeType: asset.mimeType,
          width: asset.width,
          height: asset.height,
          duration: asset.duration,
          sizeInBytes: asset.sizeInBytes ? Number(asset.sizeInBytes) : null, // Safe BigInt conversion
          isPrimary: asset.isPrimary,
          createdAt: asset.createdAt,
        })),
        trailers: movie.trailers.map((t) => ({
          id: t.id,
          title: t.title,
          playbackUrl: t.playbackUrl,
          thumbnailUrl: t.thumbnailUrl,
          createdAt: t.createdAt,
        })),
      };
    });

    return res.status(200).json({
      success: true,
      message: "Movies retrieved successfully",
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
        totalItems: totalCount,
        hasMore: page * limit < totalCount,
      },
      data: formattedMovies,
    });
  } catch (error: any) {
    console.error("Error fetching movies:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error occurred while retrieving movies.",
      error: error.message,
    });
  }
});
