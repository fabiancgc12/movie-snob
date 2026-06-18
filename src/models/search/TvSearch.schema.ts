import { z } from "zod";

export const tvSearchResultSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable().optional(),
  first_air_date: z.string().nullish(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  name: z.string(),
  origin_country: z.array(z.string()).optional(),
  original_language: z.string(),
  original_name: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable().optional(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export type TvSearchResult = z.infer<typeof tvSearchResultSchema>;

export const tvSearchResponseSchema = z.object({
  page: z.number(),
  results: tvSearchResultSchema.array(),
  total_pages: z.number(),
  total_results: z.number(),
});

export type TvSearchResponse = z.infer<typeof tvSearchResponseSchema>;
