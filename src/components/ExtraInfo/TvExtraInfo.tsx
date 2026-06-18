"use client";

import { TvShowType } from "@/models/tv/TvShow.type";
import { DetailInfo, DetailInfoItem } from "./DetailInfo";
import { MediaDetailsProviders } from "@/components/ExtraInfo/MediaDetailsProviders";
import { ProvidersDto } from "@/models/dto/ProvidersDto";
import { CompanyLogo } from "@/components/ExtraInfo/CompanyLogo";
import { FullDate } from "@/components/common/FullDate";
import React from "react";
import { Calendar, Info, Languages, TvIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/functions/formatDate";

type props = {
  show: TvShowType;
  providers: ProvidersDto;
};

export function TvExtraInfo({ show, providers }: props) {
  const t = useTranslations("movieortv");
  const locale = useLocale();
  return (
    <DetailInfo>
      <DetailInfoItem title={t("releaseDate")} icon={Calendar}>
        {formatDate(show.first_air_date, locale)}
      </DetailInfoItem>
      <DetailInfoItem title={t("lastAirDate")} icon={Calendar}>
        {formatDate(show.last_air_date, locale)}
      </DetailInfoItem>
      <DetailInfoItem title={t("status")} icon={Info}>
        {show.status}
      </DetailInfoItem>
      <DetailInfoItem title={t("language")} icon={Languages}>
        {show.spoken_languages
          ?.slice(0, 4)
          .map((sp) => sp.english_name)
          ?.join(", ")}
      </DetailInfoItem>
      <DetailInfoItem title={t("networks")} icon={TvIcon} fullWidth={true}>
        <div className="flex flex-row flex-wrap items-center gap-[5px_2.5%] mt-1">
          {show.networks?.map((network) => (
            <CompanyLogo
              key={`${network.name} logo`}
              name={network.name}
              logo_path={network.logo_path}
            />
          ))}
        </div>
      </DetailInfoItem>
      <MediaDetailsProviders providers={providers} />
    </DetailInfo>
  );
}
