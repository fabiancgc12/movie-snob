import { tvShowSchema } from "@/models/tv/TvShow.type";
import { videoMediaResponseSchema } from "@/models/Movies/VideoMedia.schema";
import { imageMediaResponseSchema } from "@/models/Movies/ImageMedia.schema";
import { recommendationResponseSchema } from "@/models/Movies/RecomendationResponse.schema";
import { aggregateCastResponseSchema } from "@/models/tv/TvCast.type";
import { providersResponseSchema } from "@/models/Movies/Providers.schema";
import { z } from "zod";

export const detailsTvShowSchema = tvShowSchema.extend({
  images: imageMediaResponseSchema,
  videos: videoMediaResponseSchema,
  aggregate_credits: aggregateCastResponseSchema,
  recommendations: recommendationResponseSchema,
  ["watch/providers"]: providersResponseSchema,
});

export type DetailsTvShowType = z.infer<typeof detailsTvShowSchema>;
