export interface VideoItem {
  id: string;
  title: string;
  provider: string;
  videoUrl: string;
  size?: number;
}

export const FRONTEND_VIDEOS: VideoItem[] = [
  {
    id: "oppenheimer-trailer",
    title: "Oppenheimer - Official 4K Trailer",
    provider: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=uYPbbksJxIg",
    size: 185,
  },
  {
    id: "dune-part-two-trailer",
    title: "Dune: Part Two - Official 4K Trailer",
    provider: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=Way9Dexny3w",
    size: 192,
  },
  {
    id: "spider-man-spider-verse-trailer",
    title: "Spider-Man: Across the Spider-Verse - Official Trailer",
    provider: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=cqGjhVJWtEg",
    size: 178,
  },
  {
    id: "marvel-deadpool-and-wolverine",
    title: "Marvel Studios' Deadpool & Wolverine - Official Trailer",
    provider: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=73_1biulkYk",
    size: 158,
  },
  {
    id: "gladiator-ii-trailer",
    title: "Gladiator II - Official 4K Trailer",
    provider: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=4rgYUipGJNo",
    size: 180,
  },
  {
    id: "marvel-avengers-endgame",
    title: "Marvel Studios' Avengers: Endgame - Official Trailer",
    provider: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
    size: 146,
  },
  {
    id: "interstellar-trailer",
    title: "Interstellar - Official Theatrical Trailer",
    provider: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    size: 152,
  },
];
