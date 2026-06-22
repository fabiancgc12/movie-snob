"use client";

import { InfinitePosterList } from "@/components/poster/InfinitePosterListProps";
import { SliderSection } from "@/components/Slider/SliderSection";
import { useLocale, useTranslations } from "next-intl";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PosterType } from "@/features/common/types/Poster.type";
import { getInfinitePopularTvShowsQueryOptions } from "@/features/popular/queries/getInfinitePopularTvShowsQuery.options";
import { tvToPosterType } from "@/features/common/utils/mediaToPosterType";

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
          return tvToPosterType({
            ...media,
            first_air_date: media.release_date,
          });
        });
      });
    },
  });
  return (
    <SliderSection title={t("popularTvLabel")} speed={450}>
      <InfinitePosterList
        mediaType={"tv"}
        fallbackMessage={t("noPopularTv")}
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
