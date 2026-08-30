import { z } from 'zod';

export const ZUpdateProfile = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  image: z.string().url("Invalid image URL").or(z.literal("")).or(z.null()).optional(),
  displayName: z.string().min(2, "Display name must be at least 2 characters").or(z.literal("")).or(z.null()).optional(),
  avatar: z.string().url("Invalid avatar URL").or(z.literal("")).or(z.null()).optional(),
  banner: z.string().url("Invalid banner URL").or(z.literal("")).or(z.null()).optional(),
  bio: z.string().or(z.null()).optional(),
  country: z.string().or(z.null()).optional(),
  language: z.string().or(z.null()).optional(),
  facebookUrl: z.string().url("Invalid Facebook URL").or(z.literal("")).or(z.null()).optional(),
  youtubeUrl: z.string().url("Invalid YouTube URL").or(z.literal("")).or(z.null()).optional(),
  discordUrl: z.string().url("Invalid Discord URL").or(z.literal("")).or(z.null()).optional(),
});


export type TUpdateProfileInput = z.infer<typeof ZUpdateProfile>;