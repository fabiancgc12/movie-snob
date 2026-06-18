import { PosterType } from "@/features/common/types/Poster.type";
import { MediaType } from "@/models/MediaType";
import { PosterCard } from "@/components/poster/posterCard";
import { EmptyState } from "@/components/Layout/EmptyState";

export type PosterListProps = {
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
}: PosterListProps) {
  if (!media || media.length === 0) {
    return <EmptyState title={fallbackMessage} />;
  }
  return (
    <>
      {media.map((e, i) => (
        <PosterCard
          key={`${e.id}-${i}`}
          isBackdrop={isBackdrop}
          data={e}
          mediaType={mediaType}
        />
      ))}
    </>
  );
}
