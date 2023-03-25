import styles from "./banner.module.css";
import Link from "next/link";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";
import {CSSProperties, useMemo} from "react";
import {ActionToolTip} from "@/components/common/ActionToolTip";
import {BookmarkButton} from "@/components/common/ActionButton/chechMarkButton";
import {MovieResumeInterface} from "@/models/Movies/MovieResume.interface";
import {LikeButton} from "@/components/common/ActionButton/LikeButton";
import {BsThreeDotsVertical} from "react-icons/bs";
import {FullDate} from "@/components/common/FullDate";
import {VideoTrailerInterface} from "@/models/Movies/VideoMedia.interface";
import {Video} from "@/components/Video/Video";
import useTranslation from "next-translate/useTranslation";

type props = {
    data:MovieResumeInterface,
    trailer?:VideoTrailerInterface
}

export function UpcomingBanner({data,trailer}:props) {
    const {t,lang} = useTranslation("common");
    const bg = useMemo(() => ({
        "--bgImage":`url(${generateImageUrl(data.backdrop_path,1280)})`
    }) as CSSProperties, [data]);
    const placeholderStyle = data.backdrop_path ? "" : `${styles.placeholderBanner} placeholderImage`;
    const bigTitleStyle = data.title.length >= 20 ? styles.bigTitle : "";
    const readMore = t("readMore")
    const watchTrailer = t("watchTrailer")
    return <div className={`${styles.mainShow} ${placeholderStyle}`} style={bg}>
        <div className={styles.info}>
            <h2 className={bigTitleStyle}>{data.title}</h2>
            <FullDate date={data.release_date} lang={lang}/>
            <div className={styles.buttons}>
                <Link className={"contrast"} role="button" href={`/movie/${data.id}`}>{readMore}</Link>
                {trailer &&
                    <Video video={trailer}><a className={"contrast outline"} href={"#"} role="button">{watchTrailer}</a></Video>
                }
            </div>
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