import {VideoTrailerInterface} from "@/models/Movies/VideoMedia.interface";
import style from "./Video.module.css"
import {ReactNode, useState} from "react";
import {createPortal} from "react-dom";

type props = {
    video:VideoTrailerInterface,
    children:ReactNode
}
export function Video({video,children}:props){
    const [show, setShow] = useState(false);

    return (
        <div className={style.media}>
            {show && createPortal(<div
                className={`${style.video} ${show ? style.show : ""}`}
                onClick={() => setShow(false)}
            >
                <iframe
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name}
                    allowFullScreen
                    allow={"encrypted-media; picture-in-picture full"}
                />
            </div>,document.body)}

            <div onClick={() => setShow(true)}>
                {children}
            </div>
        </div>
    )
}