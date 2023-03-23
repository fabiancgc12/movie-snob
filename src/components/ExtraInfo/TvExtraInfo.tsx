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

type props = {
    show:TvShowInterface,
    providers:ProvidersDto
}

export function TvExtraInfo({show,providers}:props){
    return (
        <ExtraInfo>
            <div className={styles.info}>
                <p>Release Date</p>
                <FullDate date={show.first_air_date}/>
            </div>
            <div className={styles.info}>
                <p>Last air Date</p>
                <FullDate date={show.last_air_date}/>
            </div>
            <div>
                <p>Status</p>
                <small className={"alignCenter"}><SiStatuspal/>{show.status}</small>
            </div>
            <div className={styles.info}>
                <p>original language</p>
                <small className={"alignCenter"}><MdLanguage/>{show.spoken_languages?.slice(0,4).map(sp => sp.english_name)?.join(", ")}</small>
            </div>
            <div>
                <p>Networks</p>
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