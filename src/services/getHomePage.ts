import {MovieResumeInterface} from "@/models/Movies/MovieResume.interface";
import {getPopularMovies} from "@/services/movies/getPopularMovies";
import {PopularMovieResponse} from "@/models/popular/popularMovie.interface";
import {getPopularTv} from "@/services/tv/getPopularTv";
import {PopularTvShowResponse} from "@/models/popular/popularTv.interface";
import {getTrending} from "@/services/trending/getTrending";
import {TrendingResponseInterface} from "@/models/trending/TrendingMovieResponse";
import {getUpcoming} from "@/services/movies/getUpcoming";

export async function getHomePage():Promise<{
    upcoming:MovieResumeInterface[],
    popular:{
        movie:PopularMovieResponse,
        tv:PopularTvShowResponse,
    },
    trending:TrendingResponseInterface
}>{
    const [upcoming,popularMovies,popularTv,trending] =  await Promise.all([getUpcoming(),getPopularMovies(),getPopularTv(),getTrending("all")])
    return {
        upcoming:upcoming.results,
        popular:{
            movie:popularMovies,
            tv:popularTv
        },
        trending: trending
    }
}