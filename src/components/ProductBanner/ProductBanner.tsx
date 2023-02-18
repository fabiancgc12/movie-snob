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
import {CreditsResponseInterface} from "@/utils/models/Movies/CreditsResponse.interface";

type props = {
    movie:MovieInterface,
    trailer?:VideoTrailerInterface,
    credits:CreditsResponseInterface,
}

export function MediaBanner({movie,trailer,credits}:props){
    const posterPath = generateImageUrl(movie.poster_path);
    const backgroundPath = generateImageUrl(movie.backdrop_path);
    const titleSize = movie.title.length > 20 ? styles.titleSmall : ""
    //sorting so the director is always first
    const crew = credits.crew?.sort((a,b) => a.job.toLowerCase() === "screenplay" ? 1 : -1)

    return (
        <section className={styles.header}>
            <div className={styles.poster}>
                <div>
                    <Image
                        src={posterPath}
                        alt={`${movie.title} poster`}
                        priority
                        fill
                    />
                </div>
            </div>
            <div className={styles.banner}>
                <Image src={backgroundPath} alt={`${movie.title} backdrop`} className={styles.backdrop} fill/>
            </div>
            <div className={styles.generalInfo}>
                <div className={styles.flex}>
                    <div className={styles.genres}>
                        {movie.genres?.slice(0,3).map(g => <small className={"badge"} key={`genre-${g.id}`}>{g.name}</small>)}
                    </div>
                    <div>{calculateRunTime(movie.runtime)}</div>
                </div>
                <div className={`${styles.flex} ${styles.titleWrapper}`}>
                    <h1 className={`${styles.title} ${titleSize}`}>{movie.title} <small className={styles.year}>({movie.release_date.slice(0,4)})</small></h1>
                    {trailer && <Video video={trailer}><a href={"#"}>Watch trailer</a></Video>}
                </div>
                <div className={styles.overview}>
                    <h4>Overview</h4>
                    <p>{movie.overview}</p>
                </div>
                <div className={`${styles.flex}`}>
                    <Average value={movie.vote_average}/>
                    <BookmarkButton media="movie" id={movie.id}/>
                    <LikeButton media="movie" id={movie.id}/>
                    <ShareButton/>
                </div>
                <div className={styles.crew}>
                    {crew && crew.map(c => <CrewMemberCard key={`crew-${c.id}-${c.job}`} size={"sm"} people={c} type={"crew"} shadow={false}/>)}
                </div>
            </div>
        </section>
    )
}
