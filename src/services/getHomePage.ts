import {MovieResumeInterface} from "@/utils/models/Movies/MovieResume.interface";
import {getPopularMovies} from "@/services/movies/getPopularMovies";
import {PopularMovieResponse} from "@/utils/models/popular/popularMovie.interface";
import {getPopularTv} from "@/services/tv/getPopularTv";
import {PopularTvShowResponse} from "@/utils/models/popular/popularTv.interface";
import {getTrending} from "@/services/trending/getTrending";
import {Trending, TrendingResponseInterface} from "@/utils/models/trending/TrendingMovieResponse";
import {getUpcoming} from "@/services/movies/getUpcoming";

export async function getHomePage():Promise<{
    upcoming:MovieResumeInterface[],
    popular:{
        movie:PopularMovieResponse,
        tv:PopularTvShowResponse,
    },
    trending:{
        movie:TrendingResponseInterface,
        tv:TrendingResponseInterface,
    }
}>{
    const [upcoming,popularMovies,popularTv,trending] =  await Promise.all([getUpcoming(),getPopularMovies(),getPopularTv(),getTrending("all")])
    const trendingMovies:Trending[] = []
    const trendingTv:Trending[] = []
    trending.results.forEach(t => {
        if (t.media_type == "movie")
            trendingMovies.push(t)
        else if (t.media_type == "tv")
            trendingTv.push(t)
    })
    return {
        upcoming:upcoming.results,
        popular:{
            movie:popularMovies,
            tv:popularTv
        },
        trending: {
            movie: {...trending,results:trendingMovies},
            tv: {...trending,results:trendingTv}
        }
    }
}