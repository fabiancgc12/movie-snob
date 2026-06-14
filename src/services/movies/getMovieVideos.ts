import { VideoMediaResponse } from "@/models/Movies/VideoMedia.interface";
import { getImdbLocale } from "@/utils/functions/getLanguage";
import { env } from "../../../env";

export async function getMovieVideos(
  id: number,
  locale?: string | string[],
): Promise<VideoMediaResponse> {
  locale = getImdbLocale(locale);
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${env.TMDB_KEY}&include_video_language=${locale}`,
  );
  return response.json();
}
