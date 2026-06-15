import { tvShowResumeSchema } from "@/models/tv/TvShowResume.type";
import z from "zod";

export const popularTvShowResponseSchema = z.object({
  page: z.number(),
  results: tvShowResumeSchema.array(),
  total_pages: z.number(),
  total_results: z.number(),
});

export type PopularTvShowResponse = z.infer<typeof popularTvShowResponseSchema>;
