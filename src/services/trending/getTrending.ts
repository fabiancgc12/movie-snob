import { TrendingResponseInterface } from "@/models/trending/TrendingMovieResponse";
import { env } from "../../../env";

export async function getTrending(
  media: "all" | "movie" | "tv",
  page = 1,
  locale?: string | string[],
): Promise<TrendingResponseInterface> {
  const params = new URLSearchParams({
    api_key: env.TMDB_KEY,
    page: String(page),
    language: Array.isArray(locale) ? locale[0] : locale ?? "",
  });
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/${media}/week?${params}`,
  );
  return response.json();
}
