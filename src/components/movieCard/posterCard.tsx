import styles from "./movieCard.module.css";
import Image from "next/image";
import React from "react";
import {Average} from "@/components/common/Average";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";
import Link from "next/link";

type props = {
    data:{
        id:number,
        poster_path?:string,
        backdrop_path?:string | null,
        vote_average:number
    },
    mediaType:"movie" | "tv",
    posterType?:"poster" | "backdrop"
}

export function PosterCard({data,mediaType,posterType = "poster"}:props){
    const isBackdrop = posterType == "backdrop"
    const posterPath = isBackdrop ? data.backdrop_path : data.poster_path
    const poster = generateImageUrl(posterPath)
    return (
        <article className={`${styles.movieCard} ${isBackdrop ? styles.backdropCard : ""}`}>
            <Link href={`/${mediaType}/${data.id}`}>
                <div className={styles.poster}>
                    <Image src={poster} alt={"title poster"} fill/>
                </div>
                <div className={styles.info}>
                    <Average value={data.vote_average} />
                </div>
            </Link>
        </article>
    )
}