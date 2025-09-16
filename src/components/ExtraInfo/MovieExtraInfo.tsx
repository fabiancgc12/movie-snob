import styles from "@/components/ExtraInfo/ExtraInfo.module.css";
import {formatCurrency} from "@/utils/functions/formatCurrency";
import {MovieInterface} from "@/models/Movies/Movie.interface";
import { ExtraInfo } from "./ExtraInfo";
import { Providers } from "./Providers";
import {ProvidersDto} from "@/models/dto/ProvidersDto";
import {CompanyLogo} from "@/components/ExtraInfo/CompanyLogo";
import {FullDate} from "@/components/common/FullDate";
import { MdLanguage } from "react-icons/md";
import useTranslation from "next-translate/useTranslation";

type props = {
    movie:MovieInterface,
    providers:ProvidersDto
}

export function MovieExtraInfo({movie,providers}:props){
    const {t,lang} = useTranslation("movieortv");
    const releaseDateLabel = t("releaseDate")
    const languageLabel = t("language")
    const budgetLabel = t("budget")
    const productionLabel = t("production")
    return (
        <ExtraInfo>
            <div className={`${styles.info} text`}>
                <p>{releaseDateLabel}</p>
                <FullDate date={movie.release_date} lang={lang}/>
            </div>
            <div className={`${styles.info} text`}>
                <p>{languageLabel}</p>
                <small className={"alignCenter"}><MdLanguage/>{movie.spoken_languages?.slice(0,4).map(sp => sp.english_name)?.join(", ")}</small>
            </div>
            <div className={`${styles.info} text`}>
                <p>{budgetLabel}</p>
                <small>{formatCurrency.format(movie.budget)}</small>
            </div>
            <div className={`${styles.info} text`}>
                <p>{productionLabel}</p>
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