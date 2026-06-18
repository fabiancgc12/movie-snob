import z from "zod";

export const tvDiscoverSchema = z.object({
  backdrop_path: z.string(),
  first_air_date: z.string().nullish(),
  genre_ids: z.number().array(),
  id: z.number(),
  name: z.string(),
  origin_country: z.string().array(),
  original_language: z.string(),
  original_name: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export const discoverTvResponseInterfaceSchema = z.object({
  page: z.number(),
  results: tvDiscoverSchema.array(),
  total_pages: z.number(),
  total_results: z.number(),
});

export type DiscoverTvResponseSchema = z.infer<
  typeof discoverTvResponseInterfaceSchema
>;

export type TvDiscover = z.infer<typeof tvDiscoverSchema>;
