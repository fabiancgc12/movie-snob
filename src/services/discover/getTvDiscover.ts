import "server-only";

import { discoverTvResponseInterfaceSchema } from "@/models/discover/discoverTvResponse.schema";
import { getImdbLocale } from "@/utils/functions/getLanguage";
import { env } from "../../../env";
import { cacheLife, cacheTag } from "next/cache";

type options = {
  genre?: string | string[];
  page?: number;
  locale: string;
};
export async function getTvDiscover({ genre, page = 1, locale }: options) {
  "use cache";
  cacheLife("minutes");
  cacheTag("discover-tv");

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
    `https://api.themoviedb.org/3/discover/tv?${params.toString()}`,
  );
  const data = await response.json();
  return discoverTvResponseInterfaceSchema.parse(data);
}
