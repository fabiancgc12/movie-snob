import Image from "next/image";
import { RatingAverage } from "@/components/common/Average";
import { generateImageUrl } from "@/utils/functions/generateImageUrl";
import { Skeleton } from "@/components/ui/skeleton";
import { MediaType } from "@/models/MediaType";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Star } from "lucide-react";
import { LikeButton } from "@/components/common/ActionButton/LikeButton";
import { BookmarkButton } from "@/components/common/ActionButton/chechMarkButton";
import { PosterType } from "@/features/common/types/Poster.type";

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
                "group-hover:scale-105 transition-all duration-300",
                isBackdrop ? "" : "rounded-t-[0.5em]",
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
            <Star className="w-3 h-3 text-primary fill-primary" />
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
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-[0.5em]",
          isBackdrop ? "aspect-video" : "aspect-[1/1.5]",
        )}
      >
        <Skeleton className="absolute inset-0 w-full h-full" />
      </div>
      <div className="mt-2.5 px-0.5">
        <div className="flex items-start justify-between gap-1">
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-3 w-6" />
        </div>
      </div>
    </article>
  );
}
