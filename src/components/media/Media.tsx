"use client";

import Image from "next/image";
import { generateImageUrl } from "@/utils/functions/generateImageUrl";
import { VideoTrailer } from "@/models/Movies/VideoMedia.schema";
import { ImageMedia } from "@/models/Movies/ImageMedia.schema";
import { VideoThumbnail } from "@/components/Video/VideoThumbnail";
import { Section } from "@/components/Section/Section";
import { Slider } from "@/components/Slider/Slider";
import { SliderSection } from "@/components/Slider/SliderSection";
import { useTranslations } from "next-intl";

type props = {
  videos: VideoTrailer[];
  images: ImageMedia;
};
export function Media({ videos, images }: props) {
  const t = useTranslations("common");
  const movieOrTvT = useTranslations("movieortv");
  const backdrops = images.backdrops.slice(0, 9);
  const movieFallBackMessage = movieOrTvT("noMediaFallbackMessage", {
    media: t("videosLabel").toLowerCase(),
  });
  const tvFallBackMessage = movieOrTvT("noMediaFallbackMessage", {
    media: t("imagesLabel").toLowerCase(),
  });

  return (
    <>
      <Section title={t("videosLabel")} className="border-t border-input pt-4">
        {videos.length > 0 ? (
          <Slider speed={450}>
            {videos &&
              videos.map((v) => (
                <VideoThumbnail video={v} key={`video-${v.key}`} />
              ))}
          </Slider>
        ) : (
          <p>{movieFallBackMessage}</p>
        )}
      </Section>
      <SliderSection className="isolate border-t border-input pt-4" title={t("imagesLabel")} speed={450}>
        {backdrops.length > 0 ? (
          backdrops.map((b, i) => (
            <div
              className="relative w-[80vw] max-w-[450px] aspect-[16/9] overflow-hidden rounded-lg group"
              key={`backdrop-${i}`}
            >
              <Image
                src={generateImageUrl(b.file_path)}
                alt={`movie backdrop ${i}`}
                fill
                className="rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))
        ) : (
          <p>{tvFallBackMessage}</p>
        )}
      </SliderSection>
    </>
  );
}
