import { mediaTypeSchema } from "@/models/MediaType";
import z from "zod";

export const searchResultSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullish(),
  id: z.number(),
  name: z.string().optional(),
  original_language: z.string(),
  original_name: z.string().optional(),
  overview: z.string(),
  poster_path: z.string().nullish(),
  media_type: mediaTypeSchema,
  genre_ids: z.array(z.number()),
  popularity: z.number(),
  first_air_date: z.string().optional(),
  vote_average: z.number(),
  vote_count: z.number(),
  origin_country: z.array(z.string()).optional(),
  title: z.string().optional(),
  original_title: z.string().optional(),
  release_date: z.string().optional(),
  video: z.boolean().optional(),
});

export type SearchResult = z.infer<typeof searchResultSchema>;

export const multiSearchResponseSchema = z.object({
  page: z.number(),
  results: searchResultSchema.array(),
  total_pages: z.number(),
  total_results: z.number(),
});

export type MultiSearchResponseSchema = z.infer<
  typeof multiSearchResponseSchema
>;
