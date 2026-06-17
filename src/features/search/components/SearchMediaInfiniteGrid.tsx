import { useLocale, useTranslations } from "next-intl";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PosterType } from "@/features/common/types/Poster.type";
import { searchResultToPosterType } from "@/features/common/utils/mediaToPosterType";
import { InfinitePosterGrid } from "@/components/poster/oldInfinitePosterListProps";
import { getSearchInfiniteQuery } from "@/features/search/queries/getSearchInfiniteQuery";

type DiscoverGridProps = {
  title: string | undefined;
};

export const SearchMediaInfiniteGrid = ({ title }: DiscoverGridProps) => {
  const t = useTranslations("common");
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
    ...getSearchInfiniteQuery({ locale, title }),
    select: (data) => {
      return data?.pages.flatMap((page): PosterType[] => {
        return page.results.map(searchResultToPosterType);
      });
    },
  });
  return (
    <InfinitePosterGrid
      mediaType={"movie"}
      fallbackMessage={t("notFoundMovieOrTvMessage")}
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
