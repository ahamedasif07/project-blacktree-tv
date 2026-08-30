/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/video
 * Retrieves video files with optional search, provider filtering, pagination, and sorting.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const search = searchParams.get("search") || "";
    const provider = searchParams.get("provider") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const sortBy = searchParams.get("sortBy") || "title"; // title, createdAt, size
    const order = searchParams.get("order") === "desc" ? "desc" : "asc";

    // Validate page/limit bounds
    const currentPage = Math.max(1, page);
    const currentLimit = Math.max(1, Math.min(100, limit)); // cap limit at 100 per page

    // Build Prisma query clauses
    const where: any = {};

    if (search) {
      where.title = {
        contains: search,
        mode: "insensitive", // case-insensitive search
      };
    }

    if (provider) {
      where.provider = {
        equals: provider,
        mode: "insensitive",
      };
    }

    // Build orderBy clause
    const orderBy: any = {};
    if (["title", "createdAt", "size"].includes(sortBy)) {
      orderBy[sortBy] = order;
    } else {
      orderBy.title = "asc";
    }

    // Get total count and records in parallel
    const [total, videos] = await Promise.all([
      prisma.videoFile.count({ where }),
      prisma.videoFile.findMany({
        where,
        orderBy,
        skip: (currentPage - 1) * currentLimit,
        take: currentLimit,
      }),
    ]);

    const totalPages = Math.ceil(total / currentLimit);

    return NextResponse.json({
      success: true,
      data: videos,
      serverTime: Date.now(),
      pagination: {
        total,
        page: currentPage,
        limit: currentLimit,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
      },
    });
  } catch (error: any) {
    console.error("Error in GET /api/video:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch videos",
        details: error.message || error,
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/video
 * Creates a new video file record in the database.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, provider, videoUrl, size } = body;

    // Validate required fields
    if (!title || !provider || !videoUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: title, provider, and videoUrl are required.",
        },
        { status: 400 }
      );
    }

    const newVideo = await prisma.videoFile.create({
      data: {
        title,
        provider,
        videoUrl,
        size: typeof size === "number" ? size : null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: newVideo,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in POST /api/video:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create video record",
        details: error.message || error,
      },
      { status: 500 }
    );
  }
}
