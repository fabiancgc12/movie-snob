"use client";

import { ProvidersDto } from "@/models/dto/ProvidersDto";
import { CompanyLogo } from "@/components/ExtraInfo/CompanyLogo";
import { useTranslations } from "next-intl";

type props = {
  providers: ProvidersDto;
};

export function Providers({ providers }: props) {
  const t = useTranslations("movieortv");
  const availableLabel = t("availableOn");
  const notAvailableMessage = t("notAvailableMessage");
  return (
    <div className="text">
      <p className="capitalize text-sm">{availableLabel}</p>
      <div className="flex flex-row flex-wrap items-center gap-[5px_2.5%]">
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
          <div>
            <small>{notAvailableMessage}</small>
          </div>
        )}
        <small>
          {t.rich("justWatchMessage", {
            a: (chunks) => <a href="https://www.justwatch.com/">{chunks}</a>,
          })}
        </small>
      </div>
    </div>
  );
}
