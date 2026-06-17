import { TvShowType } from "@/models/tv/TvShow.type";
import { PosterType } from "@/features/common/types/Poster.type";
import { MovieType } from "@/models/Movies/MovieType";
import { SearchResult } from "@/models/search/MultiSearchResponse.schema";

type TvPosterDTO = Pick<
  TvShowType,
  "id" | "poster_path" | "vote_average" | "name"
> & {
  first_air_date?: string | null;
  backdrop_path?: string | null;
};

export const tvToPosterType = (media: TvPosterDTO): PosterType => {
  return {
    id: media.id,
    poster_path: media.poster_path,
    backdrop_path: media.backdrop_path,
    vote_average: media.vote_average,
    release_date: media.first_air_date,
    media_type: "tv",
    title: media.name,
  };
};

type MoviePosterDTO = Pick<
  MovieType,
  "id" | "poster_path" | "vote_average" | "title" | "release_date"
> & {
  backdrop_path?: string | null;
};

export const movieToPosterType = (media: MoviePosterDTO): PosterType => {
  return {
    id: media.id,
    poster_path: media.poster_path,
    backdrop_path: media.backdrop_path,
    vote_average: media.vote_average,
    release_date: media.release_date,
    media_type: "movie",
    title: media.title,
  };
};

export const searchResultToPosterType = (search: SearchResult) => {
  return {
    id: search.id,
    poster_path: search.poster_path,
    backdrop_path: search.backdrop_path,
    vote_average: search.vote_average,
    release_date: search.media_type === "tv" ? search.first_air_date : search.release_date,
    media_type: search.media_type,
    title: search.media_type === "tv" ? search.name : search.title,
  };
};
