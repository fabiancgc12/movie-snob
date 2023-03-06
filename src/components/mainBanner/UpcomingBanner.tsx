import styles from "./banner.module.css";
import Link from "next/link";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";
import {CSSProperties, useMemo} from "react";
import {ActionToolTip} from "@/components/common/ActionToolTip";
import {BookmarkButton} from "@/components/common/ActionButton/chechMarkButton";
import {MovieResumeInterface} from "@/utils/models/Movies/MovieResume.interface";
import {LikeButton} from "@/components/common/ActionButton/LikeButton";
import {BsThreeDotsVertical} from "react-icons/bs";

type props = {
    data:MovieResumeInterface
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
                <ActionToolTip buttonContent={<BsThreeDotsVertical/>} buttonSize={"sm"}>
                    <div className={styles.option}>
                        <BookmarkButton media={data} mediaType={"movie"} size={"xs"} className={"outline noBorder"}/>
                        <small>Add to Bookmark</small>
                    </div>
                    <div className={styles.option}>
                        <LikeButton media={data} mediaType={"movie"} size={"xs"} className={"outline noBorder"}/>
                        <small>Give a like!</small>
                    </div>
                </ActionToolTip>
            </div>
        </div>
    </div>;
}
