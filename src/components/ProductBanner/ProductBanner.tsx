"use client";
import { generateImageUrl } from "@/utils/functions/generateImageUrl";
import Image from "next/image";
import { calculateRunTime } from "@/utils/functions/calculateRunTime";
import { Video } from "@/components/Video/Video";
import { Average } from "@/components/common/Average";
import { BookmarkButton } from "@/components/common/ActionButton/chechMarkButton";
import { LikeButton } from "@/components/common/ActionButton/LikeButton";
import { ShareButton } from "@/components/common/ActionButton/ShareButton";
import { MemberCard } from "@/components/CrewMember/CrewMemberCard";
import { MovieSchema } from "@/models/Movies/Movie.schema";
import { VideoTrailer } from "@/models/Movies/VideoMedia.schema";
import { TvShowType } from "@/models/tv/TvShow.type";
import { PeopleDto } from "@/models/dto/Credit.dto";
import { generateUrlPage } from "@/utils/functions/generateUrlPage";
import { CSSProperties, useMemo } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type props = {
  trailer?: VideoTrailer;
  credits?: PeopleDto[] | null;
} & (
  | {
      product: MovieSchema;
      mediaType: "movie";
    }
  | {
      product: TvShowType;
      mediaType: "tv";
    }
);

export function MediaBanner({ product, trailer, credits, mediaType }: props) {
  const t = useTranslations("movieortv");
  const commonT = useTranslations("common");
  const lang = useLocale();
  const bg = useMemo(
    () =>
      ({
        "--bgImage": `url(${generateImageUrl(product.backdrop_path, 1280)})`,
      }) as CSSProperties,
    [product],
  );

  const posterPath = generateImageUrl(product.poster_path);
  const title = mediaType == "movie" ? product.title : product.name;
  const titleSize = title.length > 20 ? "text-2xl" : "";
  const videoLabel =
    mediaType == "movie" ? commonT("watchTrailer") : commonT("watchOpening");
  return (
    <section
      className={cn(
        "relative grid grid-cols-[minmax(125px,1fr)_2fr] place-items-center bg-no-repeat max-md:bg-[position:top_right] max-md:bg-[length:82%] max-md:bg-[linear-gradient(to_right,var(--primaryDarker)_0%,transparent_50%),var(--bgImage)] md:p-4 md:place-items-stretch md:bg-[position:top_center] md:bg-cover",
      )}
      style={bg}
    >
      <div className="w-full p-4 md:p-4">
        <div className="relative left-[10%] grid aspect-[1/1.5] max-w-[300px] max-md:left-[10%] md:left-0">
          <Image
            src={posterPath}
            alt={`${title} poster`}
            priority
            fill
            className="rounded-[0.5em]"
          />
        </div>
      </div>
      <div className="px-4 grid-column-1/-1 md:z-[1] md:flex md:flex-col md:justify-evenly md:p-4">
        <div className="flex items-center justify-between py-1 max-md:flex-row">
          <div className="flex gap-1.5">
            {product.genres?.slice(0, 3).map((g) => (
              <Link
                className="badge"
                href={`/${lang}/discover?media=${mediaType}&genre=${g.id}`}
                key={`genre-${g.id}`}
              >
                {g.name}
              </Link>
            ))}
          </div>
          {mediaType == "movie" && product.runtime != null && (
            <div>{calculateRunTime(product.runtime)}</div>
          )}
        </div>
        <div className="flex items-center justify-between py-1 max-md:flex-col max-md:items-start">
          <h1
            className={cn(
              "text-center max-md:text-2xl md:text-start",
              titleSize,
            )}
          >
            {title}
            {mediaType === "movie" && product.release_date.length != 0 && (
              <small className="font-light text-xl max-md:text-lg">
                {" "}
                ({product.release_date.slice(0, 4)})
              </small>
            )}
          </h1>
          {trailer && (
            <Video video={trailer}>
              {(props) => (
                <Button variant={"link"} {...props}>
                  {videoLabel}
                </Button>
              )}
            </Video>
          )}
        </div>
        <div className="text-justify py-1 border-b border-[var(--primaryLight)]">
          <h4>{t("overview")}</h4>
          <small className="block rounded-lg bg-slate-700/45 p-1 md:overflow-auto md:scrollbar-gutter-stable">
            {product.overview || t("overviewFallback")}
          </small>
        </div>
        <div className="flex justify-start gap-8 items-center py-1">
          <Average value={product.vote_average} />
          <BookmarkButton mediaType={mediaType} media={product} />
          <LikeButton mediaType={mediaType} media={product} />
          <ShareButton
            url={generateUrlPage(product, mediaType)}
            title={title}
          />
        </div>
        <div className="grid grid-cols-2 justify-between gap-2.5 py-1">
          {credits &&
            credits
              .slice(0, 2)
              .map((c) => (
                <MemberCard
                  key={`crew-${c.id}-${c.role}`}
                  size={"sm"}
                  people={c}
                  shadow={false}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
