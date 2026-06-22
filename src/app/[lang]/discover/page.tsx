import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getDiscoverMoviesInfiniteQuery } from "@/features/discover/queries/getDiscoverMoviesInfiniteQuery";
import { getDiscoverTvShowsInfiniteQuery } from "@/features/discover/queries/getDiscoverTvShowsInfiniteQuery";
import { getMovieDiscover } from "@/services/discover/getMovieDiscover";
import { getTvDiscover } from "@/services/discover/getTvDiscover";
import { DiscoverContent } from "./DiscoverContent";
import { MediaType, mediaTypeSchema } from "@/models/MediaType";
import {
  MovieGenres,
  MovieGenresSpanish,
  TvGenres,
  TvGenresSpanish,
} from "@/utils/movieGenres";

type Props = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ media?: string; genre?: string }>;
};

const validateMedia = (media: string | undefined | null): MediaType => {
  if (mediaTypeSchema.safeParse(media).success) return media as MediaType;
  return "movie";
};

export default async function DiscoverPage({ params, searchParams }: Props) {
  const { lang } = await params;
  const { media: originalMedia, genre = "" } = await searchParams;
  const media = validateMedia(originalMedia);
  const queryClient = new QueryClient();

  if (media === "tv") {
    const data = await getTvDiscover({ locale: lang, genre, page: 1 });
    await queryClient.prefetchInfiniteQuery({
      ...getDiscoverTvShowsInfiniteQuery({ locale: lang, genre }),
      queryFn: () => data,
    });
  } else {
    const data = await getMovieDiscover({ locale: lang, genre, page: 1 });
    await queryClient.prefetchInfiniteQuery({
      ...getDiscoverMoviesInfiniteQuery({ locale: lang, genre }),
      queryFn: () => data,
    });
  }
  const movieGenres = lang == "es" ? MovieGenresSpanish : MovieGenres;
  const tvGenres = lang == "es" ? TvGenresSpanish : TvGenres;
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={"p-4"}>
        <DiscoverContent
          initialMedia={media}
          initialGenre={genre}
          movieGenres={movieGenres}
          tvGenres={tvGenres}
        />
      </div>
    </HydrationBoundary>
  );
}
