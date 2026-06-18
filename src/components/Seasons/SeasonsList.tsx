"use client";

import { SeasonsEntity } from "@/models/tv/TvShow.type";
import { Section } from "@/components/Section/Section";
import Image from "next/image";
import { generateImageUrl } from "@/utils/functions/generateImageUrl";
import React, { useEffect, useState } from "react";
import { formatYearDate } from "@/utils/functions/formatYearDate";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

type props = {
  seasons?: SeasonsEntity[] | null;
};

export function SeasonsList({ seasons }: props) {
  const t = useTranslations("movieortv");
  const [selectedId, setSelectedId] = useState<number | null>(
    seasons?.at(-1)?.id ?? 0,
  );
  useEffect(() => {
    setSelectedId(seasons?.at(-1)?.id ?? 0);
  }, [seasons]);
  if (!seasons || seasons.length == 0) return null;
  const onChange = (value: number | null) => {
    setSelectedId(value);
  };
  const selectedSeason = seasons.find((s) => s.id == selectedId);
  if (!selectedSeason) return null;
  return (
    <Section
      title={t("seasonsLabel")}
      className="border-t border-input pt-4"
      header={
        <Select value={selectedId} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue>
              {seasons.find((s) => s.id == selectedId)?.name}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {seasons.map((s) => (
              <SelectItem value={s.id} key={s.id}>
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      }
    >
      <Season season={selectedSeason} />
    </Section>
  );
}

type seasonComponentProp = {
  season: SeasonsEntity;
};
function Season({ season }: seasonComponentProp) {
  const t = useTranslations("movieortv");
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-2.5 pr-2">
      <div className="relative w-[125px] aspect-[1/1.5]">
        <Image
          src={generateImageUrl(season.poster_path)}
          alt={`${season.name} poster`}
          fill
          className="rounded"
        />
      </div>
      <div>
        <h4 className="font-bold text-lg">{season.name}</h4>
        <p className="font-light text-sm mb-3">
          <span>
            {t("airedOnLabel")}:{" "}
            {season.air_date
              ? formatYearDate(season.air_date)
              : t("notAnnounced")}
          </span>
          {season.episode_count && (
            <span>
              {" "}
              | {season.episode_count} {t("episodes")}
            </span>
          )}
        </p>
        <p className="text-justify text-base text-muted-foreground">
          {season.overview}
        </p>
      </div>
    </div>
  );
}
