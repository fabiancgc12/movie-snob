import { movieSchema } from "@/models/Movies/MovieType";
import { videoMediaResponseSchema } from "@/models/Movies/VideoMedia.schema";
import { imageMediaResponseSchema } from "@/models/Movies/ImageMedia.schema";
import { recommendationResponseSchema } from "@/models/Movies/RecomendationResponse.schema";
import { creditsResponseTypeSchema } from "@/models/Movies/CreditsResponse.schema";
import { z } from "zod";
import { providersResponseSchema } from "@/models/Movies/Providers.schema";

export const detailsMovieSchema = movieSchema.extend({
  videos: videoMediaResponseSchema,
  images: imageMediaResponseSchema,
  credits: creditsResponseTypeSchema,
  recommendations: recommendationResponseSchema,
  ["watch/providers"]: providersResponseSchema,
});

type DetailsMovieType = z.infer<typeof detailsMovieSchema>;
