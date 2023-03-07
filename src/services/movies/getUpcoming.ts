import {UpcomingMoviesResponse} from "@/utils/models/Movies/UpcomingMoviesResponse";

export async function getUpcoming():Promise<UpcomingMoviesResponse>{
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}`);
    return response.json()
    // https://api.themoviedb.org/3/movie/upcoming?api_key=2e7d257524718d79704aad055d87da81
}