import styles from "@/components/ExtraInfo/ExtraInfo.module.css";
import {formatCurrency} from "@/utils/functions/formatCurrency";
import {MovieInterface} from "@/models/Movies/Movie.interface";
import { ExtraInfo } from "./ExtraInfo";
import { Providers } from "./Providers";
import {ProvidersDto} from "@/models/dto/ProvidersDto";
import {CompanyLogo} from "@/components/ExtraInfo/CompanyLogo";
import {FullDate} from "@/components/common/FullDate";
import { MdLanguage } from "react-icons/md";

type props = {
    movie:MovieInterface,
    providers:ProvidersDto
}

export function MovieExtraInfo({movie,providers}:props){
    return (
        <ExtraInfo>
            <div className={styles.info}>
                <p>Release Date</p>
                <FullDate date={movie.release_date}/>
            </div>
            <div className={styles.info}>
                <p>original language</p>
                <small className={"alignCenter"}><MdLanguage/>{movie.spoken_languages?.map(sp => sp.english_name)?.join(",")}</small>
            </div>
            <div className={styles.info}>
                <p>budget</p>
                <small>{formatCurrency.format(movie.budget)}</small>
            </div>
            <div className={styles.info}>
                <p>Production Company</p>
                <div className={styles.logos}>
                    {movie.production_companies?.map(company => <CompanyLogo
                        key={`${company.name} logo`}
                        name={company.name}
                        logo_path={company.logo_path}
                    />)}
                </div>
            </div>
            <Providers providers={providers}/>
        </ExtraInfo>
    )
}