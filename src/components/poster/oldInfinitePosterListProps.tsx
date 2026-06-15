"use client";

import { PosterCard, SkeletonCard } from "@/components/poster/posterCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PopularMovieResponse } from "@/models/popular/popularMovie.schema";
import { PopularTvShowResponse } from "@/models/popular/popularTv.schema";
import { TrendingResponse } from "@/models/trending/TrendingMovieResponse.schema";
import { Spinner } from "@/components/common/Spinner";
import { useInView } from "react-intersection-observer";
import { MediaType } from "@/models/MediaType";
import { useTranslations, useLocale } from "next-intl";
import { PosterType } from "@/features/common/types/Poster.type";

export type props = {
  media: PosterType[];
  mediaType: MediaType;
  isBackdrop?: boolean;
  fallbackMessage: string;
};

export function PosterList({
  media,
  mediaType,
  isBackdrop,
  fallbackMessage,
}: props) {
  if (!media || media.length === 0) return <p>{fallbackMessage}</p>;
  return (
    <>
      {media.map((e, i) => (
        <PosterCard
          isBackdrop={isBackdrop}
          data={e}
          mediaType={mediaType}
          key={`card-${i}`}
        />
      ))}
    </>
  );
}

type OldInfinitePosterListProps = {
  mediaType: MediaType;
  api: string;
  parameters?: Record<string, any>;
  enabled?: boolean;
  queryKey: any[];
  isBackdrop?: boolean;
  fallbackMessage: string;
};

/**
 * @deprecated use InfinitePosterList
 */
export function OldInfinitePosterList({
  mediaType,
  api,
  enabled = true,
  parameters = {},
  queryKey,
  isBackdrop,
  fallbackMessage,
}: OldInfinitePosterListProps) {
  const t = useTranslations("common");
  const locale = useLocale();
  if (!parameters.page) parameters.page = 1;
  let {
    data,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
    error,
    isError,
    isLoadingError,
    isRefetchError,
  } = useInfiniteQuery<
    PopularMovieResponse | PopularTvShowResponse | TrendingResponse
  >({
    queryKey: queryKey,
    enabled: enabled,
    queryFn: ({ pageParam }) => {
      parameters.page = pageParam ?? parameters.page;
      parameters.locale = locale;
      const params = new URLSearchParams(parameters).toString();
      return fetch(`/api/${api}?${params}`).then((v) => v.json());
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.total_pages == lastPage.page) return undefined;
      return lastPage.page + 1;
    },
    initialPageParam: 1,
  });
  const [endElementRef] = useInView({
    threshold: 0.5,
    rootMargin: "700px 700px",
    onChange: (inView) => {
      if (inView)
        if (hasNextPage && !isFetchingNextPage && !isFetching) {
          fetchNextPage();
        }
    },
  });
  if (error || isError || isLoadingError || isRefetchError) {
    const retry = t("retry");
    const message = t("errorConnectingToServer");
    return (
      <div className="self-start">
        <p>{message}</p>
        <button onClick={() => refetch()} className="text-xs">
          {retry}
        </button>
      </div>
    );
  }
  if (!data)
    return (
      <>
        <SkeletonCard isBackdrop={isBackdrop} />
        <SkeletonCard isBackdrop={isBackdrop} />
        <SkeletonCard isBackdrop={isBackdrop} />
        <SkeletonCard isBackdrop={isBackdrop} />
        <SkeletonCard isBackdrop={isBackdrop} />
        <SkeletonCard isBackdrop={isBackdrop} />
      </>
    );

  const media = data?.pages?.map((p) => p.results).flat() ?? [];
  return (
    <>
      <PosterList
        mediaType={mediaType}
        media={media}
        isBackdrop={isBackdrop}
        fallbackMessage={fallbackMessage}
      />
      {
        <div ref={endElementRef} className={"loader"}>
          <Spinner />
        </div>
      }
    </>
  );
}

type InfinitePosterListProps = {
  media: PosterType[] | undefined;
  isPending: boolean;
  isError: boolean;
  isLoadingError: boolean;
  isRefetchError: boolean;
  refetch: () => void;
  fallbackMessage: string;
  mediaType: MediaType;
  shouldFetch: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isBackdrop?: boolean;
};

export const InfinitePosterList = ({
  media,
  isPending,
  isBackdrop,
  isError,
  isLoadingError,
  isRefetchError,
  refetch,
  fallbackMessage,
  mediaType,
  shouldFetch,
  hasNextPage,
  fetchNextPage,
}: InfinitePosterListProps) => {
  const t = useTranslations("common");
  const [endElementRef] = useInView({
    threshold: 0.5,
    rootMargin: "700px 700px",
    onChange: (inView) => {
      if (inView)
        if (shouldFetch) {
          fetchNextPage();
        }
    },
  });
  if (isError || isLoadingError || isRefetchError) {
    const retry = t("retry");
    const message = t("errorConnectingToServer");
    return (
      <div className="self-start">
        <p>{message}</p>
        <button onClick={() => refetch()} className="text-xs">
          {retry}
        </button>
      </div>
    );
  }
  if (isPending)
    return (
      <>
        <SkeletonCard isBackdrop={isBackdrop} />
        <SkeletonCard isBackdrop={isBackdrop} />
        <SkeletonCard isBackdrop={isBackdrop} />
        <SkeletonCard isBackdrop={isBackdrop} />
        <SkeletonCard isBackdrop={isBackdrop} />
        <SkeletonCard isBackdrop={isBackdrop} />
      </>
    );
  // by the time we hit this if, media is already defined
  return (
    <>
      <PosterList
        mediaType={mediaType}
        media={media ?? []}
        isBackdrop={isBackdrop}
        fallbackMessage={fallbackMessage}
      />
      {hasNextPage && (
        <div ref={endElementRef} className={"loader"}>
          <Spinner />
        </div>
      )}
    </>
  );
};
