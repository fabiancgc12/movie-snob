import {DiscoverResponseInterface} from "@/models/discover/discoverResponse.interface";

type options = {
    withGenres?:number[],
    page?:number
}
export async function getDiscover({withGenres,page=1}:options):Promise<DiscoverResponseInterface>{
    let parameters = ""
    if (withGenres && withGenres?.length > 0){
        parameters+=`with_genres=${withGenres.join(",")}`
    }
    const [moviesResponse,tvResponse] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&page=${page}&${parameters}`),
        fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_KEY}&page=${page}&${parameters}`)
    ])
    const movies = await moviesResponse.json() as DiscoverResponseInterface;
    const tv = await tvResponse.json() as DiscoverResponseInterface;
    const result = [...movies.results,...tv.results].sort((a,b) => Number(a.id) - Number(b.id))
    return {
        ...movies,
        results:result
    }
}