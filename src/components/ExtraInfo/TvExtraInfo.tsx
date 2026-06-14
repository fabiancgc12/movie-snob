"use client";

import { TvShowInterface } from "@/models/tv/TvShow.interface";
import { ExtraInfo } from "./ExtraInfo";
import { Providers } from "@/components/ExtraInfo/Providers";
import { ProvidersDto } from "@/models/dto/ProvidersDto";
import { CompanyLogo } from "@/components/ExtraInfo/CompanyLogo";
import { FullDate } from "@/components/common/FullDate";
import React from "react";
import { Info, Languages } from "lucide-react";
import { useTranslations } from "next-intl";

type props = {
  show: TvShowInterface;
  providers: ProvidersDto;
};

export function TvExtraInfo({ show, providers }: props) {
  const t = useTranslations("movieortv");
  const releaseDateLabel = t("releaseDate");
  const languageLabel = t("language");
  const networksLabel = t("networks");
  const statusLabel = t("status");
  const lastAirDateLabel = t("lastAirDate");

  return (
    <ExtraInfo>
      <div>
        <p className="capitalize text-sm">{releaseDateLabel}</p>
        <FullDate date={show.first_air_date} />
      </div>
      <div>
        <p className="capitalize text-sm">{lastAirDateLabel}</p>
        <FullDate date={show.last_air_date} />
      </div>
      <div>
        <p className="capitalize text-sm">{statusLabel}</p>
        <small className="flex items-center gap-1.5">
          <Info />
          {show.status}
        </small>
      </div>
      <div>
        <p className="capitalize text-sm">{languageLabel}</p>
        <small className="flex items-center gap-1.5">
          <Languages />
          {show.spoken_languages
            ?.slice(0, 4)
            .map((sp) => sp.english_name)
            ?.join(", ")}
        </small>
      </div>
      <div>
        <p className="capitalize text-sm">{networksLabel}</p>
        <div className="flex flex-row flex-wrap items-center gap-[5px_2.5%]">
          {show.networks?.map((network) => (
            <CompanyLogo
              key={`${network.name} logo`}
              name={network.name}
              logo_path={network.logo_path}
            />
          ))}
        </div>
      </div>
      <Providers providers={providers} />
    </ExtraInfo>
  );
}
