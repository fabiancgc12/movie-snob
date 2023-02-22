import {GetStaticPaths, GetStaticProps} from "next";
import styles from "./id.module.css";
import {getMovie} from "@/services/movies/getMovie";
import {MovieInterface} from "@/utils/models/Movies/Movie.interface";
import {VideoTrailerInterface} from "@/utils/models/Movies/VideoMedia.interface";
import {ImageMediaResponse} from "@/utils/models/Movies/ImageMedia.interface";
import {Media} from "@/components/media/Media";
import { MovieCast} from "@/components/CastList/CastList";
import {PosterList} from "@/components/movieCard/posterList";
import {RecommendationInterface} from "@/utils/models/Movies/RecomendationResponse.interface";
import { MediaBanner } from "@/components/ProductBanner/ProductBanner";
import {MovieExtraInfo} from "@/components/ExtraInfo/MovieExtraInfo";
import {ProvidersDto} from "@/utils/models/dto/ProvidersDto";
import {CreditsDto} from "@/utils/models/dto/Credit.dto";
import {ProductHead} from "@/components/Layout/ProductHead";

type props = {
    movie:MovieInterface,
    credits:CreditsDto,
    videos:VideoTrailerInterface[],
    images:ImageMediaResponse,
    providers:ProvidersDto,
    recommendations:RecommendationInterface[]
}

export default function Movie({movie,credits,videos,images,providers,recommendations}:props){
    const crew = credits.crew?.sort((a) => a.role.toLowerCase() === "screenplay" ? 1 : -1)
    return (
        <main>
            <ProductHead media={movie} mediaType={"movie"}/>
            <MediaBanner product={movie} trailer={videos[0]} credits={crew} mediaType={"movie"}/>
            <div data-theme="light" className={styles.movieContent}>
                <MovieCast cast={credits.cast}/>
                <MovieExtraInfo movie={movie} providers={providers}/>
                <Media videos={videos} images={images}/>
            </div>
            <PosterList mediaType={"movie"} title={"Recomendations"} media={recommendations}/>
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