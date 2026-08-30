export interface VideoItem {
  id: string;
  title: string;
  provider: string;
  videoUrl: string;
  size?: number;
}

export const FRONTEND_VIDEOS: VideoItem[] = [
  {
    id: "marvel-avengers-endgame",
    title: "Marvel Studios' Avengers: Endgame - Official Trailer",
    provider: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
    size: 146,
  },
  {
    id: "marvel-avengers-infinity-war",
    title: "Marvel Studios' Avengers: Infinity War - Official Trailer",
    provider: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=6ZfuNTqbHE8",
    size: 144,
  },
  {
    id: "marvel-deadpool-and-wolverine",
    title: "Marvel Studios' Deadpool & Wolverine - Official Trailer",
    provider: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=73_1biulkYk",
    size: 158,
  },
  {
    id: "marvel-spiderman-no-way-home",
    title: "Marvel Studios' Spider-Man: No Way Home - Official Trailer",
    provider: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=JfVOs4VSpmA",
    size: 184,
  },
  {
    id: "marvel-doctor-strange-multiverse",
    title: "Marvel Studios' Doctor Strange in the Multiverse of Madness - Official Trailer",
    provider: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=aWzlQ2N6qqg",
    size: 136,
  },
  {
    id: "marvel-captain-america-civil-war",
    title: "Marvel Studios' Captain America: Civil War - Official Trailer",
    provider: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=dKrVegVI0Us",
    size: 146,
  },
];
