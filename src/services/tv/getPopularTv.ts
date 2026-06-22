import "server-only";

import { popularTvShowResponseSchema } from "@/models/popular/popularTv.schema";
import { getImdbLocale } from "@/utils/functions/getLanguage";
import { env } from "../../../env";
export async function getPopularTv(page: number = 1, locale: string) {
  locale = getImdbLocale(locale);
  const params = new URLSearchParams({
    api_key: env.TMDB_KEY,
    page: String(page),
    language: locale,
  });
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/popular?${params}`,
    { next: { revalidate: 3600 * 24 } },
  );
  const data = await response.json();
  return popularTvShowResponseSchema.parse(data);
}
