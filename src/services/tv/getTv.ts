import {VideoMediaResponse, VideoTrailerInterface} from "@/utils/models/Movies/VideoMedia.interface";
import {TvShowInterface} from "@/utils/models/tv/TvShow.interface";
import {MovieInterface} from "@/utils/models/Movies/Movie.interface";
import {ImageMediaResponse} from "@/utils/models/Movies/ImageMedia.interface";
import {CreditsResponseInterface} from "@/utils/models/Movies/CreditsResponse.interface";
import {RecommendationResponseInterface} from "@/utils/models/Movies/RecomendationResponse.interface";
import {ProvidersResponseInterface} from "@/utils/models/Movies/Providers.interface";

type ApiResponse = TvShowInterface & {
    videos:VideoMediaResponse,
    // images:ImageMediaResponse,
    // credits:CreditsResponseInterface,
    // recommendations:RecommendationResponseInterface,
    // ["watch/providers"]:ProvidersResponseInterface
}

export async function getTvShow(id:number):Promise<{
    show:TvShowInterface,
    // credits:CreditsResponseInterface,
    videos:VideoTrailerInterface[],
}>{
    const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_KEY}&`+
        `append_to_response=videos`
    );
    const data:ApiResponse = await response.json()
    const {videos:videoResponse,...show} = data;
    // returning only the first 10 videos
    const videos = videoResponse.results.filter(t => t.site == "YouTube").slice(0,9) || []
    // credits.cast = credits.cast?.slice(0,12);
    // credits.crew = []
    return {
        show,
        videos,
        // credits
    }
}