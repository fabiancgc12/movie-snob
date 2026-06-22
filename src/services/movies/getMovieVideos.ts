import "server-only";

import {
  VideoMedia,
  videoMediaResponseSchema,
} from "@/models/Movies/VideoMedia.schema";
import { getImdbLocale } from "@/utils/functions/getLanguage";
import { env } from "../../../env";
export async function getMovieVideos(
  id: number,
  locale: string,
): Promise<VideoMedia> {
  locale = getImdbLocale(locale);
  const params = new URLSearchParams({
    api_key: env.TMDB_KEY,
    include_video_language: locale,
  });
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?${params}`,
  );
  const data = await response.json();
  return videoMediaResponseSchema.parse(data);
}
