import { DiscoverMovieResponseInterface } from "@/models/discover/discoverMovieResponse.Interface";
import { getImdbLocale } from "@/utils/functions/getLanguage";
import { env } from "../../../env";

type options = {
  genre?: string | string[];
  page?: number;
  locale?: string | string[];
};
export async function getMovieDiscover({
  genre,
  page = 1,
  locale,
}: options): Promise<DiscoverMovieResponseInterface> {
  let parameters: Record<string, any> = {};
  parameters.page = page;
  parameters.language = getImdbLocale(locale);
  if (genre) {
    if (Array.isArray(genre)) parameters.with_genres = genre.join(",");
    else parameters.with_genres = genre;
  }

  const params = new URLSearchParams(parameters).toString();

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${env.TMDB_KEY}&${params}`,
  );
  return (await response.json()) as DiscoverMovieResponseInterface;
}
