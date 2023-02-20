import styles from "./movieCard.module.css";
import Image from "next/image";
import React from "react";
import {Average} from "@/components/common/Average";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";
import Link from "next/link";
import {MovieInterface} from "@/utils/models/Movies/Movie.interface";
import {RecommendationInterface} from "@/utils/models/Movies/RecomendationResponse.interface";

type props = {
    data:MovieInterface | RecommendationInterface
}

//TODO solve bug with link element that redirect only to other movies
export function MovieCard({data}:props){
    const poster = generateImageUrl(data.poster_path)
    return (
        <article className={styles.movieCard}>
            <Link href={`/movie/${data.id}`}>
                <Image src={poster} alt={"title poster"} width={200} height={300}/>
                <div className={styles.info}>
                    <Average value={data.vote_average} />
                </div>
            </Link>
        </article>

    )
}