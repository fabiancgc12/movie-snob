import {UpcomingMoviesResponse} from "@/models/Movies/UpcomingMoviesResponse";
import {getLocale} from "@/utils/functions/getLanguage";

export async function getUpcoming(locale?:string | string[]):Promise<UpcomingMoviesResponse>{
    locale = getLocale(locale)
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=${locale}`);
    return response.json()
}