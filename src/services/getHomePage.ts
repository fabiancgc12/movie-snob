import {MovieResumeInterface} from "@/models/Movies/MovieResume.interface";
import {getPopularMovies} from "@/services/movies/getPopularMovies";
import {PopularMovieResponse} from "@/models/popular/popularMovie.interface";
import {getPopularTv} from "@/services/tv/getPopularTv";
import {PopularTvShowResponse} from "@/models/popular/popularTv.interface";
import {getTrending} from "@/services/trending/getTrending";
import {TrendingResponseInterface} from "@/models/trending/TrendingMovieResponse";
import {getUpcoming} from "@/services/movies/getUpcoming";
import {getMovieTrailer} from "@/services/movies/getMovieTrailer";
import {VideoTrailerInterface} from "@/models/Movies/VideoMedia.interface";

export async function getHomePage():Promise<{
    upcoming:MovieResumeInterface[],
    upcomingTrailers:VideoTrailerInterface[]
    popular:{
        movie:PopularMovieResponse,
        tv:PopularTvShowResponse,
    },
    trending:TrendingResponseInterface
}>{
    const [upcoming,popularMovies,popularTv,trending] =  await Promise.all([getUpcoming(),getPopularMovies(),getPopularTv(),getTrending("all")])
    const trailerPromises = upcoming.results.map(u => getMovieTrailer(u.id))
    const upcomingTrailers = (await Promise.all(trailerPromises))
        .map(t => t.results.filter(t => t.site == "YouTube" && t.name.toLowerCase().includes("trailer"))[0])
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