import { movieResumeTypeSchema } from "@/models/Movies/MovieResume.schema";
import z from "zod";

export const popularMovieResponseSchema = z.object({
  page: z.number(),
  results: movieResumeTypeSchema.array(),
  total_pages: z.number(),
  total_results: z.number(),
});

export type PopularMovieResponse = z.infer<typeof popularMovieResponseSchema>;
