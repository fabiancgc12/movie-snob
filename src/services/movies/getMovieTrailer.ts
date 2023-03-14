import {VideoMediaResponse} from "@/models/Movies/VideoMedia.interface";

export async function getMovieTrailer(id:number):Promise<VideoMediaResponse>{
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_KEY}&include_video_language=en`);
    return response.json()
}