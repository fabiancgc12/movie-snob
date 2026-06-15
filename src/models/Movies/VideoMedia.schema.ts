import { z } from "zod";

export const videoTrailerSchema = z.object({
  iso_639_1: z.string(),
  iso_3166_1: z.string(),
  name: z.string(),
  key: z.string(),
  site: z.string(),
  size: z.number(),
  type: z.string(),
  official: z.boolean(),
  published_at: z.string(),
  id: z.string(),
});

export type VideoTrailer = z.infer<typeof videoTrailerSchema>;

export const videoMediaResponseSchema = z.object({
  id: z.number().nullish(),
  results: videoTrailerSchema.array(),
});

export type VideoMedia = z.infer<typeof videoMediaResponseSchema>;
