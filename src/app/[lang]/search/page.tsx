"use client";

import { Section } from "@/components/Section/Section";
import { PosterGrid } from "@/components/poster/PosterGrid";
import { OldInfinitePosterList } from "@/components/poster/oldInfinitePosterListProps";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { SearchMediaInfiniteGrid } from "@/features/search/components/SearchMediaInfiniteGrid";

export default function FindPage() {
  const t = useTranslations("common");
  const searchParams = useSearchParams();
  const title = searchParams.get("title") ?? undefined;

  return (
    <div className={"h-full"}>
      <Section title={t("find")}>
        <PosterGrid>
          <SearchMediaInfiniteGrid title={title} />
        </PosterGrid>
      </Section>
    </div>
  );
}
