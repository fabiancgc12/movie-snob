import {GetStaticPaths, GetStaticProps} from "next";
import styles from "./id.module.css";
import {getMovie} from "@/services/movies/getMovie";
import {MovieInterface} from "@/models/Movies/Movie.interface";
import {VideoTrailerInterface} from "@/models/Movies/VideoMedia.interface";
import {ImageMediaResponse} from "@/models/Movies/ImageMedia.interface";
import {Media} from "@/components/media/Media";
import { CastSection} from "@/components/CastSection/CastSection";
import {PosterList} from "@/components/poster/posterList";
import {RecommendationInterface} from "@/models/Movies/RecomendationResponse.interface";
import { MediaBanner } from "@/components/ProductBanner/ProductBanner";
import {MovieExtraInfo} from "@/components/ExtraInfo/MovieExtraInfo";
import {ProvidersDto} from "@/models/dto/ProvidersDto";
import {CreditsDto} from "@/models/dto/Credit.dto";
import {ProductHead} from "@/components/Layout/ProductHead";
import {SliderSection} from "@/components/Slider/SliderSection";
import {TMDBCodes} from "@/utils/TMDBCodes";

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
    const trailer = videos.find(t => t.site == "YouTube" && t.name.toLowerCase().includes("trailer"))

    return (
        <>
            <ProductHead media={movie} mediaType={"movie"} cast={credits.cast || []} crew={credits.crew || []}/>
            <MediaBanner product={movie} trailer={trailer} credits={crew} mediaType={"movie"}/>
            <div data-theme="light" className={styles.movieContent}>
                <CastSection cast={credits.cast}/>
                <MovieExtraInfo movie={movie} providers={providers}/>
                <Media videos={videos} images={images}/>
            </div>
            <SliderSection title={"Recommendations"} speed={450}>
                <PosterList
                    mediaType={"movie"}
                    media={recommendations}
                    fallbackMessage={"currently there are no recommendations."}
                />
            </SliderSection>
        </>
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
    try {
        const {movie,credits,videos,images,providers,recommendations} = await getMovie(id)
        return {
            props: {
                movie,
                credits,
                videos,
                images,
                providers,
                recommendations
            },
            revalidate:900 //revalidate in 15 minutes
        }
    } catch (e) {
        // @ts-ignore
        if (e.status_code == TMDBCodes.resourceNotFound)
            return {
                props:{},
                redirect:{
                    destination:"/movie/not-found"
                }
            }
        else
            return {
                notFound:true
            }
    }
}