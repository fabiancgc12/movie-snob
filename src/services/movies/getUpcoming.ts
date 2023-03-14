import {UpcomingMoviesResponse} from "@/models/Movies/UpcomingMoviesResponse";

export async function getUpcoming():Promise<UpcomingMoviesResponse>{
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}`);
    return response.json()
}