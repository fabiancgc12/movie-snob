import {TrendingResponseInterface} from "@/models/trending/TrendingMovieResponse";

export async function getTrending(media:"all"|"movie"|"tv",page=1,locale?:string | string[]):Promise<TrendingResponseInterface>{
    const response = await fetch(
        `https://api.themoviedb.org/3/trending/${media}/week?api_key=${process.env.TMDB_KEY}&`
        +`page=${page}&language=${locale}`);
    return response.json()
}