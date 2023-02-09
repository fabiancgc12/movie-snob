import { Average } from "@/components/common/Average";
import {GetStaticPaths, GetStaticProps} from "next";
import Image from "next/image";
import styles from "./id.module.css";
import {BookmarkButton} from "@/components/common/ActionButton/chechMarkButton";
import {ShareButton} from "@/components/common/ActionButton/ShareButton";
import {getMovie} from "@/services/movies/getMovie";
import {MovieInterface} from "@/utils/models/Movies/Movie.interface";
import {CreditsInterface, CrewEntity} from "@/utils/models/Movies/Credits.interface";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";
import {calculateRunTime} from "@/utils/functions/calculateRunTime";
import {CrewMember} from "@/components/credits/CrewMember";
import {VideoTrailerInterface} from "@/utils/models/Movies/VideoMedia.interface";
import {ImageMediaInterface} from "@/utils/models/Movies/ImageMedia.interface";
import {Media} from "@/components/media/Media";
import { Cast } from "@/components/CastList/CastList";
import {CardList} from "@/components/movieCard/cardList";


type props = {
    movie:MovieInterface,
    credits:CreditsInterface,
    trailer:VideoTrailerInterface | undefined,
    images:ImageMediaInterface
}

export default function Movie({movie,credits,trailer,images}:props){
    const posterPath = generateImageUrl(movie.poster_path)
    const backgroundPath = generateImageUrl(movie.backdrop_path)
    const director = credits.crew?.find(c => c.job.toLowerCase() == "director")
    return (
        <main>
            <header className={styles.header}>
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
            </header>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>{movie.title} <small>({movie.release_date.slice(0,4)})</small></h1>
                <div className={styles.extraInfo}>
                    <div className={styles.genres}>
                        {movie.genres?.slice(0,3).map(g => <span className={"badge"} key={`genre-${g.id}`}>{g.name}</span>)}
                    </div>
                    <div>{calculateRunTime(movie.runtime)}</div>
                </div>
                <div className={styles.extraInfo}>
                    <Average value={movie.vote_average}/>
                    <ShareButton/>
                    <BookmarkButton/>
                </div>
                <div>
                    <h2>Overview</h2>
                    <p>{movie.overview}</p>
                </div>
                <div>
                    <Director director={director}/>
                    <Cast cast={credits.cast}/>
                </div>
                <Media trailer={trailer} images={images}/>
                {movie.genres?.map(g => <CardList title={g.name} key={`movie genre ${g.name}`}/>)}
            </div>
        </main>
    )
}

type directorProps = {
    director?:CrewEntity
}
function Director({director}:directorProps){
    if (!director) return null;
    return (
        <div>
            <h2>Director</h2>
            <CrewMember people={director} type={"crew"}/>
        </div>
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