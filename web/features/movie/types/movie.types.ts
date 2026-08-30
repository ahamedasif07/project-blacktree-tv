export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number; // in seconds
  genre: string[];
  releaseDate: string;
  rating: number;
}
