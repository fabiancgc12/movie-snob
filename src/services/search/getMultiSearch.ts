import {MultiSearchResponseInterface} from "@/models/search/MultiSearchResponse.interface";

type options = {
    title?:string,
    page?:number
}

export async function getMultiSearch({page = 1,title}:options):Promise<MultiSearchResponseInterface>{
    let parameters:Record<string, any> = {}
    parameters.page = page
    if (title){
        parameters.query = title
    }

    const paramsString = new URLSearchParams(parameters).toString();

    const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_KEY}&${paramsString}`)
    const data = await response.json() as MultiSearchResponseInterface;
    //filtering anything that is not a movie or tv show
    data.results = data.results.filter(r => r.media_type == "movie" || r.media_type == "tv")
    return data;
}