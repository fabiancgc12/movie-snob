import {CreditsResponseInterface} from "@/utils/models/Movies/CreditsResponse.interface";
import {VideoTrailerInterface} from "@/utils/models/Movies/VideoMedia.interface";
import {GetStaticPaths, GetStaticProps} from "next";
import {getTvShow} from "@/services/tv/getTv";
import {TvShowInterface} from "@/utils/models/tv/TvShow.interface";
import {MediaBanner} from "@/components/ProductBanner/ProductBanner";
import {CardList} from "@/components/movieCard/cardList";
import { RecommendationInterface } from "@/utils/models/Movies/RecomendationResponse.interface";
import styles from "@/pages/movie/id.module.css";
import {Cast} from "@/components/CastList/CastList";
import {ExtraInfo} from "@/components/ExtraInfo/ExtraInfo";
import {Media} from "@/components/media/Media";
import {ImageMediaResponse} from "@/utils/models/Movies/ImageMedia.interface";

type props = {
    show:TvShowInterface,
    credits:CreditsResponseInterface,
    videos:VideoTrailerInterface[],
    images:ImageMediaResponse,
    // providers:ProvidersResponseInterface,
    recommendations:RecommendationInterface[]
}


export default function Tv({show,credits,videos,recommendations,images}:props){
    const createdBy = show.created_by?.map(c => ({
        ...c,
        job:"created by"
    })).slice(0,2) || []
    console.log(credits)
    return (
        <main>
            <MediaBanner product={show} trailer={videos[0]} credits={createdBy} type={"tv"}/>
            <div data-theme="light" className={styles.content}>
                <Cast cast={credits.cast}/>
                {/*<ExtraInfo movie={movie} providers={providers}/>*/}
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
    const data = await getTvShow(id)
    return {
        props: data
    }
}