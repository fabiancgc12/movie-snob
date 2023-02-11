import { Average } from "@/components/common/Average";
import {GetStaticPaths, GetStaticProps} from "next";
import Image from "next/image";
import styles from "./id.module.css";
import {BookmarkButton} from "@/components/common/ActionButton/chechMarkButton";
import {ShareButton} from "@/components/common/ActionButton/ShareButton";
import {getMovie} from "@/services/movies/getMovie";
import {MovieInterface} from "@/utils/models/Movies/Movie.interface";
import {CreditsInterface} from "@/utils/models/Movies/Credits.interface";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";
import {calculateRunTime} from "@/utils/functions/calculateRunTime";
import {CrewMemberCard} from "@/components/CrewMember/CrewMemberCard";
import {VideoTrailerInterface} from "@/utils/models/Movies/VideoMedia.interface";
import {ImageMediaInterface} from "@/utils/models/Movies/ImageMedia.interface";
import {Media} from "@/components/media/Media";
import { Cast } from "@/components/CastList/CastList";
import {CardList} from "@/components/movieCard/cardList";
import {LikeButton} from "@/components/common/ActionButton/LikeButton";
import { Video } from "@/components/Video/Video";


type props = {
    movie:MovieInterface,
    credits:CreditsInterface,
    trailer:VideoTrailerInterface | undefined,
    images:ImageMediaInterface
}

export default function Movie({movie,credits,trailer,images}:props){
    const posterPath = generateImageUrl(movie.poster_path)
    const backgroundPath = generateImageUrl(movie.backdrop_path)
    const crew = credits.crew?.filter(c => c.job.toLowerCase() == "director" || c.job.toLowerCase() == "screenplay")
    return (
        <main>
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
                        <h1 className={styles.title}>{movie.title} <small>({movie.release_date.slice(0,4)})</small></h1>
                        {trailer && <Video video={trailer}><a href={"#"}>Watch trailer</a></Video>}
                    </div>
                    <div className={styles.overview}>
                        <h4>Overview</h4>
                        <p>{movie.overview}</p>
                    </div>
                    <div className={`${styles.flex}`}>
                        <Average value={movie.vote_average}/>
                        <BookmarkButton/>
                        <LikeButton/>
                        <ShareButton/>
                    </div>
                    <div className={`${styles.flex} ${styles.crew}`}>
                        {crew && crew.map(c => <CrewMemberCard key={`crew-${c.id}`} size={"sm"} people={c} type={"crew"}/>)}
                    </div>
                </div>
            </section>
            <div data-theme="light">
                <Cast cast={credits.cast}/>
                <Media trailer={trailer} images={images}/>
                {movie.genres?.map(g => <CardList title={g.name} key={`movie genre ${g.name}`}/>)}
            </div>
        </main>
    )
}

export const getStaticPaths:GetStaticPaths = () => {
    return {
        paths: [],
        fallback: "blocking",
    }
}

export const getStaticProps:GetStaticProps = async () => {
    const {movie,credits,trailer,images} = await getMovie(550)
    return {
        props: {
            movie,
            credits,
            trailer,
            images
        }
    }
}