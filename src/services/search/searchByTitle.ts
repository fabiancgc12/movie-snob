import "server-only";

import {
  SearchResult,
  MultiSearchResponseSchema,
} from "@/models/search/MultiSearchResponse.schema";
import {
  movieSearchResponseSchema,
  MovieSearchResult,
} from "@/models/search/MovieSearch.schema";
import {
  tvSearchResponseSchema,
  TvSearchResult,
} from "@/models/search/TvSearch.schema";
import { getImdbLocale } from "@/utils/functions/getLanguage";
import { env } from "../../../env";
type Options = {
  title?: string;
  page?: number;
  locale: string;
};

const searchMovies = async (title: string, page: number, language: string) => {
  const params = new URLSearchParams({
    query: title,
    page: page.toString(),
    language,
  }).toString();
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${env.TMDB_KEY}&${params}`,
  );
  const raw = await response.json();
  return movieSearchResponseSchema.parse(raw);
};

const searchTv = async (title: string, page: number, language: string) => {
  const params = new URLSearchParams({
    query: title,
    page: page.toString(),
    language,
  }).toString();
  const response = await fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=${env.TMDB_KEY}&${params}`,
  );
  const raw = await response.json();
  return tvSearchResponseSchema.parse(raw);
};

const movieToSearchResult = (
  movie: MovieSearchResult,
  index: number,
): SearchResult & { _relevanceScore: number } => {
  return {
    adult: movie.adult,
    backdrop_path: movie.backdrop_path,
    genre_ids: movie.genre_ids,
    id: movie.id,
    media_type: "movie",
    name: movie.title,
    original_language: movie.original_language,
    original_name: movie.original_title,
    overview: movie.overview,
    popularity: movie.popularity,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    title: movie.title,
    video: movie.video,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
    _relevanceScore: index + 1 / (movie.popularity + 1),
  };
};

const tvToSearchResult = (
  tv: TvSearchResult,
  index: number,
): SearchResult & { _relevanceScore: number } => {
  return {
    adult: tv.adult,
    backdrop_path: tv.backdrop_path,
    first_air_date: tv.first_air_date,
    genre_ids: tv.genre_ids,
    id: tv.id,
    media_type: "tv",
    name: tv.name,
    origin_country: tv.origin_country,
    original_language: tv.original_language,
    original_name: tv.original_name,
    overview: tv.overview,
    popularity: tv.popularity,
    poster_path: tv.poster_path,
    vote_average: tv.vote_average,
    vote_count: tv.vote_count,
    _relevanceScore: index + 1 / (tv.popularity + 1),
  };
};

const mergeResults = (
  movieResults: MovieSearchResult[],
  tvResults: TvSearchResult[],
): SearchResult[] => {
  const merged = [
    ...movieResults.map(movieToSearchResult),
    ...tvResults.map(tvToSearchResult),
  ];
  merged.sort((a, b) => a._relevanceScore - b._relevanceScore);
  return merged.map(({ _relevanceScore, ...result }) => result);
};

export const searchByTitle = async ({
  page = 1,
  title,
  locale,
}: Options): Promise<MultiSearchResponseSchema> => {
  if (!title) {
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }
  const language = getImdbLocale(locale);
  const [movieData, tvData] = await Promise.all([
    searchMovies(title, page, language),
    searchTv(title, page, language),
  ]);

  const mergedResults = mergeResults(movieData.results, tvData.results);

  const totalPages = Math.max(movieData.total_pages, tvData.total_pages);
  const totalResults = movieData.total_results + tvData.total_results;

  return {
    page,
    results: mergedResults,
    total_pages: totalPages,
    total_results: totalResults,
  };
};
