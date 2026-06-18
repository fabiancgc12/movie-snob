"use client";

import { Section } from "@/components/Section/Section";
import { useEffect, useState } from "react";
import {
  ProductStore,
  StoreProductType,
} from "@/components/common/ActionButton/useCheckedButton";
import { bookmarkStoreKey } from "@/components/common/ActionButton/chechMarkButton";
import { PosterGrid } from "@/components/poster/PosterGrid";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import { defaultPosters } from "@/app/[lang]/_components/defaultPosters";
import { PosterList } from "@/components/poster/posterList";

export default function BookMarkPage() {
  const [movies, setMovies] = useState<StoreProductType[]>([]);
  const [tv, setTv] = useState<StoreProductType[]>([]);
  const [ready, setReady] = useState(false);
  const t = useTranslations("likedorbookmark");
  const commonT = useTranslations("common");
  useEffect(() => {
    const store = localStorage.getItem(bookmarkStoreKey);
    if (store) {
      const parsedStore = JSON.parse(store) as ProductStore;
      setMovies(Object.values(parsedStore.movie));
      setTv(Object.values(parsedStore.tv));
    }
    setReady(true);
  }, []);

  return (
    <div className={"h-full"}>
      <Section title={t("bookmarkTitle")} className={"space-y-4"}>
        <Tabs defaultValue="movie">
          <TabsList>
            <TabsTrigger value="movie">{commonT("mediaMovie")}</TabsTrigger>
            <TabsTrigger value="tv">{commonT("mediaTv")}</TabsTrigger>
          </TabsList>
          <TabsContent value="movie">
            {ready ? (
              <PosterGrid>
                <PosterList
                  media={movies}
                  mediaType={"movie"}
                  fallbackMessage={t("fallbackMovieMessage")}
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
                  fallbackMessage={t("fallbackTvMessage")}
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
