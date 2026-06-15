import { VideoMediaResponse } from "@/models/Movies/VideoMedia.type";
import { getImdbLocale } from "@/utils/functions/getLanguage";
import { env } from "../../../env";

export async function getMovieVideos(
  id: number,
  locale: string,
): Promise<VideoMediaResponse> {
  locale = getImdbLocale(locale);
  const params = new URLSearchParams({
    api_key: env.TMDB_KEY,
    include_video_language: locale,
  });
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?${params}`,
  );
  return response.json();
}
