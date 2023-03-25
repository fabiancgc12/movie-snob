import {VideoMediaResponse} from "@/models/Movies/VideoMedia.interface";
import {getLocale} from "@/utils/functions/getLanguage";

export async function getMovieVideos(id:number, locale?:string):Promise<VideoMediaResponse>{
    locale = getLocale(locale)
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_KEY}&include_video_language=${locale}`);
    return response.json()
}