import "server-only";

import { popularTvShowResponseSchema } from "@/models/popular/popularTv.schema";
import { getImdbLocale } from "@/utils/functions/getLanguage";
import { env } from "../../../env";
import { cacheLife, cacheTag } from "next/cache";

export async function getPopularTv(page: number = 1, locale: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("popular-tv");
  locale = getImdbLocale(locale);
  const params = new URLSearchParams({
    api_key: env.TMDB_KEY,
    page: String(page),
    language: locale,
  });
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/popular?${params}`,
  );
  const data = await response.json();
  return popularTvShowResponseSchema.parse(data);
}
