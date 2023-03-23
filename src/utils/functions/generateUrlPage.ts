import {TvShowInterface} from "@/models/tv/TvShow.interface";
import {MovieInterface} from "@/models/Movies/Movie.interface";

export function generateUrlPage(media:TvShowInterface | MovieInterface,mediaType:"tv" | "movie"){
    return `https://moviesnob.vercel.app/${mediaType}/${media.id}`
}