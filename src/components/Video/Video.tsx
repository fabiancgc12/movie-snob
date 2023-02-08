import {VideoTrailerInterface} from "@/utils/models/Movies/VideoMedia.interface";
import style from "./Video.module.css"
import Image from "next/image";
import {useRef, useState} from "react";

type props = {
    video:VideoTrailerInterface
}
export function Video({video}:props){
    const [show, setShow] = useState(false);
    const iframeRef  = useRef<HTMLIFrameElement>(null)
    const videoThumbnail = `https://img.youtube.com/vi/${video.key}/mqdefault.jpg`;

    // this is to stop reproduction of iframe each time the video overlay is closed
    if (!show && iframeRef.current){
        const src = iframeRef.current.src
        iframeRef.current.src = src
    }
    return (
        <div className={style.media}>
            <div
                className={`${style.video} ${show ? style.show : ""}`}
                onClick={() => setShow(false)}
            >
                <iframe
                    ref={iframeRef}
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={"embed youtube trailer"}
                    allowFullScreen
                    allow={"encrypted-media; picture-in-picture full"}
                />
            </div>
            <div
                className={style.thumbnail}
                onClick={() => setShow(true)}
            >
                <Image src={videoThumbnail} alt={`${video.name} thumbnail`} fill/>
                <div className={style.overlay}>
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}