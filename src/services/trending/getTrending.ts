import {TrendingResponseInterface} from "@/utils/models/trending/TrendingMovieResponse";

export async function getTrending(media:"all"|"movie"|"tv",page=1):Promise<TrendingResponseInterface>{
    const response = await fetch(
        `https://api.themoviedb.org/3/trending/${media}/week?api_key=${process.env.TMDB_KEY}&page=${page}`);
    return response.json()
}