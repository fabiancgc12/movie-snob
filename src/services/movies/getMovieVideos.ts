import "server-only";

import {
  VideoMedia,
  videoMediaResponseSchema,
} from "@/models/Movies/VideoMedia.schema";
import { getImdbLocale } from "@/utils/functions/getLanguage";
import { env } from "../../../env";
import { cacheLife, cacheTag } from "next/cache";

export async function getMovieVideos(
  id: number,
  locale: string,
): Promise<VideoMedia> {
  "use cache";
  cacheLife({ stale: 3600, revalidate: 900, expire: 86400 });
  cacheTag(`movie-${id}-videos`);
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
