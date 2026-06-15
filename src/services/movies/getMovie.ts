import {
  CreditsResponseSchema,
  creditsResponseTypeSchema,
} from "@/models/Movies/CreditsResponse.schema";
import { MovieSchema, movieTypeSchema } from "@/models/Movies/Movie.schema";
import {
  VideoMedia,
  videoMediaResponseSchema,
  VideoTrailer,
  videoTrailerSchema,
} from "@/models/Movies/VideoMedia.schema";
import {
  ImageMedia,
  imageMediaResponseSchema,
  imagePosterSchema,
} from "@/models/Movies/ImageMedia.schema";
import {
  ProvidersResponseInterface,
  providersResponseInterfaceSchema,
} from "@/models/Movies/Providers.type";
import {
  RecommendationInterface,
  RecommendationResponseInterface,
  recommendationResponseInterfaceSchema,
} from "@/models/Movies/RecomendationResponse.schema";
import { formatVideoResponse } from "@/utils/functions/formatVideoResponse";
import { formatImagesResponse } from "@/utils/functions/formatImagesResponse";
import { formatProvidersResponse } from "@/utils/functions/formatProvidersResponse";
import { ProvidersDto } from "@/models/dto/ProvidersDto";
import { formatRecommendations } from "@/utils/functions/formatRecommendations";
import { formatMovieCredits } from "@/utils/functions/formatMovieCredits";
import { CreditsDto } from "@/models/dto/Credit.dto";
import { getImdbLocale } from "@/utils/functions/getLanguage";
import { extractLanguageFromLocale } from "@/utils/functions/extractLanguageFromLocale";
import { env } from "../../../env";
import { z } from "zod";

const apiResponseSchema = movieTypeSchema.extend({
  videos: videoMediaResponseSchema,
  images: imageMediaResponseSchema,
  credits: creditsResponseTypeSchema,
  recommendations: recommendationResponseInterfaceSchema,
  ["watch/providers"]: providersResponseInterfaceSchema,
});

type ApiResponse = z.infer<typeof apiResponseSchema>;

export async function getMovie(
  id: number,
  locale: string,
): Promise<{
  movie: MovieSchema;
  credits: CreditsDto;
  videos: VideoTrailer[];
  images: ImageMedia;
  providers: ProvidersDto;
  recommendations: RecommendationInterface[];
}> {
  locale = getImdbLocale(locale);
  const languageWithoutCountry = extractLanguageFromLocale(locale);
  const params = new URLSearchParams({
    api_key: env.TMDB_KEY,
    language: locale,
    append_to_response: "videos,images,credits,watch/providers,recommendations",
    include_image_language: `${languageWithoutCountry},null`,
    include_video_language: locale,
  });
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?${params}`,
  );
  const responseData = await response.json();
  const data = apiResponseSchema.parse(responseData);
  try {
    // @ts-ignore
    if (data?.success == false) {
      throw data;
    }

    // I destructure all the data to their separate parts to handle them independently from each other
    let {
      credits: creditsResponse,
      videos: videoResponse,
      images: imageResponse,
      "watch/providers": providersResponse,
      recommendations: recommendationResponse,
      ...movie
    } = data;

    const videos = formatVideoResponse(videoResponse);
    const images = formatImagesResponse(imageResponse);
    const providers = formatProvidersResponse(providersResponse);
    const recommendations = formatRecommendations(recommendationResponse);
    const credits = formatMovieCredits(creditsResponse);
    return {
      movie: movie,
      credits: credits,
      videos: videos,
      images: images,
      providers: providers,
      recommendations: recommendations,
    };
  } catch (e) {
    throw e;
  }
}
