"use client";

import { formatCurrency } from "@/utils/functions/formatCurrency";
import { MovieType } from "@/models/Movies/MovieType";
import { DetailInfo, DetailInfoItem } from "./DetailInfo";
import { MediaDetailsProviders } from "./MediaDetailsProviders";
import { ProvidersDto } from "@/models/dto/ProvidersDto";
import { CompanyLogo } from "@/components/ExtraInfo/CompanyLogo";
import { Calendar, DollarSign, Languages, Building2 } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { formatDate } from "@/utils/functions/formatDate";

type props = {
  movie: MovieType;
  providers: ProvidersDto;
};

export function MovieExtraInfo({ movie, providers }: props) {
  const t = useTranslations("movieortv");
  const locale = useLocale();
  return (
    <DetailInfo>
      <DetailInfoItem title={t("releaseDate")} icon={Calendar}>
        {formatDate(movie.release_date, locale)}
      </DetailInfoItem>
      <DetailInfoItem title={t("language")} icon={Languages}>
        {movie.spoken_languages
          ?.slice(0, 4)
          .map((sp) => sp.english_name)
          ?.join(", ")}
      </DetailInfoItem>
      <DetailInfoItem title={t("budget")} icon={DollarSign}>
        {formatCurrency.format(movie.budget)}
      </DetailInfoItem>
      <DetailInfoItem title={t("production")} icon={Building2} fullWidth={true}>
        <div className="flex flex-row flex-wrap items-center gap-[5px_2.5%] mt-1">
          {movie.production_companies?.map((company) => (
            <CompanyLogo
              key={`${company.name} logo`}
              name={company.name}
              logo_path={company.logo_path}
            />
          ))}
        </div>
      </DetailInfoItem>
      <MediaDetailsProviders providers={providers} />
    </DetailInfo>
  );
}
