"use client";

import { Section } from "@/components/Section/Section";
import { PosterGrid } from "@/components/poster/PosterGrid";
import { OldInfinitePosterList } from "@/components/poster/oldInfinitePosterListProps";
import { useTranslations, useLocale } from "next-intl";
import { useTheme } from "@/global/ThemeContext";
import { useSearchParams } from "next/navigation";

export default function FindPage() {
  const t = useTranslations("common");
  const locale = useLocale();
  const [theme] = useTheme();
  const searchParams = useSearchParams();
  const title = searchParams.get("title") ?? undefined;

  return (
    <div data-theme={theme} className={"h-full"}>
      <Section title={t("find")}>
        <PosterGrid>
          <OldInfinitePosterList
            mediaType={"movie"}
            api={"search"}
            queryKey={["search", title, locale]}
            parameters={{ title }}
            enabled={!!title}
            fallbackMessage={t("notFoundMovieOrTvMessage")}
          />
        </PosterGrid>
      </Section>
    </div>
  );
}
