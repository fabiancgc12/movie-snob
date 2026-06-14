import { PopularTvShowResponse } from "@/models/popular/popularTv.interface";
import { getImdbLocale } from "@/utils/functions/getLanguage";
import { env } from "../../../env";

export async function getPopularTv(
  page: number = 1,
  locale: string,
): Promise<PopularTvShowResponse> {
  locale = getImdbLocale(locale);
  const params = new URLSearchParams({
    api_key: env.TMDB_KEY,
    page: String(page),
    language: locale,
  });
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/popular?${params}`,
  );
  return response.json();
}
