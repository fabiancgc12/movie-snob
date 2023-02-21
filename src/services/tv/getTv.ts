import {VideoMediaResponse, VideoTrailerInterface} from "@/utils/models/Movies/VideoMedia.interface";
import {TvShowInterface} from "@/utils/models/tv/TvShow.interface";
import {ImageMediaResponse} from "@/utils/models/Movies/ImageMedia.interface";
import {
    RecommendationInterface,
    RecommendationResponseInterface
} from "@/utils/models/Movies/RecomendationResponse.interface";
import {ProvidersResponseInterface} from "@/utils/models/Movies/Providers.interface";
import {AgregateCastResponse} from "@/utils/models/tv/TvCast.interface";
import {formatVideoResponse} from "@/utils/functions/formatVideoResponse";
import {formatImagesResponse} from "@/utils/functions/formatImagesResponse";
import {formatProvidersResponse} from "@/utils/functions/formatProvidersResponse";
import {ProvidersDto} from "@/utils/models/dto/ProvidersDto";

type ApiResponse = TvShowInterface & {
    videos:VideoMediaResponse,
    images:ImageMediaResponse,
    aggregate_credits:AgregateCastResponse,
    recommendations:RecommendationResponseInterface,
    ["watch/providers"]:ProvidersResponseInterface
}

export async function getTvShow(id:number):Promise<{
    show:TvShowInterface,
    credits:AgregateCastResponse,
    videos:VideoTrailerInterface[],
    images:ImageMediaResponse,
    recommendations:RecommendationInterface[],
    providers:ProvidersDto
}>{
    const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_KEY}&`+
        `append_to_response=videos,recommendations,aggregate_credits,images,watch/providers`
    );
    const data:ApiResponse = await response.json()
    let {videos:videoResponse,recommendations:recommendationResponse,aggregate_credits,images:imageResponse,"watch/providers": providersResponse,...show} = data;

    const videos = formatVideoResponse(videoResponse)
    const images = formatImagesResponse(imageResponse)
    const providers = formatProvidersResponse(providersResponse)

    //just returning the first 12 member of the main cast and
    aggregate_credits.cast = aggregate_credits.cast?.slice(0,12);
    aggregate_credits.crew = []
    // returning only the first 10 backdrops for now

    //just returning the first 13 recommendation
    const recommendations = recommendationResponse.results.slice(0,13)
    return {
        show,
        videos,
        recommendations,
        credits:aggregate_credits,
        images,
        providers
    }
}