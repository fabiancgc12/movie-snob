import { UpcomingMoviesResponse } from "@/models/Movies/UpcomingMoviesResponse";
import { getImdbLocale } from "@/utils/functions/getLanguage";
import { env } from "../../../env";

export async function getUpcoming(
  locale?: string | string[],
): Promise<UpcomingMoviesResponse> {
  locale = getImdbLocale(locale);
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${env.TMDB_KEY}&language=${locale}`,
  );
  return response.json();
}
