import {TvShowInterface} from "@/utils/models/tv/TvShow.interface";
import {MovieInterface} from "@/utils/models/Movies/Movie.interface";

export function generateUrlPage(media:TvShowInterface | MovieInterface,mediaType:"tv" | "movie"){
    return `http://localhost:3000/${mediaType}/${media.id}`
}