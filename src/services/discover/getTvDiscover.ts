import {DiscoverTvResponseInterface} from "@/models/discover/discoverTvResponse.interface";

type options = {
    genre?:string | string[],
    page?:number
}
export async function getTvDiscover({genre,page=1}:options):Promise<DiscoverTvResponseInterface>{
    let parameters:Record<string, any> = {}
    parameters.page = page
    if (genre){
        if (Array.isArray(genre))
            parameters.with_genres = genre.join(",")
        else
            parameters.with_genres = genre
    }

    const params = new URLSearchParams(parameters).toString();

    const response = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_KEY}&${params}`)
    return  await response.json() as DiscoverTvResponseInterface;
}