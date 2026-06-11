import Image from "next/image";
import React from "react";
import { Average } from "@/components/common/Average";
import { generateImageUrl } from "@/utils/functions/generateImageUrl";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { MediaType } from "@/models/MediaType";
import { useLang } from "@/hooks/useLang";
import { cn } from "@/lib/utils";

export type PosterType = {
  id: number;
  poster_path?: string;
  backdrop_path?: string | null;
  vote_average: number;
  media_type?: MediaType;
  title?: string;
  name?: string;
};

type props = {
  data: PosterType;
  mediaType: MediaType;
  isBackdrop?: boolean;
};

export function PosterCard({ data, mediaType, isBackdrop = false }: props) {
  const lang = useLang();
  const posterPath = isBackdrop ? data.backdrop_path : data.poster_path;
  const poster = generateImageUrl(posterPath);
  const type = data.media_type ?? mediaType;
  const title = data.title ?? (data.name as string);
  return (
    <article
      className={cn(
        "relative w-[200px] p-0 m-0 isolate rounded-[0.5em] max-md:w-[40vw] max-md:min-w-[160px] max-md:max-w-[200px]",
        isBackdrop && "w-[300px] max-md:w-[35vw] max-md:min-w-[220px] max-md:max-w-[300px]",
      )}
    >
      <Link href={`/${lang}/${type}/${data.id}`} className="no-underline">
        <div
          className={cn(
            "relative w-full overflow-hidden",
            isBackdrop ? "aspect-video" : "aspect-[1/1.5]",
          )}
        >
          <Image
            src={poster}
            alt={"title poster"}
            fill
            className={cn(
              isBackdrop ? "" : "rounded-t-[0.5em]",
            )}
          />
        </div>
        <div className="absolute -translate-y-[60%] z-[4] px-[5px]">
          <Average value={data.vote_average} size={"sm"} />
        </div>
      </Link>
      <div className="mt-3.5 p-1.5 text-inherit line-clamp-2">
        <small>{title}</small>
      </div>
    </article>
  );
}

type SkeletonProps = {
  isBackdrop?: boolean;
};

export function SkeletonCard({ isBackdrop }: SkeletonProps) {
  return (
    <article
      className={cn(
        "relative w-[200px] p-0 m-0 isolate rounded-[0.5em] max-md:w-[40vw] max-md:min-w-[160px] max-md:max-w-[200px]",
        isBackdrop && "w-[300px] max-md:w-[35vw] max-md:min-w-[220px] max-md:max-w-[300px]",
      )}
    >
      <Skeleton className="relative w-full aspect-[1/1.5]" containerClassName={"skeleton"} />
      <div className="mt-3.5 p-1.5">
        <Skeleton containerClassName={"skeleton"} />
      </div>
    </article>
  );
}
