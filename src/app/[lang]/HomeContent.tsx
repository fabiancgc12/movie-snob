"use client";

import { useInView } from "react-intersection-observer";
import { Spinner } from "@/components/common/Spinner";
import {
  ComponentProps,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { MovieGenres, MovieGenresSpanish } from "@/utils/movieGenres";
import { useLocale } from "next-intl";
import { useTheme } from "@/global/ThemeContext";
import { Carousel } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { InfiniteDiscoverMoviesPosterListSection } from "@/features/genres/components/InfiniteDiscoverMoviesPosterListSection";

const carouselOptions: ComponentProps<typeof Carousel>["opts"] = {
  loop: true,
};

type HomePageCarouselProps = PropsWithChildren;

export const HomePageCarousel = ({ children }: HomePageCarouselProps) => {
  const plugin = useRef([Autoplay({ delay: 8000, stopOnInteraction: true })]);
  return (
    <Carousel opts={carouselOptions} plugins={plugin.current}>
      {children}
    </Carousel>
  );
};

const genresLimit = 9;

export const HomePageGenreSection = () => {
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
};
