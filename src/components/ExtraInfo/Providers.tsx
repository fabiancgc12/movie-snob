import {ProvidersResponseInterface} from "@/utils/models/Movies/Providers.interface";
import styles from "@/components/ExtraInfo/ExtraInfo.module.css";
import Image from "next/image";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";
import {ProvidersDto} from "@/utils/models/dto/ProvidersDto";

type props = {
    providers:ProvidersDto
}

export function Providers({providers}:props){
    return (
        <div className={styles.info}>
            <p>Available on</p>
            <div className={`${styles.logos} ${styles.providers}`}>
                {providers.results.US.flatrate?.map(st => <Image
                    key={`${st.provider_name} logo`}
                    src={generateImageUrl(st.logo_path)} alt={st.provider_name}
                    width={50}
                    height={50}
                />)}
                <small>You can visit <a href={"https://www.justwatch.com/"}>JustWatch</a> for more information</small>
            </div>
        </div>
    )
}