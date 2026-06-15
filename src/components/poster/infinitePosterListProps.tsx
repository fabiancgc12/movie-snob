"use client";

import {
  PosterCard,
  PosterType,
  SkeletonCard,
} from "@/components/poster/posterCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PopularMovieResponse } from "@/models/popular/popularMovie.schema";
import { PopularTvShowResponse } from "@/models/popular/popularTv.schema";
import { TrendingResponse } from "@/models/trending/TrendingMovieResponse.schema";
import { Spinner } from "@/components/common/Spinner";
import { useInView } from "react-intersection-observer";
import { MediaType } from "@/models/MediaType";
import { useTranslations, useLocale } from "next-intl";

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

type InfinitePosterListProps = {
  mediaType: MediaType;
  api: string;
  parameters?: Record<string, any>;
  enabled?: boolean;
  queryKey: any[];
  isBackdrop?: boolean;
  fallbackMessage: string;
};

export function InfinitePosterList({
  mediaType,
  api,
  enabled = true,
  parameters = {},
  queryKey,
  isBackdrop,
  fallbackMessage,
}: InfinitePosterListProps) {
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
