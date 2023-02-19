import {VideoMediaResponse, VideoTrailerInterface} from "@/utils/models/Movies/VideoMedia.interface";
import {TvShowInterface} from "@/utils/models/tv/TvShow.interface";
import {ImageMediaResponse} from "@/utils/models/Movies/ImageMedia.interface";
import {CreditsResponseInterface} from "@/utils/models/Movies/CreditsResponse.interface";
import {
    RecommendationInterface,
    RecommendationResponseInterface
} from "@/utils/models/Movies/RecomendationResponse.interface";
import {ProvidersResponseInterface} from "@/utils/models/Movies/Providers.interface";

type ApiResponse = TvShowInterface & {
    videos:VideoMediaResponse,
    images:ImageMediaResponse,
    credits:CreditsResponseInterface,
    recommendations:RecommendationResponseInterface,
    // ["watch/providers"]:ProvidersResponseInterface
}

export async function getTvShow(id:number):Promise<{
    show:TvShowInterface,
    credits:CreditsResponseInterface,
    videos:VideoTrailerInterface[],
    images:ImageMediaResponse,
    recommendations:RecommendationInterface[]
}>{
    const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_KEY}&`+
        `append_to_response=videos,recommendations,credits,images`
    );
    const data:ApiResponse = await response.json()
    const {videos:videoResponse,recommendations:recommendationResponse,credits,images,...show} = data;
    // returning only the first 10 videos
    const videos = videoResponse.results.filter(t => t.site == "YouTube").slice(0,9) || []
    //just returning the first 12 member of the main cast and
    credits.cast = credits.cast;
    credits.crew = []
    console.log(credits)
    // returning only the first 10 backdrops for now
    images.backdrops = images.backdrops.slice(0,9);
    images.posters = [];
    images.logos = [];
    //just returning the first 13 recommendation
    const recommendations = recommendationResponse.results.slice(0,13)
    return {
        show,
        videos,
        recommendations,
        credits,
        images
    }
}