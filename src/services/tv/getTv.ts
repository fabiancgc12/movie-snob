import {VideoMediaResponse, VideoTrailerInterface} from "@/utils/models/Movies/VideoMedia.interface";
import {TvShowInterface} from "@/utils/models/tv/TvShow.interface";
import {ImageMediaResponse} from "@/utils/models/Movies/ImageMedia.interface";
import {
    RecommendationInterface,
    RecommendationResponseInterface
} from "@/utils/models/Movies/RecomendationResponse.interface";
import {ProvidersResponseInterface} from "@/utils/models/Movies/Providers.interface";
import {AgregateCastResponse} from "@/utils/models/tv/TvCast.interface";

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
    providers:ProvidersResponseInterface
}>{
    const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_KEY}&`+
        `append_to_response=videos,recommendations,aggregate_credits,images,watch/providers`
    );
    const data:ApiResponse = await response.json()
    let {videos:videoResponse,recommendations:recommendationResponse,aggregate_credits,images,"watch/providers": providers,...show} = data;
    // returning only the first 10 videos
    const videos = videoResponse.results.filter(t => t.site == "YouTube").slice(0,9) || []
    //just returning the first 12 member of the main cast and
    aggregate_credits.cast = aggregate_credits.cast?.slice(0,12);
    aggregate_credits.crew = []
    // returning only the first 10 backdrops for now
    images.backdrops = images.backdrops.slice(0,9);
    images.posters = [];
    images.logos = [];

    providers = {
        results: {US:providers.results.US ?? []}
    }
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