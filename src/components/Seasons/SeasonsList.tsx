import {SeasonsEntity} from "@/utils/models/tv/TvShow.interface";
import {Section} from "@/components/common/Section/Section";
import styles from "./Season.module.css"
import Image from "next/image";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";
import React, {ChangeEvent, useEffect, useState} from "react";
import {formatYearDate} from "@/utils/functions/formatYearDate";


type props = {
    seasons?:SeasonsEntity[] | null
}

export function SeasonsList({seasons}:props){
    const [selectedId,setSelectedId] = useState(seasons?.at(-1)?.id ?? 0 )
    useEffect(() => {
        setSelectedId(seasons?.at(-1)?.id ?? 0 )
    },[seasons])
    if (!seasons || seasons.length == 0) return null;
    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedId(Number(e.target.value));
    }
    const selectedSeason = seasons.find(s => s.id == selectedId) as SeasonsEntity;
    return (
        <Section title={"seasons"}>
            <select value={selectedId} onChange={onChange}>
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
    return (
        <div className={styles.season}>
            <div className={styles.posterWrapper}>
                <Image src={generateImageUrl(season.poster_path)} alt={`${season.name} poster`} fill/>
            </div>
            <div>
                <h6 className={styles.title}>{season.name}</h6>
                <p>
                    <small className={styles.date}>Aired on: {formatYearDate(season.air_date)} | {season.episode_count} episodes</small>
                </p>
                <p className={styles.plot}>
                    {season.overview}
                </p>
            </div>
        </div>
    )
}