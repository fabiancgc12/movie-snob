import {
  UpcomingMoviesResponseType,
  upcomingMoviesResponseTypeSchema,
} from "@/models/Movies/UpcomingMoviesResponse.type";
import { getImdbLocale } from "@/utils/functions/getLanguage";
import { env } from "../../../env";

export async function getUpcoming(
  locale: string,
): Promise<UpcomingMoviesResponseType> {
  locale = getImdbLocale(locale);
  const params = new URLSearchParams({
    api_key: env.TMDB_KEY,
    language: locale,
  });
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?${params}`,
  );
  const data = await response.json();
  return upcomingMoviesResponseTypeSchema.parse(data);
}
