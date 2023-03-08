import {TvShowInterface} from "@/models/tv/TvShow.interface";
import {MovieInterface} from "@/models/Movies/Movie.interface";

export function generateUrlPage(media:TvShowInterface | MovieInterface,mediaType:"tv" | "movie"){
    return `http://localhost:3000/${mediaType}/${media.id}`
}