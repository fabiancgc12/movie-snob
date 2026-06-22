import "server-only";

import { popularMovieResponseSchema } from "@/models/popular/popularMovie.schema";
import { getImdbLocale } from "@/utils/functions/getLanguage";
import { env } from "../../../env";
export async function getPopularMovies(page: number = 1, locale: string) {
  locale = getImdbLocale(locale);
  const params = new URLSearchParams({
    api_key: env.TMDB_KEY,
    page: String(page),
    language: locale,
  });
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?${params}`,
  );
  const data = await response.json();
  return popularMovieResponseSchema.parse(data);
}
