import {TvShowInterface} from "@/utils/models/tv/TvShow.interface";
import {ProvidersResponseInterface} from "@/utils/models/Movies/Providers.interface";
import styles from "@/components/ExtraInfo/ExtraInfo.module.css";
import {formatDate} from "@/utils/functions/formatDate";
import Image from "next/image";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";
import { ExtraInfo } from "./ExtraInfo";
import {Providers} from "@/components/ExtraInfo/Providers";

type props = {
    show:TvShowInterface,
    providers:ProvidersResponseInterface
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
                    {show.networks?.map(network => <Image
                        key={`${network.name} logo`}
                        src={generateImageUrl(network.logo_path)} alt={network.logo_path}
                        width={50}
                        height={50}
                    />)}
                </div>
            </div>
            <Providers providers={providers}/>
        </ExtraInfo>
    )
}