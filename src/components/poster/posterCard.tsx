import Image from "next/image";
import React from "react";
import { Average, RatingAverage } from "@/components/common/Average";
import { generateImageUrl } from "@/utils/functions/generateImageUrl";
import Skeleton from "react-loading-skeleton";
import { MediaType } from "@/models/MediaType";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Star } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Button,
  LikeButton,
} from "@/components/common/ActionButton/LikeButton";
import { BookmarkButton } from "@/components/common/ActionButton/chechMarkButton";

export type PosterType = {
  id: number;
  poster_path?: string;
  backdrop_path?: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
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
  const posterPath = isBackdrop ? data.backdrop_path : data.poster_path;
  const poster = generateImageUrl(posterPath);
  const type = data.media_type ?? mediaType;
  return (
    <article
      className={cn(
        "m-0 p-0 bg-transparent relative w-[200px] p-0 m-0 isolate rounded-[0.5em] max-md:w-[40vw] max-md:min-w-[160px] max-md:max-w-[200px]",
        isBackdrop &&
          "w-[300px] max-md:w-[35vw] max-md:min-w-[220px] max-md:max-w-[300px]",
      )}
    >
      <div className={"relative group relative overflow-hidden"}>
        <Link href={`/${type}/${data.id}`} className="no-underline">
          <div
            className={cn(
              "relative w-full overflow-hidden rounded-[0.5em]",
              isBackdrop ? "aspect-video" : "aspect-[1/1.5]",
            )}
          >
            <Image
              src={poster}
              alt={"title poster"}
              fill
              className={cn(
                isBackdrop
                  ? ""
                  : "rounded-t-[0.5em] group-hover:scale-105 transition-all duration-300",
              )}
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
        <div className="absolute opacity-0 group-hover:opacity-100 translate-y-0 group-hover:-translate-y-full z-4 px-2 pb-1 transition-all flex justify-between items-center w-full gap-1 duration-300">
          <RatingAverage rating={data.vote_average} size={36} />
          <LikeButton
            mediaType={type}
            size={"xs"}
            media={data}
            className={"ml-auto"}
          />
          <BookmarkButton mediaType={type} size={"xs"} media={data} />
        </div>
      </div>

      <div className="mt-2.5 px-0.5">
        <div className="flex items-start justify-between gap-1">
          <p
            className={cn(
              "font-semibold text-foreground leading-snug line-clamp-2 flex-1 text-sm",
              // dims.text,
            )}
          >
            {data.title}
          </p>
          <div className="flex items-center gap-0.5 mt-0.5 flex-shrink-0">
            <HugeiconsIcon
              icon={Star}
              className="w-3 h-3 text-primary fill-primary"
            />
            <span className="text-[10px] text-primary font-semibold">
              {(data.vote_average / 10).toFixed(1)}
            </span>
          </div>
        </div>
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
        isBackdrop &&
          "w-[300px] max-md:w-[35vw] max-md:min-w-[220px] max-md:max-w-[300px]",
      )}
    >
      <Skeleton
        className="relative w-full aspect-[1/1.5]"
        containerClassName={"skeleton"}
      />
      <div className="mt-3.5 p-1.5">
        <Skeleton containerClassName={"skeleton"} />
      </div>
    </article>
  );
}
