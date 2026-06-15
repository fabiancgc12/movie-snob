import { InfinitePosterList } from "@/components/poster/oldInfinitePosterListProps";
import { SliderSection } from "@/components/Slider/SliderSection";
import { useLocale, useTranslations } from "next-intl";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PosterType } from "@/features/common/types/Poster.type";
import { getInfinitePopularTvShowsQueryOptions } from "@/features/popular/queries/getInfinitePopularTvShowsQuery.options";

export const InfinitePopularTvShowPosterListSection = () => {
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
    ...getInfinitePopularTvShowsQueryOptions(locale),
    select: (data) => {
      return data?.pages.flatMap((page): PosterType[] => {
        return page.results.map((media): PosterType => {
          return {
            id: media.id,
            poster_path: media.poster_path,
            backdrop_path: media.backdrop_path,
            vote_average: media.vote_average,
            release_date: media.release_date,
            media_type: "tv",
            title: media.name,
          };
        });
      });
    },
  });
  return (
    <SliderSection title={t("popularTvLabel")} speed={450}>
      <InfinitePosterList
        mediaType={"tv"}
        fallbackMessage={"There are not popular tv shows."}
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
