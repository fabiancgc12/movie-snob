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
        vote_average:number
    },
    mediaType:"movie" | "tv"
}

export function PosterCard({data,mediaType}:props){
    const poster = generateImageUrl(data.poster_path)
    return (
        <article className={styles.movieCard}>
            <Link href={`/${mediaType}/${data.id}`}>
                <Image src={poster} alt={"title poster"} width={200} height={300}/>
                <div className={styles.info}>
                    <Average value={data.vote_average} />
                </div>
            </Link>
        </article>

    )
}