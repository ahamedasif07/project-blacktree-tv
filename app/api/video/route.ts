import { NextRequest, NextResponse } from "next/server";
import parsedVideos from "@/data/parsed/video.json";

export interface ParsedVideo {
  platform?: string;
  title?: string;
  runtimeSeconds?: number;
  videoUrl?: string;
}

export interface VideoResponseItem {
  id: string;
  title: string;
  provider: string;
  videoUrl: string;
  size: number;
  createdAt: string;
}

// High-quality Marvel Studios Avengers video clips & trailers fallback
const DEMO_FALLBACK_VIDEOS: VideoResponseItem[] = [
  {
    id: "marvel-avengers-endgame",
    title: "Marvel Studios' Avengers: Endgame - Official Trailer",
    provider: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
    size: 146,
    createdAt: new Date().toISOString(),
  },
  {
    id: "marvel-avengers-infinity-war",
    title: "Marvel Studios' Avengers: Infinity War - Official Trailer",
    provider: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=6ZfuNTqbHE8",
    size: 144,
    createdAt: new Date().toISOString(),
  },
  {
    id: "marvel-the-avengers",
    title: "Marvel Studios' The Avengers - Official Trailer",
    provider: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=eOrNdBpGMv8",
    size: 135,
    createdAt: new Date().toISOString(),
  },
  {
    id: "marvel-avengers-to-the-end",
    title: "Marvel Studios' Avengers: Endgame - 'To the End'",
    provider: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=0jNvJU52LvU",
    size: 150,
    createdAt: new Date().toISOString(),
  },
];

const typedParsedVideos: ParsedVideo[] = parsedVideos as ParsedVideo[];

// Map all parsed videos from video.json
const ALL_FALLBACK_VIDEOS: VideoResponseItem[] = [
  ...DEMO_FALLBACK_VIDEOS,
  ...typedParsedVideos.map((item, index) => ({
    id: `fallback-${index + 1}`,
    title: item.title || `Video ${index + 1}`,
    provider: item.platform || "Cloudflare",
    videoUrl: item.videoUrl || "",
    size: Math.round(item.runtimeSeconds || 3600),
    createdAt: new Date().toISOString(),
  })),
];

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

    let filtered = [...ALL_FALLBACK_VIDEOS];

    if (search) {
      filtered = filtered.filter((v) =>
        v.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (provider) {
      filtered = filtered.filter(
        (v) => v.provider.toLowerCase() === provider.toLowerCase()
      );
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "size") {
        return order === "desc" ? (b.size || 0) - (a.size || 0) : (a.size || 0) - (b.size || 0);
      }
      return order === "desc"
        ? b.title.localeCompare(a.title)
        : a.title.localeCompare(b.title);
    });

    const total = filtered.length;
    const videos = filtered.slice((currentPage - 1) * currentLimit, currentPage * currentLimit);
    const totalPages = Math.ceil(total / currentLimit) || 1;

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
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    console.error("Error in GET /api/video:", errorMessage);
    return NextResponse.json({
      success: true,
      data: DEMO_FALLBACK_VIDEOS,
      serverTime: Date.now(),
      pagination: {
        total: DEMO_FALLBACK_VIDEOS.length,
        page: 1,
        limit: DEMO_FALLBACK_VIDEOS.length,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
      },
    });
  }
}
