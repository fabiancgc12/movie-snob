"use client";

import { Section } from "@/components/Section/Section";
import { PosterList } from "@/components/poster/oldInfinitePosterListProps";
import { useEffect, useState } from "react";
import {
  ProductStore,
  StoreProductType,
} from "@/components/common/ActionButton/useCheckedButton";
import { PosterGrid } from "@/components/poster/PosterGrid";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { likedStoreKey } from "@/components/common/ActionButton/LikeButton";
import { useTranslations } from "next-intl";
import { useTheme } from "@/global/ThemeContext";
import { defaultPosters } from "@/app/[lang]/_components/defaultPosters";

export default function LikedPage() {
  const [movies, setMovies] = useState<StoreProductType[]>([]);
  const [tv, setTv] = useState<StoreProductType[]>([]);
  const [ready, setReady] = useState(false);
  const t = useTranslations("likedorbookmark");
  const [theme] = useTheme();

  useEffect(() => {
    const store = localStorage.getItem(likedStoreKey);
    if (store) {
      const parsedStore = JSON.parse(store) as ProductStore;
      setMovies(Object.values(parsedStore.movie));
      setTv(Object.values(parsedStore.tv));
    }
    setReady(true);
  }, []);

  const title = t("likedTitle");
  const movieFallback = t("fallbackMovieMessage");
  const tvFallback = t("fallbackTvMessage");

  return (
    <div data-theme={theme} className={"h-full"}>
      <Section title={title}>
        <Tabs defaultValue="movie">
          <TabsList>
            <TabsTrigger value="movie">Movie</TabsTrigger>
            <TabsTrigger value="tv">Tv</TabsTrigger>
          </TabsList>
          <TabsContent value="movie">
            {ready ? (
              <PosterGrid>
                <PosterList
                  media={movies}
                  mediaType={"movie"}
                  fallbackMessage={movieFallback}
                />
              </PosterGrid>
            ) : (
              <PosterGrid>{defaultPosters}</PosterGrid>
            )}
          </TabsContent>
          <TabsContent value="tv">
            {ready ? (
              <PosterGrid>
                <PosterList
                  media={tv}
                  mediaType={"tv"}
                  fallbackMessage={tvFallback}
                />
              </PosterGrid>
            ) : (
              <PosterGrid>{defaultPosters}</PosterGrid>
            )}
          </TabsContent>
        </Tabs>
      </Section>
    </div>
  );
}
