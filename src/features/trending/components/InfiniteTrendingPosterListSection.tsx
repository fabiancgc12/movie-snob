"use client";

import { SliderSection } from "@/components/Slider/SliderSection";
import { useLocale, useTranslations } from "next-intl";
import { InfinitePosterList } from "@/components/poster/InfinitePosterListProps";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PosterType } from "@/features/common/types/Poster.type";
import { getTrendingMediaQueryOptions } from "@/features/trending/queries/getTrendingMediaQueryOptions";

export const InfiniteTrendingPosterListSection = () => {
  const t = useTranslations("home");
  const trendingLabel = t("trendingLabel");
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
    ...getTrendingMediaQueryOptions(locale),
    select: (data) => {
      return data?.pages.flatMap((page): PosterType[] => {
        return page.results.map((media): PosterType => {
          return {
            id: media.id,
            poster_path: media.poster_path,
            backdrop_path: media.backdrop_path,
            vote_average: media.vote_average,
            release_date: media.release_date,
            media_type: media.media_type,
            title: media.title,
          };
        });
      });
    },
  });
  return (
    <SliderSection title={trendingLabel} speed={450}>
      <InfinitePosterList
        mediaType={"movie"}
        fallbackMessage={t("noTrending")}
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
