import {TvShowInterface} from "@/models/tv/TvShow.interface";
import styles from "@/components/ExtraInfo/ExtraInfo.module.css";
import {formatDate} from "@/utils/functions/formatDate";
import { ExtraInfo } from "./ExtraInfo";
import {Providers} from "@/components/ExtraInfo/Providers";
import {ProvidersDto} from "@/models/dto/ProvidersDto";
import {CompanyLogo} from "@/components/ExtraInfo/CompanyLogo";

type props = {
    show:TvShowInterface,
    providers:ProvidersDto
}

export function TvExtraInfo({show,providers}:props){
    return (
        <ExtraInfo>
            <div className={styles.info}>
                <p>Release Date</p>
                <small>{formatDate(show.first_air_date)}</small>
            </div>
            <div className={styles.info}>
                <p>Last air Date</p>
                <small>{formatDate(show.last_air_date)}</small>
            </div>
            <div>
                <p>Status</p>
                <small>{show.status}</small>
            </div>
            <div className={styles.info}>
                <p>original language</p>
                <small>{show.spoken_languages?.map(sp => sp.english_name)?.join(",")}</small>
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