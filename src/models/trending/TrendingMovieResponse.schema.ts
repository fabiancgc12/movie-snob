import z from "zod";
import { mediaTypeSchema } from "../MediaType";

export const trendingSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullish(),
  id: z.number(),
  name: z.string().optional(),
  original_language: z.string(),
  original_name: z.string().optional(),
  overview: z.string(),
  poster_path: z.string(),
  media_type: mediaTypeSchema,
  genre_ids: z.number().array(),
  popularity: z.number(),
  first_air_date: z.string().nullish(),
  vote_average: z.number(),
  vote_count: z.number(),
  origin_country: z.string().array().optional(),
  title: z.string().optional(),
  original_title: z.string().optional(),
  release_date: z.string().optional(),
  video: z.boolean().optional(),
});

export type Trending = z.infer<typeof trendingSchema>;

export const trendingResponseInterfaceSchema = z.object({
  page: z.number(),
  results: trendingSchema.array(),
  total_pages: z.number(),
  total_results: z.number(),
});

export type TrendingResponse = z.infer<typeof trendingResponseInterfaceSchema>;
