"use client";

import { PosterGrid } from "@/components/poster/PosterGrid";
import { Section } from "@/components/Section/Section";
import { OldInfinitePosterList } from "@/components/poster/oldInfinitePosterListProps";
import { useRouter, useSearchParams } from "next/navigation";
import { MediaType } from "@/models/MediaType";
import { useCallback } from "react";
import {
  MovieGenres,
  MovieGenresSpanish,
  TvGenres,
  TvGenresSpanish,
} from "@/utils/movieGenres";

import { useTranslations, useLocale } from "next-intl";
import { useTheme } from "@/global/ThemeContext";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function DiscoverPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const commonT = useTranslations("common");
  const t = useTranslations("discover");
  const locale = useLocale();
  const [theme] = useTheme();

  const media = (searchParams.get("media") as MediaType) ?? "movie";
  const genre = searchParams.get("genre") ?? "";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams],
  );

  const handleMediaChange = (value: string | null) => {
    if (!value) return;
    const newMedia = value as MediaType;
    let genres = newMedia == "movie" ? MovieGenres : TvGenres;
    if (genres.findIndex((g) => g.id.toString() == genre) < 0) {
      router.replace(
        `?${createQueryString("media", newMedia)}&${createQueryString("genre", "")}`,
      );
    } else {
      router.replace(`?${createQueryString("media", newMedia)}`);
    }
  };

  const handleGenreChange = (value: string | null) => {
    router.replace(`?${createQueryString("genre", value ?? "")}`);
  };

  let apiRoute = "discoverMovies";
  let genres = locale == "es" ? MovieGenresSpanish : MovieGenres;
  let fallbackMessage = t("movieFallback");
  if (media == "tv") {
    apiRoute = "discoverTv";
    genres = locale == "es" ? TvGenresSpanish : TvGenres;
    fallbackMessage = t("tvFallback");
  }
  return (
    <>
      <div className="flex gap-5 items-center p-4 m-0">
        <Select value={media} onValueChange={handleMediaChange}>
          <SelectTrigger className="w-full md:w-1/4">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="movie">{commonT("mediaMovie")}</SelectItem>
            <SelectItem value="tv">{commonT("mediaTv")}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={genre} onValueChange={handleGenreChange}>
          <SelectTrigger className="w-full md:w-1/4">
            <SelectValue placeholder={t("allOption")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">{t("allOption")}</SelectItem>
            {genres.map((g) => (
              <SelectItem value={g.id.toString()} key={`${media}-genre-${g.id}`}>
                {g.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div data-theme={theme} className={"h-full"}>
        <Section title={t("discoverPageTitle")}>
          <PosterGrid>
            <OldInfinitePosterList
              mediaType={media}
              api={apiRoute}
              queryKey={[apiRoute, media, genre, locale]}
              parameters={{ media: media, genre: genre }}
              enabled={true}
              fallbackMessage={fallbackMessage}
            />
          </PosterGrid>
        </Section>
      </div>
    </>
  );
}
