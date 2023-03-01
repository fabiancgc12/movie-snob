import styles from "./banner.module.css";
import Link from "next/link";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";
import {CSSProperties, useMemo} from "react";
import {ActionToolTip} from "@/components/common/ActionToolTip";
import {BookmarkButton} from "@/components/common/ActionButton/chechMarkButton";
import {UpcomingMovie} from "@/utils/models/Movies/UpcomingResponse.interface";
import {LikeButton} from "@/components/common/ActionButton/LikeButton";

type props = {
    data:UpcomingMovie
}

export function UpcomingBanner({data}:props) {

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
            <div className={styles.actions}>
                <ActionToolTip buttonContent={<span>&#8942;</span>} buttonSize={"sm"}>
                    <div className={styles.option}>
                        <BookmarkButton media={data} mediaType={"movie"} size={"xs"} className={"noOutline"}/>
                        <small>Add a Bookmark</small>
                    </div>
                    <div className={styles.option}>
                        <LikeButton media={data} mediaType={"movie"} size={"xs"} className={"noOutline"}/>
                        <small>Do you liked it?</small>
                    </div>
                </ActionToolTip>
            </div>
        </div>
    </div>;
}
