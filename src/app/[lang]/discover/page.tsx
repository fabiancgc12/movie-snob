"use client";

import { PosterGrid } from "@/components/poster/PosterGrid";
import { Section } from "@/components/Section/Section";
import { InfinitePosterList } from "@/components/poster/infinitePosterListProps";
import { useRouter, useSearchParams } from "next/navigation";
import { MediaType } from "@/models/MediaType";
import { ChangeEvent, useCallback } from "react";
import {
  MovieGenres,
  MovieGenresSpanish,
  TvGenres,
  TvGenresSpanish,
} from "@/utils/movieGenres";

import { useTranslations, useLocale } from "next-intl";
import { useTheme } from "@/global/ThemeContext";

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

  const handleMediaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as MediaType;
    let genres = value == "movie" ? MovieGenres : TvGenres;
    if (genres.findIndex((g) => g.id.toString() == genre) < 0) {
      router.replace(
        `?${createQueryString("media", value)}&${createQueryString("genre", "")}`,
      );
    } else {
      router.replace(`?${createQueryString("media", value)}`);
    }
  };

  const handleGenreChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    router.replace(`?${createQueryString("genre", value)}`);
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
      <form className="flex gap-5 items-center p-4 m-0 [&>*]:w-full [&>*]:p-1 [&>*]:m-0 md:[&>*]:w-1/4">
        <select value={media} onChange={handleMediaChange} name={"media"}>
          <option value={"movie"}>{commonT("mediaMovie")}</option>
          <option value={"tv"}>{commonT("mediaTv")}</option>
        </select>
        <select value={genre} onChange={handleGenreChange} name={"genre"}>
          <option value={""}>{t("allOption")}</option>
          {genres.map((g) => (
            <option value={g.id} key={`${media}-genre-${g.id}`}>
              {g.name}
            </option>
          ))}
        </select>
      </form>
      <div data-theme={theme} className={"h-full"}>
        <Section title={t("discoverPageTitle")}>
          <PosterGrid>
            <InfinitePosterList
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
