"use client"

import styles from "@/components/ExtraInfo/ExtraInfo.module.css";
import {ProvidersDto} from "@/models/dto/ProvidersDto";
import {CompanyLogo} from "@/components/ExtraInfo/CompanyLogo";
import {useTranslations} from "next-intl";

type props = {
    providers:ProvidersDto
}

export function Providers({providers}:props){
    const t = useTranslations("movieortv");
    const availableLabel = t("availableOn")
    const notAvailableMessage = t("notAvailableMessage")
    return (
        <div className={`${styles.info} text`}>
            <p>{availableLabel}</p>
            <div className={styles.logos}>
                {providers.results.US.flatrate && providers.results.US.flatrate.length > 0
                    ? providers.results.US.flatrate?.map(st => <CompanyLogo
                        key={`${st.provider_name} logo`}
                        name={st.provider_name}
                        logo_path={st.logo_path}
                    />)
                    : <div><small>{notAvailableMessage}</small></div>}
                <small>{t.rich("justWatchMessage", {a: (chunks) => <a href="https://www.justwatch.com/">{chunks}</a>})}</small>
            </div>
        </div>
    )
}