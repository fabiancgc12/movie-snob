import {
  multiSearchResponseSchema,
  MultiSearchResponseSchema,
} from "@/models/search/MultiSearchResponse.schema";
import { getImdbLocale } from "@/utils/functions/getLanguage";
import { env } from "../../../env";

type options = {
  title?: string;
  page?: number;
  locale: string;
};

export async function getMultiSearch({ page = 1, title, locale }: options) {
  let parameters: Record<string, any> = {};
  parameters.page = page;
  parameters.language = getImdbLocale(locale);
  if (title) {
    parameters.query = title;
  }

  const paramsString = new URLSearchParams(parameters).toString();

  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${env.TMDB_KEY}&${paramsString}`,
  );
  const data = await response.json();
  const result = multiSearchResponseSchema.parse(data);
  //filtering anything that is not a movie or tv show
  result.results = result.results.filter(
    (r) => r.media_type == "movie" || r.media_type == "tv",
  );
  return result;
}
