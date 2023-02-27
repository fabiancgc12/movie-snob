import styles from "./banner.module.css";
import Link from "next/link";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";
import {CSSProperties, useMemo} from "react";

type props = {
    data:{
        id:number,
        backdrop_path?:string | null,
        title:string,
        overview:string,
    }
}

export function MainBanner({data}:props) {

    const bg = useMemo(() => ({
        "--bgImage":`url(${generateImageUrl(data.backdrop_path,1280)})`
    }) as CSSProperties, [data]);
    const placeholderStyle = data.backdrop_path ? "" : `${styles.placeholderBanner} placeholderImage`;
    const bigTitleStyle = data.title.length >= 20 ? styles.bigTitle : ""
    return <div className={`${styles.mainShow} ${placeholderStyle}`} style={bg}>
        <div className={styles.info}>
            <h2 className={bigTitleStyle}><Link href={`/movie/${data.id}`}>{data.title}</Link></h2>
            <p>
                <small>{data.overview}</small>
            </p>
        </div>
    </div>;
}
