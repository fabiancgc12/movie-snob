import {GetStaticPaths, GetStaticProps} from "next";
import styles from "./id.module.css";
import {getMovie} from "@/services/movies/getMovie";
import {MovieInterface} from "@/utils/models/Movies/Movie.interface";
import {CreditsResponseInterface} from "@/utils/models/Movies/CreditsResponse.interface";
import {VideoTrailerInterface} from "@/utils/models/Movies/VideoMedia.interface";
import {ImageMediaResponse} from "@/utils/models/Movies/ImageMedia.interface";
import {Media} from "@/components/media/Media";
import { MovieCast} from "@/components/CastList/CastList";
import {CardList} from "@/components/movieCard/cardList";
import {ProvidersResponseInterface} from "@/utils/models/Movies/Providers.interface";
import {RecommendationInterface} from "@/utils/models/Movies/RecomendationResponse.interface";
import { MediaBanner } from "@/components/ProductBanner/ProductBanner";
import {MovieExtraInfo} from "@/components/ExtraInfo/MovieExtraInfo";

type props = {
    movie:MovieInterface,
    credits:CreditsResponseInterface,
    videos:VideoTrailerInterface[],
    images:ImageMediaResponse,
    providers:ProvidersResponseInterface,
    recommendations:RecommendationInterface[]
}

export default function Movie({movie,credits,videos,images,providers,recommendations}:props){
    const crew = credits.crew?.sort((a) => a.job.toLowerCase() === "screenplay" ? 1 : -1)
    return (
        <main>
            <MediaBanner product={movie} trailer={videos[0]} credits={crew} type={"movie"}/>
            <div data-theme="light" className={styles.content}>
                <MovieCast cast={credits.cast}/>
                <MovieExtraInfo movie={movie} providers={providers}/>
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