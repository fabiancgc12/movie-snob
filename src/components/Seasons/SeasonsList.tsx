import {SeasonsEntity} from "@/models/tv/TvShow.interface";
import {Section} from "@/components/Section/Section";
import styles from "./Season.module.css"
import Image from "next/image";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";
import React, {ChangeEvent, useEffect, useState} from "react";
import {formatYearDate} from "@/utils/functions/formatYearDate";
import useTranslation from "next-translate/useTranslation";


type props = {
    seasons?:SeasonsEntity[] | null
}

export function SeasonsList({seasons}:props){
    const {t} = useTranslation("movieortv")
    const [selectedId,setSelectedId] = useState(seasons?.at(-1)?.id ?? 0 )
    useEffect(() => {
        setSelectedId(seasons?.at(-1)?.id ?? 0 )
    },[seasons])
    if (!seasons || seasons.length == 0) return null;
    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedId(Number(e.target.value));
    }
    const selectedSeason = seasons.find(s => s.id == selectedId);
    if (!selectedSeason) return null
    return (
        <Section title={t("seasonsLabel")}>
            <select className={styles.select} value={selectedId} onChange={onChange}>
                {seasons.map(s => <option value={s.id} key={`season-${s.id}`}>{s.name}</option>)}
            </select>
            <Season season={selectedSeason}/>
        </Section>
    )
}

type seasonComponentProp= {
    season:SeasonsEntity
}
function Season({season}:seasonComponentProp){
    const {t} = useTranslation("movieortv")
    const airedOnLabel = t("airedOnLabel")
    const notAnnouncedLabel = t("notAnnounced")
    const episodesLabel = t("episodes")
    return (
        <div className={styles.season}>
            <div className={styles.posterWrapper}>
                <Image src={generateImageUrl(season.poster_path)} alt={`${season.name} poster`} fill/>
            </div>
            <div>
                <h6 className={styles.title}>{season.name}</h6>
                <p>
                    <small className={styles.date}>
                        {airedOnLabel}: {season.air_date ? formatYearDate(season.air_date) : notAnnouncedLabel}
                    </small>
                    {season.episode_count && <small className={styles.date}> | {season.episode_count} {episodesLabel}</small>}
                </p>
                <p className={styles.plot}>
                    <small>
                        {season.overview}
                    </small>
                </p>
            </div>
        </div>
    )
}