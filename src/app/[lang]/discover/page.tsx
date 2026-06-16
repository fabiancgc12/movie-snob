"use client";

import { PosterGrid } from "@/components/poster/PosterGrid";
import { Section } from "@/components/Section/Section";
import { OldInfinitePosterList } from "@/components/poster/oldInfinitePosterListProps";
import { useSearchParams } from "next/navigation";
import { MediaType } from "@/models/MediaType";
import { useState } from "react";
import {
  MovieGenres,
  MovieGenresSpanish,
  TvGenres,
  TvGenresSpanish,
} from "@/utils/movieGenres";

import { useTranslations, useLocale } from "next-intl";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MovieGenresType } from "@/features/movieGenres/schemas/MovieGenresSchema";

export default function DiscoverPage() {
  const searchParams = useSearchParams();
  const commonT = useTranslations("common");
  const t = useTranslations("discover");
  const locale = useLocale();

  const [media, setMedia] = useState<MediaType>(
    (searchParams.get("media") as MediaType) ?? "movies"
  );
  const [genre, setGenre] = useState(searchParams.get("genre") ?? "");

  const updateUrlParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(updates)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  const handleMediaChange = (value: string | null) => {
    if (!value) return;
    const newMedia = value as MediaType;
    let genres = newMedia == "movie" ? MovieGenres : TvGenres;
    const genreIndex = genres.findIndex((g) => g.id.toString() == genre);
    setMedia(newMedia);
    const newGenre = genreIndex < 0 ? "" : genre;
    setGenre(newGenre);
    updateUrlParams({ media: newMedia, genre: newGenre });
  };
  const handleGenreChange = (value: string | null) => {
    const newGenre = value ?? "";
    setGenre(newGenre);
    updateUrlParams({ genre: newGenre });
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
    <div className={"p-4"}>
      <Tabs value={media} onValueChange={handleMediaChange}>
        <Section title={t("discoverPageTitle")} className={"space-y-4"}>
          <div className={"flex gap-5 items-center"}>
            <TabsList>
              <TabsTrigger value={"movies"}>
                {commonT("mediaMovie")}
              </TabsTrigger>
              <TabsTrigger value={"tv"}>{commonT("mediaTv")}</TabsTrigger>
            </TabsList>
            <GenresSelect
              genres={genres}
              value={genre}
              onValueChange={handleGenreChange}
            />
          </div>

          <TabsContent value={"movies"} className={"h-full"}>
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
          </TabsContent>
          <TabsContent value={"tv"} className={"h-full"}>
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
          </TabsContent>
        </Section>
      </Tabs>
    </div>
  );
}

type GenresSelectProps = {
  value: string;
  onValueChange: (val: string | null) => void;
  genres: MovieGenresType[];
};

const GenresSelect = ({ value, onValueChange, genres }: GenresSelectProps) => {
  const t = useTranslations("discover");
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full md:w-1/4">
        <SelectValue placeholder={t("allOption")}>
          {genres
            ? genres.find((g) => g.id.toString() == value)?.name
            : t("allOption")}
        </SelectValue>
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false}>
        <SelectItem value="">{t("allOption")}</SelectItem>
        {genres.map((g) => (
          <SelectItem value={g.id.toString()} key={g.id}>
            {g.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
