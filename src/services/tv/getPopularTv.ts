import {PopularTvShowResponse} from "@/models/popular/popularTv.interface";
import {getLocale} from "@/utils/functions/getLanguage";

export async function getPopularTv(page:number = 1,locale?:string | string[]):Promise<PopularTvShowResponse>{
    locale = getLocale(locale)
    const response = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_KEY}&page=${page}&language=${locale}`);
    return response.json()
}