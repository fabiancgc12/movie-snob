"use client";

import { formatCurrency } from "@/utils/functions/formatCurrency";
import { MovieType } from "@/models/Movies/MovieType";
import { ExtraInfo } from "./ExtraInfo";
import { Providers } from "./Providers";
import { ProvidersDto } from "@/models/dto/ProvidersDto";
import { CompanyLogo } from "@/components/ExtraInfo/CompanyLogo";
import { FullDate } from "@/components/common/FullDate";
import { Languages } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

type props = {
  movie: MovieType;
  providers: ProvidersDto;
};

export function MovieExtraInfo({ movie, providers }: props) {
  const t = useTranslations("movieortv");
  const locale = useLocale();
  const releaseDateLabel = t("releaseDate");
  const languageLabel = t("language");
  const budgetLabel = t("budget");
  const productionLabel = t("production");
  return (
    <ExtraInfo>
      <div className="text">
        <p className="capitalize text-sm">{releaseDateLabel}</p>
        <FullDate date={movie.release_date} lang={locale} />
      </div>
      <div className="text">
        <p className="capitalize text-sm">{languageLabel}</p>
        <small className="flex items-center gap-1.5">
          <Languages />
          {movie.spoken_languages
            ?.slice(0, 4)
            .map((sp) => sp.english_name)
            ?.join(", ")}
        </small>
      </div>
      <div className="text">
        <p className="capitalize text-sm">{budgetLabel}</p>
        <small>{formatCurrency.format(movie.budget)}</small>
      </div>
      <div className="text">
        <p className="capitalize text-sm">{productionLabel}</p>
        <div className="flex flex-row flex-wrap items-center gap-[5px_2.5%]">
          {movie.production_companies?.map((company) => (
            <CompanyLogo
              key={`${company.name} logo`}
              name={company.name}
              logo_path={company.logo_path}
            />
          ))}
        </div>
      </div>
      <Providers providers={providers} />
    </ExtraInfo>
  );
}
