import { MediaType } from "@/models/MediaType";

export type PosterType = {
  id: number;
  poster_path?: string | null;
  backdrop_path?: string | null;
  vote_average: number;
  release_date?: string | null;
  first_air_date?: string;
  media_type?: MediaType;
  title?: string;
  name?: string;
};
