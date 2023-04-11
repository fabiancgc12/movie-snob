import styles from "./Footer.module.css"
import imdbLogo from "../../../public/tmdb.svg"
import Image from "next/image"
import useTranslation from "next-translate/useTranslation";

type props = {
    className?:string
}

export function Footer({className = ""}:props){

    const { t } = useTranslation('common')
    const developedBy = t("developedby")
    const madeUsing = t("madeusing")
    return (
        <footer className={`${styles.footer} ${className}`}>
            <div>
                <p>{developedBy}</p>
                <a href="https://github.com/fabiancgc12"
                   target="_blank"
                   rel="noopener noreferrer"
                >Fabian Graterol</a>
            </div>
            <div className={styles.tmdbLogo} >
                {madeUsing}
                <Image src={imdbLogo} alt={"The movie Database logo"} width={100} height={100}/>
            </div>
        </footer>
    )
}