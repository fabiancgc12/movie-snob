import {VideoMediaResponse, VideoTrailerInterface} from "@/models/Movies/VideoMedia.interface";
import {TvShowInterface} from "@/models/tv/TvShow.interface";
import {ImageMediaResponse} from "@/models/Movies/ImageMedia.interface";
import {
    RecommendationInterface,
    RecommendationResponseInterface
} from "@/models/Movies/RecomendationResponse.interface";
import {ProvidersResponseInterface} from "@/models/Movies/Providers.interface";
import {AgregateCastResponse} from "@/models/tv/TvCast.interface";
import {formatVideoResponse} from "@/utils/functions/formatVideoResponse";
import {formatImagesResponse} from "@/utils/functions/formatImagesResponse";
import {formatProvidersResponse} from "@/utils/functions/formatProvidersResponse";
import {ProvidersDto} from "@/models/dto/ProvidersDto";
import {formatRecommendations} from "@/utils/functions/formatRecommendations";
import {formatTvCredits} from "@/utils/functions/formatTvCredits";
import {CreditsDto} from "@/models/dto/Credit.dto";
import {extractLanguageFromLocale} from "@/utils/functions/extractLanguageFromLocale";
import {getLocale} from "@/utils/functions/getLanguage";

type ApiResponse = TvShowInterface & {
    videos:VideoMediaResponse,
    images:ImageMediaResponse,
    aggregate_credits:AgregateCastResponse,
    recommendations:RecommendationResponseInterface,
    ["watch/providers"]:ProvidersResponseInterface
}

export async function getTvShow(id:number,locale?:string | string[]):Promise<{
    show:TvShowInterface,
    credits:CreditsDto,
    videos:VideoTrailerInterface[],
    images:ImageMediaResponse,
    recommendations:RecommendationInterface[],
    providers:ProvidersDto
}>{
    locale = getLocale(locale)
    const languageWithoutCountry = extractLanguageFromLocale(locale)
    const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_KEY}&language=${locale}&` +
        `include_image_language=${languageWithoutCountry},null&append_to_response=videos,recommendations,aggregate_credits,images,watch/providers`
    );
    const data: ApiResponse = await response.json()
    try {
        // @ts-ignore
        if (data?.success == false){
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

        const videos = formatVideoResponse(videoResponse)
        const images = formatImagesResponse(imageResponse)
        const providers = formatProvidersResponse(providersResponse)
        const recommendations = formatRecommendations(recommendationResponse)
        const credits = formatTvCredits(aggregate_credits)
        return {
            show,
            videos,
            recommendations,
            credits,
            images,
            providers
        }
    } catch (e) {
        throw e
    }
}