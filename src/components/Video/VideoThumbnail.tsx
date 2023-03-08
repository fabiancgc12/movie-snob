import {VideoTrailerInterface} from "@/models/Movies/VideoMedia.interface";
import { Video } from "./Video";
import styles from "@/components/Video/Video.module.css";
import Image from "next/image";

type props = {
    video:VideoTrailerInterface
}

export function VideoThumbnail({video}:props){
    const videoThumbnail = `https://img.youtube.com/vi/${video.key}/hqdefault.jpg`;

    return (
        <Video video={video}>
            <div className={styles.thumbnail}>
                <Image src={videoThumbnail} alt={`${video.name} thumbnail`} fill/>
                <div className={styles.overlay}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                    </svg>
                </div>
            </div>
            <small className={styles.title}>
                {video.name}
            </small>
        </Video>
    )
}