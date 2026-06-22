import "server-only";

import { getPopularMovies } from "@/services/movies/getPopularMovies";
import { getPopularTv } from "@/services/tv/getPopularTv";
import { getTrending } from "@/services/trending/getTrending";
import { getUpcoming } from "@/services/movies/getUpcoming";
import { getMovieVideos } from "@/services/movies/getMovieVideos";
import { VideoTrailer } from "@/models/Movies/VideoMedia.schema";

export async function getHomePage(locale: string) {
  const [upcoming, popularMovies, popularTv, trending] = await Promise.all([
    getUpcoming(locale),
    getPopularMovies(1, locale),
    getPopularTv(1, locale),
    getTrending("all", 1, locale),
  ]);
  const trailerPromises = upcoming.results.map((u) =>
    getMovieVideos(u.id, locale),
  );
  const upcomingTrailers = (await Promise.all(trailerPromises)).map(
    (t) => t.results.filter(isTrailer)[0] ?? null,
  );
  return {
    upcoming: upcoming.results,
    upcomingTrailers: upcomingTrailers,
    popular: {
      movie: popularMovies,
      tv: popularTv,
    },
    trending: trending,
  };
}

function isTrailer(video: VideoTrailer) {
  const name = video.name.toLowerCase();
  return (
    video.site == "YouTube" &&
    (name.includes("trailer") || name.includes("tráiler"))
  );
}
