import { TvShowType } from "@/models/tv/TvShow.type";
import { MovieType } from "@/models/Movies/Movie.type";

export function generateUrlPage(
  media: TvShowType | MovieType,
  mediaType: "tv" | "movie",
) {
  return `https://moviesnob.vercel.app/${mediaType}/${media.id}`;
}
