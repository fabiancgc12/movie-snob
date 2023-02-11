import {VideoTrailerInterface} from "@/utils/models/Movies/VideoMedia.interface";
import style from "./Video.module.css"
import {ReactNode, useRef, useState} from "react";

type props = {
    video:VideoTrailerInterface,
    children:ReactNode
}
export function Video({video,children}:props){
    const [show, setShow] = useState(false);
    const iframeRef  = useRef<HTMLIFrameElement>(null)

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
            <div onClick={() => setShow(true)}>
                {children}
            </div>
        </div>
    )
}