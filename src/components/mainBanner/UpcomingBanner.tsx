import Link from "next/link";
import { generateImageUrl } from "@/utils/functions/generateImageUrl";
import { CSSProperties, useMemo } from "react";
import { ActionToolTip } from "@/components/common/ActionToolTip";
import { BookmarkButton } from "@/components/common/ActionButton/chechMarkButton";
import { MovieResumeInterface } from "@/models/Movies/MovieResume.interface";
import { LikeButton } from "@/components/common/ActionButton/LikeButton";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FullDate } from "@/components/common/FullDate";
import { VideoTrailerInterface } from "@/models/Movies/VideoMedia.interface";
import { Video } from "@/components/Video/Video";
import { useTranslations, useLocale } from "next-intl";
import { useLang } from "@/hooks/useLang";
import { cn } from "@/lib/utils";

type props = {
  data: MovieResumeInterface;
  trailer?: VideoTrailerInterface;
};

export function UpcomingBanner({ data, trailer }: props) {
  const t = useTranslations("common");
  const locale = useLocale();
  const langPrefix = useLang();
  const bg = useMemo(
    () =>
      ({
        "--bgImage": `url(${generateImageUrl(data.backdrop_path, 1280)})`,
      }) as CSSProperties,
    [data],
  );
  const bigTitleStyle = data.title.length >= 20 ? "text-xl" : "";
  const readMore = t("readMore");
  const watchTrailer = t("watchTrailer");
  const addToBookmark = t("addToBookmark");
  const addToLiked = t("addToLiked");
  return (
    <div
      className={cn(
        "flex items-end p-4 pr-8 relative bg-no-repeat bg-cover bg-center max-lg:h-[300px] max-lg:bg-top max-md:h-[300px] lg:h-screen lg:pb-16",
        "bg-[linear-gradient(to_right,var(--primaryColor)_0%,transparent_50%),var(--bgImage)]",
        !data.backdrop_path && "placeholderImage",
      )}
      style={bg}
    >
      <div className="flex flex-col gap-1.5 z-[2] max-lg:w-full lg:w-2/5">
        <h2 className={cn("overflow-hidden line-clamp-2", bigTitleStyle)}>
          {data.title}
        </h2>
        <FullDate date={data.release_date} lang={locale} />
        <div className="flex items-start gap-1.5">
          <Link
            className="rounded bg-primary text-primary-foreground px-3 py-2 no-underline"
            href={`/${langPrefix}/movie/${data.id}`}
          >
            {readMore}
          </Link>
          {trailer && (
            <Video video={trailer}>
              <a className="rounded border border-border bg-input/30 px-3 py-2 text-foreground no-underline" href={"#"}>
                {watchTrailer}
              </a>
            </Video>
          )}
        </div>
        <p className="max-lg:hidden">
          <small className="block rounded-lg bg-slate-700/40 p-1 line-clamp-3">{data.overview}</small>
        </p>
        <div className="absolute top-4 right-4">
          <ActionToolTip
            buttonContent={<BsThreeDotsVertical />}
            buttonSize={"sm"}
          >
            <div className="flex items-center gap-1.5">
              <BookmarkButton
                media={data}
                mediaType={"movie"}
                size={"xs"}
                className="border-0"
              />
              <small>{addToBookmark}</small>
            </div>
            <div className="flex items-center gap-1.5">
              <LikeButton
                media={data}
                mediaType={"movie"}
                size={"xs"}
                className="border-0"
              />
              <small>{addToLiked}</small>
            </div>
          </ActionToolTip>
        </div>
      </div>
    </div>
  );
}
