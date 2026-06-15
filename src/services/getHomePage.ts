import { MovieResumeSchema } from "@/models/Movies/MovieResume.schema";
import { getPopularMovies } from "@/services/movies/getPopularMovies";
import { PopularMovieResponse } from "@/models/popular/popularMovie.schema";
import { getPopularTv } from "@/services/tv/getPopularTv";
import { PopularTvShowResponse } from "@/models/popular/popularTv.schema";
import { getTrending } from "@/services/trending/getTrending";
import { TrendingResponse } from "@/models/trending/TrendingMovieResponse.schema";
import { getUpcoming } from "@/services/movies/getUpcoming";
import { getMovieVideos } from "@/services/movies/getMovieVideos";
import { VideoTrailerInterface } from "@/models/Movies/VideoMedia.type";

export async function getHomePage(locale: string): Promise<{
  upcoming: MovieResumeSchema[];
  upcomingTrailers: VideoTrailerInterface[];
  popular: {
    movie: PopularMovieResponse;
    tv: PopularTvShowResponse;
  };
  trending: TrendingResponse;
}> {
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

function isTrailer(video: VideoTrailerInterface) {
  const name = video.name.toLowerCase();
  return (
    video.site == "YouTube" &&
    (name.includes("trailer") || name.includes("tráiler"))
  );
}
