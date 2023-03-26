import {VideoTrailerInterface} from "@/models/Movies/VideoMedia.interface";
import {GetStaticPaths, GetStaticProps} from "next";
import {getTvShow} from "@/services/tv/getTv";
import {TvShowInterface} from "@/models/tv/TvShow.interface";
import {MediaBanner} from "@/components/ProductBanner/ProductBanner";
import {PosterList} from "@/components/poster/posterList";
import { RecommendationInterface } from "@/models/Movies/RecomendationResponse.interface";
import styles from "@/pages/movie/id.module.css";
import {CastSection} from "@/components/CastSection/CastSection";
import {Media} from "@/components/media/Media";
import {ImageMediaResponse} from "@/models/Movies/ImageMedia.interface";
import { TvExtraInfo } from "@/components/ExtraInfo/TvExtraInfo";
import {SeasonsList} from "@/components/Seasons/SeasonsList";
import {ProvidersDto} from "@/models/dto/ProvidersDto";
import {CreditsDto, PeopleDto} from "@/models/dto/Credit.dto";
import {ProductHead} from "@/components/Layout/ProductHead";
import { SliderSection } from "@/components/Slider/SliderSection";
import {TMDBCodes} from "@/utils/TMDBCodes";
import useTranslation from "next-translate/useTranslation";
import {useTheme} from "@/global/ThemeContext";

type props = {
    show:TvShowInterface,
    credits:CreditsDto,
    videos:VideoTrailerInterface[],
    images:ImageMediaResponse,
    providers:ProvidersDto,
    recommendations:RecommendationInterface[]
}

export default function Tv({show,credits,videos,recommendations,images,providers}:props){
    const {t} = useTranslation("movieortv")
    const [theme] = useTheme();
    const createdBy = show.created_by?.map(c => PeopleDto.formatCreatedBy(c)).slice(0,2) || []
    const openingSequence = videos.find(v => v.type.includes("Opening"));

    return (
        <>
            <ProductHead media={show} mediaType={"tv"} cast={credits.cast || []} crew={createdBy}/>
            <MediaBanner product={show} trailer={openingSequence} credits={createdBy} mediaType={"tv"}/>
            <div data-theme={theme} className={styles.tvContent}>
                <CastSection cast={credits.cast}/>
                <div className={styles.info}>
                    <TvExtraInfo show={show} providers={providers}/>
                </div>
                <SeasonsList seasons={show.seasons}/>
                <Media videos={videos} images={images}/>
            </div>
            <SliderSection title={t("common:recommendationLabel")} speed={450}>
                <PosterList
                    mediaType={"tv"}
                    media={recommendations}
                    fallbackMessage={t("recommendationFallbackMessage")}
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
        const data = await getTvShow(id,context.locale)
        return {
            props: data,
            revalidate:900 //revalidate in 15 minutes
        }
    } catch (e) {
        // @ts-ignore
        if (e.status_code == TMDBCodes.resourceNotFound)
            return {
                props:{},
                redirect:{
                    destination:"/tv/not-found"
                }
            }
        else
            return {
                notFound:true
            }
    }

}

