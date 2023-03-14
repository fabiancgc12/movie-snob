import styles from "./movieCard.module.css";
import Image from "next/image";
import React from "react";
import {Average} from "@/components/common/Average";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import {MediaType} from "@/models/MediaType";

export type PosterType = {
    id:number,
    poster_path?:string,
    backdrop_path?:string | null,
    vote_average:number,
    media_type?: MediaType;
    title?:string,
    name?:string
}

type props = {
    data:PosterType,
    mediaType:MediaType,
    isBackdrop?:boolean
}

export function PosterCard({data,mediaType,isBackdrop = false}:props){
    const posterPath = isBackdrop ? data.backdrop_path : data.poster_path
    const poster = generateImageUrl(posterPath);
    const type = data.media_type ?? mediaType;
    const title = data.title ?? data.name as string
    return (
        <article className={`${styles.posterCard} ${isBackdrop ? styles.backdropCard : ""}`}>
            <Link href={`/${type}/${data.id}`} className={styles.posterWrapper}>
                <div className={styles.poster}>
                    <Image src={poster} alt={"title poster"} fill/>
                </div>
                <div className={styles.rating}>
                    <Average value={data.vote_average} size={"sm"}/>
                </div>
            </Link>
            <div className={styles.title}>
                <small>{title}</small>
            </div>
        </article>
    )
}

type SkeletonProps = {
    isBackdrop?:boolean
}

export function SkeletonCard({isBackdrop}:SkeletonProps){
    return (
        <article className={`${styles.posterCard} ${isBackdrop ? styles.backdropCard : ""}`}>
            <Skeleton className={styles.poster} containerClassName={"skeleton"}/>
            <div className={styles.title}>
                <Skeleton  containerClassName={"skeleton"}/>
            </div>
        </article>
    )
}