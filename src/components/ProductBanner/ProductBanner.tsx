import {generateImageUrl} from "@/utils/functions/generateImageUrl";
import styles from "./ProductBanner.module.css";
import Image from "next/image";
import {calculateRunTime} from "@/utils/functions/calculateRunTime";
import {Video} from "@/components/Video/Video";
import {Average} from "@/components/common/Average";
import {BookmarkButton} from "@/components/common/ActionButton/chechMarkButton";
import {LikeButton} from "@/components/common/ActionButton/LikeButton";
import {ShareButton} from "@/components/common/ActionButton/ShareButton";
import {MemberCard} from "@/components/CrewMember/CrewMemberCard";
import {MovieInterface} from "@/models/Movies/Movie.interface";
import {VideoTrailerInterface} from "@/models/Movies/VideoMedia.interface";
import {TvShowInterface} from "@/models/tv/TvShow.interface";
import {PeopleDto} from "@/models/dto/Credit.dto";
import {generateUrlPage} from "@/utils/functions/generateUrlPage";
import {CSSProperties, useMemo} from "react";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

type props = {
    trailer?:VideoTrailerInterface,
    credits?:(PeopleDto)[] | null;
} & ({
    product:MovieInterface,
    mediaType:"movie"
    }
    | {
    product:TvShowInterface,
    mediaType:"tv"
})

export function MediaBanner({product,trailer,credits,mediaType}:props){
    const {t} = useTranslation("common")
    const bg = useMemo(() => ({
        "--bgImage":`url(${generateImageUrl(product.backdrop_path,1280)})`
    }) as CSSProperties, [product]);

    const posterPath = generateImageUrl(product.poster_path);
    const title = mediaType == "movie" ? product.title : product.name
    const titleSize = title.length > 20 ? styles.titleSmall : "";
    const videoLabel = mediaType == "movie" ? t("watchTrailer"): t("watchOpening")
    //sorting so the director is always first
    const overviewFallback = t("movieortv:overviewFallback")
    const overviewTitle = t("movieortv:overview")
    return (
        <section className={styles.header} style={bg}>
            <div className={styles.poster}>
                <div>
                    <Image
                        src={posterPath}
                        alt={`${title} poster`}
                        priority
                        fill
                    />
                </div>
            </div>
            <div className={styles.generalInfo}>
                <div className={styles.flex}>
                    <div className={styles.genres}>
                        {product.genres?.slice(0,3).map(g => (
                            <Link
                                className={"badge"}
                                href={`/discover?media=${mediaType}&genre=${g.id}`}
                                key={`genre-${g.id}`}
                            >
                                {g.name}
                            </Link>))}
                    </div>
                    {mediaType == "movie" && <div>{calculateRunTime(product.runtime)}</div>}
                </div>
                <div className={`${styles.flex} ${styles.titleWrapper}`}>
                    <h1 className={`${styles.title} ${titleSize}`}>
                        {title}
                        {mediaType === "movie" && product.release_date.length != 0 &&  <small className={styles.year}> ({product.release_date.slice(0, 4)})</small>}
                    </h1>
                    {trailer && <Video video={trailer}><a href={"#"}>{videoLabel}</a></Video>}
                </div>
                <div className={styles.overview}>
                    <h4>{overviewTitle}</h4>
                    <small>{product.overview || overviewFallback}</small>
                </div>
                <div className={`${styles.flex}`}>
                    <Average value={product.vote_average}/>
                    <BookmarkButton mediaType={mediaType} media={product}/>
                    <LikeButton mediaType={mediaType} media={product}/>
                    <ShareButton url={generateUrlPage(product,mediaType)} title={title}/>
                </div>
                <div className={styles.crew}>
                    {credits && credits.slice(0,2).map(c => <MemberCard key={`crew-${c.id}-${c.role}`} size={"sm"} people={c} shadow={false}/>)}
                </div>
            </div>
        </section>
    )
}
