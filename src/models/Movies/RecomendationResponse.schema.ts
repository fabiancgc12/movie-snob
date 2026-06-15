import z from "zod";
import { mediaTypeSchema } from "../MediaType";

export const recommendationInterfaceSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().optional().nullable(),
  id: z.number(),
  title: z.string(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  poster_path: z.string(),
  media_type: mediaTypeSchema,
  genre_ids: z.array(z.number()).optional().nullable(),
  popularity: z.number(),
  release_date: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export type RecommendationInterface = z.infer<
  typeof recommendationInterfaceSchema
>;

export const recommendationResponseInterfaceSchema = z.object({
  page: z.number(),
  results: recommendationInterfaceSchema.array(),
  total_pages: z.number(),
  total_results: z.number(),
});

export type RecommendationResponseInterface = z.infer<
  typeof recommendationResponseInterfaceSchema
>;
