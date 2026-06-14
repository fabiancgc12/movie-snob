import { PopularTvShowResponse } from "@/models/popular/popularTv.interface";
import { getImdbLocale } from "@/utils/functions/getLanguage";
import { env } from "../../../env";

export async function getPopularTv(
  page: number = 1,
  locale?: string | string[],
): Promise<PopularTvShowResponse> {
  locale = getImdbLocale(locale);
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${env.TMDB_KEY}&page=${page}&language=${locale}`,
  );
  return response.json();
}
