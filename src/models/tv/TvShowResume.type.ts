import z from "zod";

export const tvShowResumeSchema = z.object({
  backdrop_path: z.string().nullable(),
  first_air_date: z.string(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  name: z.string(),
  origin_country: z.array(z.string()),
  original_language: z.string(),
  original_name: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
  release_date: z.string(),
});

export type TvShowResumeType = z.infer<typeof tvShowResumeSchema>;
