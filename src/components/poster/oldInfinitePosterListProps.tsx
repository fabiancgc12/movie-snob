"use client";

import { SkeletonCard } from "@/components/poster/posterCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PopularMovieResponse } from "@/models/popular/popularMovie.schema";
import { PopularTvShowResponse } from "@/models/popular/popularTv.schema";
import { TrendingResponse } from "@/models/trending/TrendingMovieResponse.schema";
import { Spinner } from "@/components/common/Spinner";
import { useInView } from "react-intersection-observer";
import { MediaType } from "@/models/MediaType";
import { useLocale, useTranslations } from "next-intl";
import { PosterType } from "@/features/common/types/Poster.type";
import { PosterList } from "@/components/poster/posterList";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { ErrorComponent } from "@/components/Layout/ErrorComponent";

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
      <div className="col-span-full flex flex-col items-center justify-center gap-4 rounded-lg border border-destructive/20 bg-destructive/5 py-16 text-center">
        <AlertCircle className="size-12 text-destructive/60" />
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">{message}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          className="gap-2"
        >
          <RefreshCw className="size-4" />
          {retry}
        </Button>
      </div>
    );
  }
  if (!data)
    return (
      <>
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} isBackdrop={isBackdrop} />
        ))}
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
  loaderClassName?: string;
  numberOfLoadingCards?: number;
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
  loaderClassName,
  numberOfLoadingCards = 6,
}: InfinitePosterListProps) => {
  const t = useTranslations("common");
  const [endElementRef] = useInView({
    threshold: 0.5,
    rootMargin: "700px 700px",
    onChange: (inView) => {
      if (inView)
        if (shouldFetch) {
          // fetchNextPage();
        }
    },
  });
  if (isError || isLoadingError || isRefetchError) {
    return (
      <ErrorComponent
        title={t("errorConnectingToServer")}
        onRetry={() => refetch()}
      />
    );
  }
  if (isPending)
    return (
      <>
        {Array.from({ length: numberOfLoadingCards }).map((_, i) => (
          <SkeletonCard key={i} isBackdrop={isBackdrop} />
        ))}
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
        <div ref={endElementRef} className={loaderClassName}>
          <Spinner />
        </div>
      )}
    </>
  );
};

export const InfinitePosterGrid = (
  props: Omit<
    InfinitePosterListProps,
    "loaderClassName" | "numberOfLoadingCards"
  >,
) => {
  return (
    <InfinitePosterList
      {...props}
      loaderClassName={"col-span-full"}
      numberOfLoadingCards={20}
    />
  );
};
