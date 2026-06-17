"use client";

import { PosterGrid } from "@/components/poster/PosterGrid";
import { Section } from "@/components/Section/Section";
import { MediaType } from "@/models/MediaType";
import { useState } from "react";
import { MovieGenres, TvGenres } from "@/utils/movieGenres";

import { useTranslations } from "next-intl";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MovieGenresType } from "@/features/movieGenres/schemas/MovieGenresSchema";
import { DiscoverTvShowsInfiniteGrid } from "@/features/discover/components/DiscoverTvShowsInfiniteGrid";
import { DiscoverMoviesInfiniteGrid } from "@/features/discover/components/DiscoverMoviesInfiniteGrid";

type Props = {
  initialMedia: MediaType;
  initialGenre: string;
  movieGenres: { id: number; name: string }[];
  tvGenres: { id: number; name: string }[];
};

export function DiscoverContent({
  initialMedia,
  initialGenre,
  movieGenres,
  tvGenres,
}: Props) {
  const commonT = useTranslations("common");
  const t = useTranslations("discover");

  const [media, setMedia] = useState<MediaType>(initialMedia);
  const [genre, setGenre] = useState(initialGenre);

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

  const genres = media == "tv" ? tvGenres : movieGenres;
  return (
    <Tabs value={media} onValueChange={handleMediaChange}>
      <Section title={t("discoverPageTitle")} className={"space-y-4"}>
        <div className={"flex gap-5 items-center"}>
          <TabsList>
            <TabsTrigger value={"movie"}>{commonT("mediaMovie")}</TabsTrigger>
            <TabsTrigger value={"tv"}>{commonT("mediaTv")}</TabsTrigger>
          </TabsList>
          <GenresSelect
            genres={genres}
            value={genre}
            onValueChange={handleGenreChange}
          />
        </div>

        <TabsContent value={"movie"} className={"h-full"}>
          <PosterGrid>
            <DiscoverMoviesInfiniteGrid genre={genre} />
          </PosterGrid>
        </TabsContent>
        <TabsContent value={"tv"} className={"h-full"}>
          <PosterGrid>
            <DiscoverTvShowsInfiniteGrid genre={genre} />
          </PosterGrid>
        </TabsContent>
      </Section>
    </Tabs>
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
