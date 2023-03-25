import {UpcomingMoviesResponse} from "@/models/Movies/UpcomingMoviesResponse";

export async function getUpcoming(locale?:string):Promise<UpcomingMoviesResponse>{
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=${locale}`);
    return response.json()
}