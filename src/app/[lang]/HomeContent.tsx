"use client";

import { PosterList } from "@/components/poster/oldInfinitePosterListProps";
import { MovieResumeSchema } from "@/models/Movies/MovieResume.schema";
import { UpcomingBanner } from "@/components/mainBanner/UpcomingBanner";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@/components/common/Spinner";
import { ComponentProps, useEffect, useRef, useState } from "react";
import { MovieGenres, MovieGenresSpanish } from "@/utils/movieGenres";
import { SliderSection } from "@/components/Slider/SliderSection";
import { VideoTrailer } from "@/models/Movies/VideoMedia.schema";
import { useTranslations, useLocale } from "next-intl";
import { useTheme } from "@/global/ThemeContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { InfiniteTrendingPosterListSection } from "@/features/trending/components/InfiniteTrendingPosterListSection";
import { InfinitePopularMoviesPosterListSection } from "@/features/popular/components/InfinitePopularMoviesPosterListSection";
import { InfinitePopularTvShowPosterListSection } from "@/features/popular/components/InfinitePopularTvShowsPosterListSection";
import { InfiniteDiscoverMoviesPosterListSection } from "@/features/genres/components/InfiniteDiscoverMoviesPosterListSection";

type props = {
  upcoming: MovieResumeSchema[];
  upcomingTrailers: VideoTrailer[];
};

const carouselOptions: ComponentProps<typeof Carousel>["opts"] = {
  loop: true,
};

export function HomeContent({ upcoming, upcomingTrailers }: props) {
  const t = useTranslations("home");
  const [theme] = useTheme();
  const plugin = useRef([Autoplay({ delay: 8000, stopOnInteraction: true })]);
  return (
    <div className={"w-full"}>
      <Carousel opts={carouselOptions} plugins={plugin.current}>
        <CarouselContent className={"z-10"}>
          {upcoming.slice(0, 8).map((u, i) => (
            <CarouselItem key={u.id}>
              <UpcomingBanner data={u} trailer={upcomingTrailers[i]} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className={"left-4 z-50 translate-y-0 hidden md:flex"}
        />
        <CarouselNext className={"right-4 z-50 translate-y-0 hidden md:flex"} />
      </Carousel>
      <InfiniteTrendingPosterListSection />
      <SliderSection title={t("upcomingLabel")} speed={450}>
        <PosterList
          isBackdrop={true}
          media={upcoming}
          mediaType={"movie"}
          fallbackMessage={"There are not upcoming movies."}
        />
      </SliderSection>
      <div data-theme={theme}>
        <InfinitePopularMoviesPosterListSection />
        <InfinitePopularTvShowPosterListSection />
      </div>
      <GenreSection />
    </div>
  );
}

const genresLimit = 9;

function GenreSection() {
  const locale = useLocale();
  const [genres, setGenres] = useState<typeof MovieGenres>([]);
  const [theme] = useTheme();
  const [loadMoreRef, inView] = useInView({
    threshold: 1,
    rootMargin: "300px",
  });
  useEffect(() => {
    if (inView) {
      const langGenres = locale == "es" ? MovieGenresSpanish : MovieGenres;
      setGenres((current) => {
        if (
          langGenres.length > current.length &&
          current.length <= genresLimit - 1
        ) {
          return langGenres.slice(0, current.length + 3);
        }
        return [...current];
      });
    }
  }, [inView, locale]);

  return (
    <div className={"space-y-10"}>
      {genres.map((genre, i) => {
        return (
          <div key={genre.id} data-theme={i % 3 == 0 ? "dark" : theme}>
            <InfiniteDiscoverMoviesPosterListSection genre={genre} />
          </div>
        );
      })}
      {genres.length <= genresLimit - 1 && (
        <div ref={loadMoreRef} className="p-4">
          <Spinner />
        </div>
      )}
    </div>
  );
}
