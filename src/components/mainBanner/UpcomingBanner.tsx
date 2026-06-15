import { generateImageUrl } from "@/utils/functions/generateImageUrl";
import { CSSProperties, useMemo } from "react";
import { MovieResumeSchema } from "@/models/Movies/MovieResume.schema";
import { FullDate } from "@/components/common/FullDate";
import { VideoTrailerInterface } from "@/models/Movies/VideoMedia.type";
import { Video } from "@/components/Video/Video";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { RatingAverage } from "@/components/common/Average";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Info, Play } from "lucide-react";

type props = {
  data: MovieResumeSchema;
  trailer?: VideoTrailerInterface;
};

export function UpcomingBanner({ data, trailer }: props) {
  const t = useTranslations("common");
  const locale = useLocale();
  const bg = useMemo(
    () =>
      ({
        "--bgImage": `url(${generateImageUrl(data.backdrop_path, 1280)})`,
      }) as CSSProperties,
    [data],
  );
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
        <h2
          className={cn(
            "overflow-hidden line-clamp-2 text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-2 sm:mb-3 leading-tight",
            data.title.length >= 20 && "text-xl",
          )}
        >
          {data.title}
        </h2>
        <div
          className={
            "flex flex-wrap items-center gap-1.5 sm:gap-3 mb-2 sm:mb-4 text-[12px] sm:text-base"
          }
        >
          <RatingAverage rating={data.vote_average} size={40} />
          <p className={"text-muted-foreground "}>
            <FullDate date={data.release_date} lang={locale} />
          </p>
        </div>
        <p className="text-muted-foreground text-[12px] sm:text-sm leading-snug mb-3 sm:mb-6 line-clamp-2 sm:line-clamp-3">
          {data.overview}
        </p>
        <div className="flex items-start gap-1.5">
          {trailer && (
            <Video video={trailer}>
              {(props) => {
                return (
                  <Button {...props} className={"rounded-md"}>
                    <Play />
                    {t("watchTrailer")}
                  </Button>
                );
              }}
            </Video>
          )}
          <Button
            variant={"outline"}
            className={"rounded-md"}
            nativeButton={false}
            render={(props) => (
              <Link {...props} href={`/movie/${data.id}`}>
                <Info />
                {t("readMore")}
              </Link>
            )}
          ></Button>
        </div>
      </div>
    </div>
  );
}
