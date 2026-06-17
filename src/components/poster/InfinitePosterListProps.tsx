"use client";

import { SkeletonCard } from "@/components/poster/posterCard";
import { useInView } from "react-intersection-observer";
import { MediaType } from "@/models/MediaType";
import { useLocale, useTranslations } from "next-intl";
import { PosterType } from "@/features/common/types/Poster.type";
import { PosterList } from "@/components/poster/posterList";
import { ErrorComponent } from "@/components/Layout/ErrorComponent";

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
  numberOfLoadingCards = 6,
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
        <div ref={endElementRef}>
          <SkeletonCard isBackdrop={isBackdrop} />
        </div>
      )}
    </>
  );
};

export const InfinitePosterGrid = (
  props: Omit<InfinitePosterListProps, "numberOfLoadingCards">,
) => {
  return <InfinitePosterList {...props} numberOfLoadingCards={20} />;
};
