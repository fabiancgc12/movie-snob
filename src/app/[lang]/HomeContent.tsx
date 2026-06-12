"use client";

import { DynamicPosterList, PosterList } from "@/components/poster/posterList";
import { SlideShow } from "@/components/SlideShow/SlideShow";
import { MovieResumeInterface } from "@/models/Movies/MovieResume.interface";
import { UpcomingBanner } from "@/components/mainBanner/UpcomingBanner";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@/components/common/Spinner";
import { ComponentProps, useEffect, useState } from "react";
import { MovieGenres, MovieGenresSpanish } from "@/utils/movieGenres";
import { SliderSection } from "@/components/Slider/SliderSection";
import { VideoTrailerInterface } from "@/models/Movies/VideoMedia.interface";
import { useTranslations, useLocale } from "next-intl";
import { Section } from "@/components/Section/Section";
import { Slider } from "@/components/Slider/Slider";
import { useTheme } from "@/global/ThemeContext";
import { useLang } from "@/hooks/useLang";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type props = {
  upcoming: MovieResumeInterface[];
  upcomingTrailers: VideoTrailerInterface[];
  dehydratedState: unknown;
};

const carouselOptions: ComponentProps<typeof Carousel>["opts"] = {
  loop: true,
};

export function HomeContent({ upcoming, upcomingTrailers }: props) {
  const t = useTranslations("home");
  const locale = useLocale();
  const [theme] = useTheme();
  const trendingLabel = t("trendingLabel");
  const upcomingLabel = t("upcomingLabel");
  const popularMoviesLabel = t("popularMoviesLabel");
  const popularTvLabel = t("popularTvLabel");
  return (
    <div className={"w-full"}>
      <Carousel opts={carouselOptions}>
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
      <div data-theme={theme}>
        <SliderSection title={trendingLabel} speed={450}>
          <DynamicPosterList
            mediaType={"movie"}
            enabled={false}
            api={"trending"}
            queryKey={["trending", locale]}
            fallbackMessage={"There are not trending movies."}
          />
        </SliderSection>
      </div>
      <div data-theme="dark">
        <SliderSection title={upcomingLabel} speed={450}>
          <PosterList
            isBackdrop={true}
            media={upcoming}
            mediaType={"movie"}
            fallbackMessage={"There are not upcoming movies."}
          />
        </SliderSection>
      </div>
      <div data-theme={theme}>
        <SliderSection title={popularMoviesLabel} speed={450}>
          <DynamicPosterList
            mediaType={"movie"}
            enabled={false}
            api={"popularMovies"}
            queryKey={["popularMovies", locale]}
            fallbackMessage={"There are not popular movies."}
          />
        </SliderSection>
        <SliderSection title={popularTvLabel} speed={450}>
          <DynamicPosterList
            mediaType={"tv"}
            enabled={false}
            api={"popularTv"}
            queryKey={["popularTv", locale]}
            fallbackMessage={"There are not popular tv shows."}
          />
        </SliderSection>
      </div>
      <GenreSection />
    </div>
  );
}

const genresLimit = 9;

function GenreSection() {
  const t = useTranslations("home");
  const locale = useLocale();
  const [genres, setGenres] = useState<typeof MovieGenres>([]);
  const [theme] = useTheme();
  const langPrefix = useLang();
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

  const noMovies = t("noMovies");

  return (
    <div>
      {genres.map((g, i) => {
        return (
          <div
            key={`genre-section-${g.id}`}
            data-theme={i % 3 == 0 ? "dark" : theme}
          >
            <Section
              title={g.name}
              titleAsLink={true}
              url={`/${langPrefix}/discover?media=movie&genre=${g.id}`}
            >
              <Slider speed={450}>
                <DynamicPosterList
                  mediaType={"movie"}
                  api={`discoverMovies`}
                  parameters={{
                    genre: g.id,
                  }}
                  isBackdrop={i % 3 == 0}
                  queryKey={[
                    "discoverMovies",
                    "movie",
                    g.id.toString(),
                    locale,
                  ]}
                  fallbackMessage={noMovies}
                />
              </Slider>
            </Section>
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
