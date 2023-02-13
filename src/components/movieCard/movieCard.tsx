import styles from "./movieCard.module.css";
import Image from "next/image";
import React from "react";
import {Average} from "@/components/common/Average";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";

type props = {
    data:{
        poster_path:string,
        title:string,
        vote_average:number,
        popularity:number
    }
}
export function MovieCard({data}:props){
    const poster = generateImageUrl(data.poster_path)
    return (
        <article className={styles.movieCard}>
            <Image src={poster} alt={"title poster"} width={250} height={375}/>
            <div className={styles.info}>
                <Average value={data.vote_average} size={"sm"}/>
            </div>
        </article>

    )
}