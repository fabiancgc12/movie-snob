import {PopularMovieResponse} from "@/models/popular/popularMovie.interface";

export async function getPopularMovies(page:number = 1,locale?:string):Promise<PopularMovieResponse>{

    const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_KEY}&page=${page}&language=${locale}`);
    return response.json()
}