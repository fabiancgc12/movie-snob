import styles from "./movieCard.module.css";
import Image,{StaticImageData} from "next/image";
import React from "react";

type props = {
    data:{
        poster:string | StaticImageData,
    }
}
export function MovieCard({data}:props){
    return (
        <article className={styles.movieCard}>
            <Image src={data.poster} alt={"title poster"} width={150}/>
        </article>
    )
}