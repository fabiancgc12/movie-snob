import { PopularMovieResponse } from "@/models/popular/popularMovie.interface";
import { getImdbLocale } from "@/utils/functions/getLanguage";
import { env } from "../../../env";

export async function getPopularMovies(
  page: number = 1,
  locale: string,
): Promise<PopularMovieResponse> {
  locale = getImdbLocale(locale);
  const params = new URLSearchParams({
    api_key: env.TMDB_KEY,
    page: String(page),
    language: locale,
  });
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?${params}`,
  );
  return response.json();
}
