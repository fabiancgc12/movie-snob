import {TvShowInterface} from "@/models/tv/TvShow.interface";
import styles from "@/components/ExtraInfo/ExtraInfo.module.css";
import { ExtraInfo } from "./ExtraInfo";
import {Providers} from "@/components/ExtraInfo/Providers";
import {ProvidersDto} from "@/models/dto/ProvidersDto";
import {CompanyLogo} from "@/components/ExtraInfo/CompanyLogo";
import {FullDate} from "@/components/common/FullDate";
import React from "react";
import {SiStatuspal} from "react-icons/si";
import { MdLanguage } from "react-icons/md";
import useTranslation from "next-translate/useTranslation";

type props = {
    show:TvShowInterface,
    providers:ProvidersDto
}

export function TvExtraInfo({show,providers}:props){
    const {t} = useTranslation("movieortv")
    const releaseDateLabel = t("releaseDate")
    const languageLabel = t("language")
    const networksLabel = t("networks")
    const statusLabel = t("status")
    const lastAirDateLabel = t("lastAirDate")

    return (
        <ExtraInfo>
            <div className={styles.info}>
                <p>{releaseDateLabel}</p>
                <FullDate date={show.first_air_date}/>
            </div>
            <div className={styles.info}>
                <p>{lastAirDateLabel}</p>
                <FullDate date={show.last_air_date}/>
            </div>
            <div>
                <p>{statusLabel}</p>
                <small className={"alignCenter"}><SiStatuspal/>{show.status}</small>
            </div>
            <div className={styles.info}>
                <p>{languageLabel}</p>
                <small className={"alignCenter"}><MdLanguage/>{show.spoken_languages?.slice(0,4).map(sp => sp.english_name)?.join(", ")}</small>
            </div>
            <div>
                <p>{networksLabel}</p>
                <div className={styles.logos}>
                    {show.networks?.map(network => <CompanyLogo
                        key={`${network.name} logo`}
                        name={network.name}
                        logo_path={network.logo_path}
                    />)}
                </div>
            </div>
            <Providers providers={providers}/>
        </ExtraInfo>
    )
}