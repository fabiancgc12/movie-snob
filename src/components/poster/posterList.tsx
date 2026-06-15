import { PosterType } from "@/features/common/types/Poster.type";
import { MediaType } from "@/models/MediaType";
import { PosterCard } from "@/components/poster/posterCard";

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
  if (!media || media.length === 0) return <p>{fallbackMessage}</p>;
  return (
    <>
      {media.map((e) => (
        <PosterCard
          key={e.id}
          isBackdrop={isBackdrop}
          data={e}
          mediaType={mediaType}
        />
      ))}
    </>
  );
}
