import styles from "@/components/ExtraInfo/ExtraInfo.module.css";
import {formatDate} from "@/utils/functions/formatDate";
import {formatCurrency} from "@/utils/functions/formatCurrency";
import {MovieInterface} from "@/utils/models/Movies/Movie.interface";
import { ExtraInfo } from "./ExtraInfo";
import { Providers } from "./Providers";
import {ProvidersDto} from "@/utils/models/dto/ProvidersDto";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";
import Image from "next/image";

type props = {
    movie:MovieInterface,
    providers:ProvidersDto
}

export function MovieExtraInfo({movie,providers}:props){
    return (
        <ExtraInfo>
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
                <p>Production Company</p>
                <div className={styles.logos}>
                    {movie.production_companies?.map(company => <Image
                        key={`${company.name} logo`}
                        title={`${company.name} logo`}
                        src={generateImageUrl(company.logo_path)} alt={`${company.name} logo`}
                        className={company.logo_path ? "" : "placeholderImage"}
                        width={50}
                        height={50}
                    />)}
                </div>
            </div>
            <Providers providers={providers}/>
        </ExtraInfo>
    )
}