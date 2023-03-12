import {DiscoverResponseInterface} from "@/models/discover/discoverResponse.interface";

type options = {
    genre?:string | string[],
    page?:number
}
export async function getDiscover({genre,page=1}:options):Promise<DiscoverResponseInterface>{
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
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&${params}`)
    return  await response.json() as DiscoverResponseInterface;
}