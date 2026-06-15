import { VideoMedia, VideoTrailer } from "@/models/Movies/VideoMedia.schema";
import { TvShowType } from "@/models/tv/TvShow.type";
import { ImageMedia } from "@/models/Movies/ImageMedia.schema";
import {
  RecommendationInterface,
  RecommendationResponseInterface,
} from "@/models/Movies/RecomendationResponse.schema";
import { ProvidersResponseInterface } from "@/models/Movies/Providers.type";
import { AgregateCastResponse } from "@/models/tv/TvCast.type";
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

type ApiResponse = TvShowType & {
  videos: VideoMedia;
  images: ImageMedia;
  aggregate_credits: AgregateCastResponse;
  recommendations: RecommendationResponseInterface;
  ["watch/providers"]: ProvidersResponseInterface;
};

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
  const data: ApiResponse = await response.json();
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
