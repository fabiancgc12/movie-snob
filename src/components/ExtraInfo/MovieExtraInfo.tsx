import styles from "@/components/ExtraInfo/ExtraInfo.module.css";
import {formatDate} from "@/utils/functions/formatDate";
import {formatCurrency} from "@/utils/functions/formatCurrency";
import {MovieInterface} from "@/utils/models/Movies/Movie.interface";
import {ProvidersResponseInterface} from "@/utils/models/Movies/Providers.interface";
import { ExtraInfo } from "./ExtraInfo";
import { Providers } from "./Providers";
import {ProvidersDto} from "@/utils/models/dto/ProvidersDto";

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
            <Providers providers={providers}/>
        </ExtraInfo>
    )
}