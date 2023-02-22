import {VideoTrailerInterface} from "@/utils/models/Movies/VideoMedia.interface";
import {GetStaticPaths, GetStaticProps} from "next";
import {getTvShow} from "@/services/tv/getTv";
import {TvShowInterface} from "@/utils/models/tv/TvShow.interface";
import {MediaBanner} from "@/components/ProductBanner/ProductBanner";
import {PosterList} from "@/components/movieCard/posterList";
import { RecommendationInterface } from "@/utils/models/Movies/RecomendationResponse.interface";
import styles from "@/pages/movie/id.module.css";
import {TvCast} from "@/components/CastList/CastList";
import {Media} from "@/components/media/Media";
import {ImageMediaResponse} from "@/utils/models/Movies/ImageMedia.interface";
import { TvExtraInfo } from "@/components/ExtraInfo/TvExtraInfo";
import {SeasonsList} from "@/components/Seasons/SeasonsList";
import {ProvidersDto} from "@/utils/models/dto/ProvidersDto";
import {CreditsDto, PeopleDto} from "@/utils/models/dto/Credit.dto";
import {ProductHead} from "@/components/Layout/ProductHead";

type props = {
    show:TvShowInterface,
    credits:CreditsDto,
    videos:VideoTrailerInterface[],
    images:ImageMediaResponse,
    providers:ProvidersDto,
    recommendations:RecommendationInterface[]
}

export default function Tv({show,credits,videos,recommendations,images,providers}:props){
    const createdBy = show.created_by?.map(c => PeopleDto.formatCreatedBy(c)).slice(0,2) || []
    const openingSequence = videos.find(v => v.type.includes("Opening"));
    return (
        <main>
            <ProductHead media={show} mediaType={"tv"}/>
            <MediaBanner product={show} trailer={openingSequence} credits={createdBy} mediaType={"tv"}/>
            <div data-theme="light" className={styles.tvContent}>
                <TvCast cast={credits.cast}/>
                <div className={styles.info}>
                    <TvExtraInfo show={show} providers={providers}/>
                </div>
                <SeasonsList seasons={show.seasons}/>
                <Media videos={videos} images={images}/>
            </div>
            <PosterList mediaType={"tv"} title={"Recommendations"} media={recommendations}/>
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

