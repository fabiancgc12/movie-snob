import styles from "./movieCard.module.css";
import Image,{StaticImageData} from "next/image";
import React from "react";

type props = {
    data:{
        poster:string | StaticImageData,
        title:string,
        vote_average:number,
        popularity:number
    }
}
export function MovieCard({data}:props){
    return (
        <article className={styles.movieCard}>
            <Image src={data.poster} alt={"title poster"} width={150}/>
            <div className={styles.info}>
                <small>{data.vote_average}</small><small>{data.popularity}</small>
            </div>
        </article>
    )
}