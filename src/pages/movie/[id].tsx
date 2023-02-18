import { Average } from "@/components/common/Average";
import {GetStaticPaths, GetStaticProps} from "next";
import Image from "next/image";
import styles from "./id.module.css";
import {BookmarkButton} from "@/components/common/ActionButton/chechMarkButton";
import {ShareButton} from "@/components/common/ActionButton/ShareButton";
import {getMovie} from "@/services/movies/getMovie";
import {MovieInterface} from "@/utils/models/Movies/Movie.interface";
import {CreditsResponseInterface} from "@/utils/models/Movies/CreditsResponse.interface";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";
import {calculateRunTime} from "@/utils/functions/calculateRunTime";
import {CrewMemberCard} from "@/components/CrewMember/CrewMemberCard";
import {VideoTrailerInterface} from "@/utils/models/Movies/VideoMedia.interface";
import {ImageMediaResponse} from "@/utils/models/Movies/ImageMedia.interface";
import {Media} from "@/components/media/Media";
import { Cast } from "@/components/CastList/CastList";
import {CardList} from "@/components/movieCard/cardList";
import {LikeButton} from "@/components/common/ActionButton/LikeButton";
import { Video } from "@/components/Video/Video";
import {ExtraInfo} from "@/components/ExtraInfo/ExtraInfo";
import {ProvidersResponseInterface} from "@/utils/models/Movies/Providers.interface";
import {RecommendationInterface} from "@/utils/models/Movies/RecomendationResponse.interface";

type props = {
    movie:MovieInterface,
    credits:CreditsResponseInterface,
    videos:VideoTrailerInterface[],
    images:ImageMediaResponse,
    providers:ProvidersResponseInterface,
    recommendations:RecommendationInterface[]
}

export default function Movie({movie,credits,videos,images,providers,recommendations}:props){
    const posterPath = generateImageUrl(movie.poster_path);
    const backgroundPath = generateImageUrl(movie.backdrop_path);
    const titleSize = movie.title.length > 20 ? styles.titleSmall : ""
    //sorting so the director is always first
    const crew = credits.crew?.sort((a,b) => a.job.toLowerCase() === "screenplay" ? 1 : -1)

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
                        <h1 className={`${styles.title} ${titleSize}`}>{movie.title} <small className={styles.year}>({movie.release_date.slice(0,4)})</small></h1>
                        {videos && <Video video={videos[0]}><a href={"#"}>Watch trailer</a></Video>}
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
            <div data-theme="light" className={styles.content}>
                <Cast cast={credits.cast}/>
                <ExtraInfo movie={movie} providers={providers}/>
                <Media videos={videos} images={images}/>
            </div>
            <CardList title={"Recomendations"} movies={recommendations}/>
        </main>
    )
}

export const getStaticPaths:GetStaticPaths = () => {
    return {
        paths: [],
        fallback: "blocking",
    }
}

export const getStaticProps:GetStaticProps = async (context) => {
    const id = Number(context.params?.id);
    const {movie,credits,videos,images,providers,recommendations} = await getMovie(id)
    return {
        props: {
            movie,
            credits,
            videos,
            images,
            providers,
            recommendations
        }
    }
}