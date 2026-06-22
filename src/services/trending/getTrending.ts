import "server-only";

import { trendingResponseInterfaceSchema } from "@/models/trending/TrendingMovieResponse.schema";
import { env } from "../../../env";
import { getImdbLocale } from "@/utils/functions/getLanguage";
export async function getTrending(
  media: "all" | "movie" | "tv",
  page = 1,
  locale: string,
) {
  locale = getImdbLocale(locale);
  const params = new URLSearchParams({
    api_key: env.TMDB_KEY,
    page: String(page),
    language: locale,
  });
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/${media}/week?${params}`,
  );
  const data = await response.json();
  return trendingResponseInterfaceSchema.parse(data);
}
