"use client";

import { SeasonsEntity } from "@/models/tv/TvShow.interface";
import { Section } from "@/components/Section/Section";
import Image from "next/image";
import { generateImageUrl } from "@/utils/functions/generateImageUrl";
import React, { ChangeEvent, useEffect, useState } from "react";
import { formatYearDate } from "@/utils/functions/formatYearDate";
import { useTranslations } from "next-intl";

type props = {
  seasons?: SeasonsEntity[] | null;
};

export function SeasonsList({ seasons }: props) {
  const t = useTranslations("movieortv");
  const [selectedId, setSelectedId] = useState(seasons?.at(-1)?.id ?? 0);
  useEffect(() => {
    setSelectedId(seasons?.at(-1)?.id ?? 0);
  }, [seasons]);
  if (!seasons || seasons.length == 0) return null;
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedId(Number(e.target.value));
  };
  const selectedSeason = seasons.find((s) => s.id == selectedId);
  if (!selectedSeason) return null;
  return (
    <Section title={t("seasonsLabel")}>
      <select
        className="w-[40%] max-w-[300px]"
        value={selectedId}
        onChange={onChange}
      >
        {seasons.map((s) => (
          <option value={s.id} key={`season-${s.id}`}>
            {s.name}
          </option>
        ))}
      </select>
      <Season season={selectedSeason} />
    </Section>
  );
}

type seasonComponentProp = {
  season: SeasonsEntity;
};
function Season({ season }: seasonComponentProp) {
  const t = useTranslations("movieortv");
  const airedOnLabel = t("airedOnLabel");
  const notAnnouncedLabel = t("notAnnounced");
  const episodesLabel = t("episodes");
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
        <h6 className="pt-1">{season.name}</h6>
        <p>
          <small className="font-light">
            {airedOnLabel}:{" "}
            {season.air_date
              ? formatYearDate(season.air_date)
              : notAnnouncedLabel}
          </small>
          {season.episode_count && (
            <small className="font-light pb-1">
              {" "}
              | {season.episode_count} {episodesLabel}
            </small>
          )}
        </p>
        <p className="text-justify">
          <small>{season.overview}</small>
        </p>
      </div>
    </div>
  );
}
