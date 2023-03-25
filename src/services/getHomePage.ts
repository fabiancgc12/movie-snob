import {MovieResumeInterface} from "@/models/Movies/MovieResume.interface";
import {getPopularMovies} from "@/services/movies/getPopularMovies";
import {PopularMovieResponse} from "@/models/popular/popularMovie.interface";
import {getPopularTv} from "@/services/tv/getPopularTv";
import {PopularTvShowResponse} from "@/models/popular/popularTv.interface";
import {getTrending} from "@/services/trending/getTrending";
import {TrendingResponseInterface} from "@/models/trending/TrendingMovieResponse";
import {getUpcoming} from "@/services/movies/getUpcoming";
import {getMovieVideos} from "@/services/movies/getMovieVideos";
import {VideoTrailerInterface} from "@/models/Movies/VideoMedia.interface";

export async function getHomePage(locale?:string):Promise<{
    upcoming:MovieResumeInterface[],
    upcomingTrailers:VideoTrailerInterface[]
    popular:{
        movie:PopularMovieResponse,
        tv:PopularTvShowResponse,
    },
    trending:TrendingResponseInterface
}>{
    const [upcoming,popularMovies,popularTv,trending] =  await Promise.all([
        getUpcoming(locale),
        getPopularMovies(1,locale),
        getPopularTv(1,locale),
        getTrending("all")
    ])
    const trailerPromises = upcoming.results.map(u => getMovieVideos(u.id,locale))
    const upcomingTrailers = (await Promise.all(trailerPromises))
        .map(t => t.results.filter(isTrailer)[0] ?? null)
    return {
        upcoming:upcoming.results,
        upcomingTrailers:upcomingTrailers,
        popular:{
            movie:popularMovies,
            tv:popularTv
        },
        trending: trending
    }
}

function isTrailer(video:VideoTrailerInterface){
    const name = video.name.toLowerCase()
    return video.site == "YouTube" && (name.includes("trailer") || name.includes("tráiler"))
}