import { z } from "zod";

export const movieDiscoverSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export type MovieDiscover = z.infer<typeof movieDiscoverSchema>;

export const discoverMovieResponseSchema = z.object({
  page: z.number(),
  total_pages: z.number(),
  total_results: z.number(),
  results: movieDiscoverSchema.array(),
});

export type DiscoverMovieResponseSchema = z.infer<
  typeof discoverMovieResponseSchema
>;
