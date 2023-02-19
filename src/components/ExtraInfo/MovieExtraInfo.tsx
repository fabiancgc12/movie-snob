import {MovieInterface} from "@/utils/models/Movies/Movie.interface";
import {Section} from "@/components/common/Section/Section";
import styles from "./ExtraInfo.module.css"
import {formatDate} from "@/utils/functions/formatDate";
import {formatCurrency} from "@/utils/functions/formatCurrency";
import {ProvidersResponseInterface} from "@/utils/models/Movies/Providers.interface";
import Image from "next/image";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";
import {TvShowInterface} from "@/utils/models/tv/TvShow.interface";
import {ReactNode} from "react";
type props = {
    movie:MovieInterface,
    providers:ProvidersResponseInterface
}

type ExtraInfoProps = {
    children:ReactNode
}

function ExtraInfo({children}:ExtraInfoProps){
    return (
        <Section title={"More info"}>
            <div className={styles.wrapper}>
                {children}
            </div>
        </Section>
    )
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

type tvProps = {
    show:TvShowInterface,
    providers:ProvidersResponseInterface
}

export function TvExtraInfo({show,providers}:tvProps){
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

type ProvidersProps = {
    providers:ProvidersResponseInterface
}

function Providers({providers}:ProvidersProps){
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

