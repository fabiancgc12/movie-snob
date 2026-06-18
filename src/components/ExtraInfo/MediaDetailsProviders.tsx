"use client";

import { ProvidersDto } from "@/models/dto/ProvidersDto";
import { CompanyLogo } from "@/components/ExtraInfo/CompanyLogo";
import { useTranslations } from "next-intl";
import { DetailInfoItem } from "@/components/ExtraInfo/DetailInfo";
import { Building2Icon, TvMinimalPlayIcon } from "lucide-react";

type props = {
  providers: ProvidersDto;
};

export const MediaDetailsProviders = ({ providers }: props) => {
  const t = useTranslations("movieortv");
  return (
    <DetailInfoItem icon={TvMinimalPlayIcon} title={t("availableOn")}>
      <div className="flex flex-row flex-wrap items-center gap-[5px_2.5%] mt-1">
        {providers.results.US?.flatrate &&
        providers.results.US.flatrate.length > 0 ? (
          providers.results.US.flatrate.map((st) => (
            <CompanyLogo
              key={`${st.provider_name} logo`}
              name={st.provider_name}
              logo_path={st.logo_path}
            />
          ))
        ) : (
          <p className={"text-[13px]"}>{t("notAvailableMessage")}</p>
        )}
        <p className={"text-sm text-muted-foreground"}>
          {t.rich("justWatchMessage", {
            a: (chunks) => <a href="https://www.justwatch.com/">{chunks}</a>,
          })}
        </p>
      </div>
    </DetailInfoItem>
  );
};
