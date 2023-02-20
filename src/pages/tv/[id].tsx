import {VideoTrailerInterface} from "@/utils/models/Movies/VideoMedia.interface";
import {GetStaticPaths, GetStaticProps} from "next";
import {getTvShow} from "@/services/tv/getTv";
import {TvShowInterface} from "@/utils/models/tv/TvShow.interface";
import {MediaBanner} from "@/components/ProductBanner/ProductBanner";
import {CardList} from "@/components/movieCard/cardList";
import { RecommendationInterface } from "@/utils/models/Movies/RecomendationResponse.interface";
import styles from "@/pages/movie/id.module.css";
import {TvCast} from "@/components/CastList/CastList";
import {Media} from "@/components/media/Media";
import {ImageMediaResponse} from "@/utils/models/Movies/ImageMedia.interface";
import {ProvidersResponseInterface} from "@/utils/models/Movies/Providers.interface";
import { TvExtraInfo } from "@/components/ExtraInfo/TvExtraInfo";
import {AgregateCastResponse} from "@/utils/models/tv/TvCast.interface";
import {SeasonsList} from "@/components/Seasons/SeasonsList";

type props = {
    show:TvShowInterface,
    credits:AgregateCastResponse,
    videos:VideoTrailerInterface[],
    images:ImageMediaResponse,
    providers:ProvidersResponseInterface,
    recommendations:RecommendationInterface[]
}


export default function Tv({show,credits,videos,recommendations,images,providers}:props){
    const createdBy = show.created_by?.map(c => ({
        ...c,
        job:"creator"
    })).slice(0,2) || []
    // show.
    return (
        <main>
            <MediaBanner product={show} trailer={videos[0]} credits={createdBy} type={"tv"}/>
            <div data-theme="light" className={styles.tvContent}>
                <TvCast cast={credits.cast}/>
                <TvExtraInfo show={show} providers={providers}/>
                <SeasonsList seasons={show.seasons}/>
                <Media videos={videos} images={images}/>
            </div>
            <CardList title={"Recommendations"} movies={recommendations}/>
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

