import { z } from "zod";

export const movieSearchResultSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable().optional(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable().optional(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export type MovieSearchResult = z.infer<typeof movieSearchResultSchema>;

export const movieSearchResponseSchema = z.object({
  page: z.number(),
  results: movieSearchResultSchema.array(),
  total_pages: z.number(),
  total_results: z.number(),
});

export type MovieSearchResponse = z.infer<typeof movieSearchResponseSchema>;
