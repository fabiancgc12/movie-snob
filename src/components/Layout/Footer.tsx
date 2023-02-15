import styles from "./Footer.module.css"
import imdbLogo from "../../../public/tmdb.svg"
import Image from "next/image"
export function Footer(){
    return (
        <footer className={styles.footer}>
            <div>
                <p>
                    Developed by
                </p>
            </div>
            <div className={styles.tmdbLogo} >
                Made using the api of:
                <Image src={imdbLogo} alt={"The movie Database logo"} width={100} height={100}/>
            </div>
        </footer>
    )
}