import { PopularMovieResponse } from "@/models/popular/popularMovie.interface";
import { getImdbLocale } from "@/utils/functions/getLanguage";
import { env } from "../../../env";

export async function getPopularMovies(
  page: number = 1,
  locale?: string | string[],
): Promise<PopularMovieResponse> {
  locale = getImdbLocale(locale);
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${env.TMDB_KEY}&page=${page}&language=${locale}`,
  );
  return response.json();
}
