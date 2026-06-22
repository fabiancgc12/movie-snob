import "server-only";

import { discoverMovieResponseSchema } from "@/models/discover/discoverMovieResponse.schema";
import { env } from "../../../env";
type options = {
  genre?: string | string[];
  page?: number;
  locale: string;
};
export async function getMovieDiscover({ genre, page = 1, locale }: options) {
  const params = new URLSearchParams({
    page: page.toString(),
    api_key: env.TMDB_KEY,
    language: locale,
  });
  if (genre) {
    const genreParams = Array.isArray(genre) ? genre.join(",") : genre;
    params.set("with_genres", genreParams);
  }
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?${params.toString()}`,
  );
  const data = await response.json();
  return discoverMovieResponseSchema.parse(data);
}
