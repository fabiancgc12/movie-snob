import {VideoTrailerInterface} from "@/models/Movies/VideoMedia.interface";
import style from "./Video.module.css"
import {ReactNode, useState} from "react";

type props = {
    video:VideoTrailerInterface,
    children:ReactNode
}
export function Video({video,children}:props){
    const [show, setShow] = useState(false);

    return (
        <div className={style.media}>
            <div
                className={`${style.video} ${show ? style.show : ""}`}
                onClick={() => setShow(false)}
            >
                {show && <iframe
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name}
                    allowFullScreen
                    allow={"encrypted-media; picture-in-picture full"}
                />}
            </div>
            <div onClick={() => setShow(true)}>
                {children}
            </div>
        </div>
    )
}