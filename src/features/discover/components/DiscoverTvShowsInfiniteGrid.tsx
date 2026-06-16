import { useLocale, useTranslations } from "next-intl";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getDiscoverTvShowsInfiniteQuery } from "@/features/discover/queries/getDiscoverTvShowsInfiniteQuery";
import { PosterType } from "@/features/common/types/Poster.type";
import { tvToPosterType } from "@/features/common/utils/mediaToPosterType";
import { InfinitePosterGrid } from "@/components/poster/oldInfinitePosterListProps";

type DiscoverGridProps = {
  genre: string | number;
};

export const DiscoverTvShowsInfiniteGrid = ({ genre }: DiscoverGridProps) => {
  const t = useTranslations("discover");
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
    ...getDiscoverTvShowsInfiniteQuery({ locale, genre }),
    select: (data) => {
      return data?.pages.flatMap((page): PosterType[] => {
        return page.results.map(tvToPosterType);
      });
    },
  });
  return (
    <InfinitePosterGrid
      mediaType={"tv"}
      fallbackMessage={t("tvFallback")}
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
  );
};
