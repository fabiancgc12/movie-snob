import {MovieInterface} from "@/utils/models/Movies/Movie.interface";
import {Section} from "@/components/common/Section/Section";
import styles from "./ExtraInfo.module.css"
import {formatDate} from "@/utils/functions/formatDate";
import {formatCurrency} from "@/utils/functions/formatCurrency";
import {ProvidersResultInterface} from "@/utils/models/Movies/Providers.interface";
import Image from "next/image";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";
type props = {
    movie:MovieInterface,
    providers:ProvidersResultInterface
}

export function ExtraInfo({movie,providers}:props){
    return (
        <Section title={"More info"}>
            <div className={styles.wrapper}>
                <div className={styles.info}>
                    <p>Release Date</p>
                    <small>{formatDate(movie.release_date)}</small>
                </div>
                <div className={styles.info}>
                    <p>original language</p>
                    <small>{movie.spoken_languages?.map(sp => sp.english_name)?.join(",")}</small>
                </div>
                <div className={styles.info}>
                    <p>budget</p>
                    <small>{formatCurrency.format(movie.budget)}</small>
                </div>
                <div className={styles.info}>
                    <p>Available on</p>
                    <div className={styles.providers}>
                        {providers.results.US.flatrate?.map(st => <Image
                            key={`${st.provider_name} logo`}
                            src={generateImageUrl(st.logo_path)} alt={st.provider_name}
                            width={50}
                            height={50}
                        />)}
                        <small>You can visit <a href={"https://www.justwatch.com/"}>JustWatch</a> for more information</small>
                    </div>
                </div>
            </div>
        </Section>
    )
}