import {PopularMovieResponse} from "@/models/popular/popularMovie.interface";
import {getLocale} from "@/utils/functions/getLanguage";

export async function getPopularMovies(page:number = 1,locale?:string):Promise<PopularMovieResponse>{
    locale = getLocale(locale)
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_KEY}&page=${page}&language=${locale}`);
    return response.json()
}