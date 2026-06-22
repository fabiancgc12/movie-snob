import "server-only";

import {
  videoMediaResponseSchema,
  VideoTrailer,
} from "@/models/Movies/VideoMedia.schema";
import { TvShowType, tvShowSchema } from "@/models/tv/TvShow.type";
import {
  ImageMedia,
  imageMediaResponseSchema,
} from "@/models/Movies/ImageMedia.schema";
import {
  RecommendationInterface,
  recommendationResponseSchema,
} from "@/models/Movies/RecomendationResponse.schema";
import { providersResponseSchema } from "@/models/Movies/Providers.schema";
import { aggregateCastResponseSchema } from "@/models/tv/TvCast.type";
import { formatVideoResponse } from "@/utils/functions/formatVideoResponse";
import { formatImagesResponse } from "@/utils/functions/formatImagesResponse";
import { formatProvidersResponse } from "@/utils/functions/formatProvidersResponse";
import { ProvidersDto } from "@/models/dto/ProvidersDto";
import { formatRecommendations } from "@/utils/functions/formatRecommendations";
import { formatTvCredits } from "@/utils/functions/formatTvCredits";
import { CreditsDto } from "@/models/dto/Credit.dto";
import { extractLanguageFromLocale } from "@/utils/functions/extractLanguageFromLocale";
import { getImdbLocale } from "@/utils/functions/getLanguage";
import { env } from "../../../env";
import { z } from "zod";
import { notFound } from "next/navigation";
import { detailsTvShowSchema } from "@/features/tv/schemas/detailsTvShow.schema";
import { cacheLife, cacheTag } from "next/cache";

export async function getTvShow(
  id: number,
  locale: string,
): Promise<{
  show: TvShowType;
  credits: CreditsDto;
  videos: VideoTrailer[];
  images: ImageMedia;
  recommendations: RecommendationInterface[];
  providers: ProvidersDto;
}> {
  "use cache";
  cacheLife({ stale: 3600, revalidate: 900, expire: 86400 });
  cacheTag(`tv-${id}`);
  locale = getImdbLocale(locale);
  const languageWithoutCountry = extractLanguageFromLocale(locale);
  const params = new URLSearchParams({
    api_key: env.TMDB_KEY,
    language: locale,
    include_image_language: `${languageWithoutCountry},null`,
    append_to_response:
      "videos,recommendations,aggregate_credits,images,watch/providers",
    include_video_language: locale,
  });
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?${params}`,
  );
  if (response.status === 404) {
    throw notFound();
  }
  const raw = await response.json();
  const data = detailsTvShowSchema.parse(raw);
  try {
    // @ts-ignore
    if (data?.success == false) {
      throw data;
    }
    let {
      videos: videoResponse,
      recommendations: recommendationResponse,
      aggregate_credits,
      images: imageResponse,
      "watch/providers": providersResponse,
      ...show
    } = data;

    const videos = formatVideoResponse(videoResponse);
    const images = formatImagesResponse(imageResponse);
    const providers = formatProvidersResponse(providersResponse);
    const recommendations = formatRecommendations(recommendationResponse);
    const credits = formatTvCredits(aggregate_credits);
    return {
      show,
      videos,
      recommendations,
      credits,
      images,
      providers,
    };
  } catch (e) {
    throw e;
  }
}
