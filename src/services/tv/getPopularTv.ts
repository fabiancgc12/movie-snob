import {PopularTvShowResponse} from "@/models/popular/popularTv.interface";

export async function getPopularTv(page:number = 1,locale?:string):Promise<PopularTvShowResponse>{
    const response = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_KEY}&page=${page}&language=${locale}`);
    return response.json()
}