import { TvShowType } from "@/models/tv/TvShow.type";
import { MovieSchema } from "@/models/Movies/Movie.schema";

export function generateUrlPage(
  media: TvShowType | MovieSchema,
  mediaType: "tv" | "movie",
) {
  return `https://moviesnob.vercel.app/${mediaType}/${media.id}`;
}
