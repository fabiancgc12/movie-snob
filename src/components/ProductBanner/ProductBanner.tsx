import {generateImageUrl} from "@/utils/functions/generateImageUrl";
import styles from "./ProductBanner.module.css";
import Image from "next/image";
import {calculateRunTime} from "@/utils/functions/calculateRunTime";
import {Video} from "@/components/Video/Video";
import {Average} from "@/components/common/Average";
import {BookmarkButton} from "@/components/common/ActionButton/chechMarkButton";
import {LikeButton} from "@/components/common/ActionButton/LikeButton";
import {ShareButton} from "@/components/common/ActionButton/ShareButton";
import {CrewMemberCard} from "@/components/CrewMember/CrewMemberCard";
import {MovieInterface} from "@/utils/models/Movies/Movie.interface";
import {VideoTrailerInterface} from "@/utils/models/Movies/VideoMedia.interface";
import { CrewDto} from "@/utils/models/Movies/CreditsResponse.interface";
import {TvShowInterface} from "@/utils/models/tv/TvShow.interface";

type props = {
    trailer?:VideoTrailerInterface,
    credits?:(CrewDto)[] | null;
} & ({
    product:MovieInterface,
    type:"movie"
    }
    | {
    product:TvShowInterface,
    type:"tv"
})

export function MediaBanner({product,trailer,credits,type}:props){
    const posterPath = generateImageUrl(product.poster_path);
    const backgroundPath = generateImageUrl(product.backdrop_path);
    const title = type == "movie" ? product.title : product.name
    const titleSize = title.length > 20 ? styles.titleSmall : ""
    //sorting so the director is always first

    return (
        <section className={styles.header}>
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
            <div className={styles.banner}>
                <Image src={backgroundPath} alt={`${title} backdrop`} className={styles.backdrop} fill/>
            </div>
            <div className={styles.generalInfo}>
                <div className={styles.flex}>
                    <div className={styles.genres}>
                        {product.genres?.slice(0,3).map(g => <small className={"badge"} key={`genre-${g.id}`}>{g.name}</small>)}
                    </div>
                    {type == "movie" && <div>{calculateRunTime(product.runtime)}</div>}
                </div>
                <div className={`${styles.flex} ${styles.titleWrapper}`}>
                    <h1 className={`${styles.title} ${titleSize}`}>
                        {title}
                        {type === "movie" && <small className={styles.year}>({product.release_date.slice(0, 4)})</small>}
                    </h1>
                    {trailer && <Video video={trailer}><a href={"#"}>Watch trailer</a></Video>}
                </div>
                <div className={styles.overview}>
                    <h4>Overview</h4>
                    <p>{product.overview}</p>
                </div>
                <div className={`${styles.flex}`}>
                    <Average value={product.vote_average}/>
                    <BookmarkButton media="movie" id={product.id}/>
                    <LikeButton media="movie" id={product.id}/>
                    <ShareButton/>
                </div>
                <div className={styles.crew}>
                    {credits && credits.map(c => <CrewMemberCard key={`crew-${c.id}-${c.job}`} size={"sm"} people={c} type={"crew"} shadow={false}/>)}
                </div>
            </div>
        </section>
    )
}
