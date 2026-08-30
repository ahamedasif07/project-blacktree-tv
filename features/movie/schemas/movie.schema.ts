import { z } from "zod";

export const movieSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  thumbnailUrl: z.string().url(),
  videoUrl: z.string().url(),
  duration: z.number(),
  genre: z.array(z.string()),
  releaseDate: z.string(),
  rating: z.number().min(0).max(10),
});

export type MovieFormData = z.infer<typeof movieSchema>;
