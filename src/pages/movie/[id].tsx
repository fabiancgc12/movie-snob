import { Average } from "@/components/common/Average";
import {GetStaticPaths, GetStaticProps} from "next";
import Image from "next/image";
import styles from "./id.module.css";
import {BookmarkButton} from "@/components/common/ActionButton/chechMarkButton";
import {ShareButton} from "@/components/common/ActionButton/ShareButton";
import {getMovie} from "@/services/movies/getMovie";
import {MovieInterface} from "@/utils/models/Movies/Movie.interface";
import {CastEntity, CreditsInterface, CrewEntity} from "@/utils/models/Movies/Credits.interface";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";
import {calculateRunTime} from "@/utils/functions/calculateRunTime";
import {CrewMember} from "@/components/credits/CrewMember";


type props = {
    movie:MovieInterface,
    credits:CreditsInterface
}

export default function Movie({movie,credits}:props){
    const posterPath = generateImageUrl(movie.poster_path)
    const backgroundPath = generateImageUrl(movie.backdrop_path)
    const director = credits.crew?.find(c => c.job.toLowerCase() == "director")
    return (
        <main>
            <div className={styles.banner}>
                <Image src={backgroundPath} alt={`${movie.title} backdrop`} className={styles.backdrop} fill/>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.poster}>
                    <Image
                        src={posterPath}
                        alt={`${movie.title} poster`}
                        priority
                        width={200}
                        height={350}
                    />
                </div>
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
                    <h2>Plot</h2>
                    <p>{movie.overview}</p>
                </div>
                <div>
                    <Director director={director}/>
                    <Cast cast={credits.cast}/>
                </div>
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

type castProps = {
    cast?:CastEntity[] | null
}
function Cast({cast}:castProps){
    if (!cast) return null;
    return (
        <div>
            <h2>Cast</h2>
            <figure className={styles.cast}>
                {cast.slice(0,9).map(c => <CrewMember key={`cast-${c.id}`} people={c} type={"cast"}/>)}
            </figure>
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
    const {movie,credits} = await getMovie(550)
    return {
        props: {
            movie,
            credits
        }
    }
}