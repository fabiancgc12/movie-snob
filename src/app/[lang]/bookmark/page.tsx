"use client";

import { Section } from "@/components/Section/Section";
import { PosterList } from "@/components/poster/infinitePosterListProps";
import { useEffect, useState } from "react";
import {
  ProductStore,
  StoreProductType,
} from "@/components/common/ActionButton/useCheckedButton";
import { bookmarkStoreKey } from "@/components/common/ActionButton/chechMarkButton";
import { PosterGrid } from "@/components/poster/PosterGrid";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useTranslations } from "next-intl";
import { useTheme } from "@/global/ThemeContext";
import { defaultPosters } from "@/app/[lang]/_components/defaultPosters";

export default function BookMarkPage() {
  const [movies, setMovies] = useState<StoreProductType[]>([]);
  const [tv, setTv] = useState<StoreProductType[]>([]);
  const [ready, setReady] = useState(false);
  const t = useTranslations("likedorbookmark");
  const commonT = useTranslations("common");
  const [theme] = useTheme();
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
    <div data-theme={theme} className={"h-full"}>
      <Section title={t("bookmarkTitle")}>
        <Tabs>
          <TabList>
            <Tab>{commonT("mediaMovie")}</Tab>
            <Tab>{commonT("mediaTv")}</Tab>
          </TabList>
          <TabPanel>
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
          </TabPanel>
          <TabPanel>
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
          </TabPanel>
        </Tabs>
      </Section>
    </div>
  );
}
