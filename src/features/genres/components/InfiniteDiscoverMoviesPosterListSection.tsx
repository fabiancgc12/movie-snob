import { InfinitePosterList } from "@/components/poster/oldInfinitePosterListProps";
import { SliderSection } from "@/components/Slider/SliderSection";
import { useLocale, useTranslations } from "next-intl";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PosterType } from "@/features/common/types/Poster.type";
import { getInfiniteDiscoverMoviesQuery } from "@/features/genres/queries/getInfiniteDiscoverMoviesQuery";
import { MovieGenresType } from "@/features/movieGenres/schemas/MovieGenresSchema";

type Props = {
  genre: MovieGenresType;
};

export const InfiniteDiscoverMoviesPosterListSection = ({ genre }: Props) => {
  const t = useTranslations("home");
  const locale = useLocale();
  const {
    data,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
    isError,
    isLoadingError,
    isRefetchError,
    isLoading,
  } = useInfiniteQuery({
    ...getInfiniteDiscoverMoviesQuery({ locale, genre: genre.id }),
    select: (data) => {
      return data?.pages.flatMap((page): PosterType[] => {
        return page.results.map((media): PosterType => {
          return {
            id: media.id,
            poster_path: media.poster_path,
            backdrop_path: media.backdrop_path,
            vote_average: media.vote_average,
            release_date: media.release_date,
            media_type: "movie",
            title: media.title,
          };
        });
      });
    },
  });
  return (
    <SliderSection title={genre.name} speed={450}>
      <InfinitePosterList
        mediaType={"movie"}
        fallbackMessage={t("noMovies")}
        refetch={refetch}
        isError={isError}
        isLoadingError={isLoadingError}
        isRefetchError={isRefetchError}
        fetchNextPage={fetchNextPage}
        shouldFetch={hasNextPage && !isFetching && !isFetchingNextPage}
        media={data}
        isPending={isLoading}
        hasNextPage={hasNextPage}
      />
    </SliderSection>
  );
};
