import { z } from "zod";

export const imagePosterSchema = z.object({
  aspect_ratio: z.number(),
  height: z.number(),
  iso_639_1: z.string().nullable(),
  file_path: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
  width: z.number(),
});

export type ImagePoster = z.infer<typeof imagePosterSchema>;

export const imageMediaResponseSchema = z.object({
  backdrops: imagePosterSchema.array(),
  id: z.number(),
  logos: imagePosterSchema.array(),
  posters: imagePosterSchema.array(),
});

export type ImageMedia = z.infer<typeof imageMediaResponseSchema>;
