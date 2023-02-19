import {CreditsResponseInterface} from "@/utils/models/Movies/CreditsResponse.interface";
import {VideoTrailerInterface} from "@/utils/models/Movies/VideoMedia.interface";
import {GetStaticPaths, GetStaticProps} from "next";
import {getTvShow} from "@/services/tv/getTv";
import {TvShowInterface} from "@/utils/models/tv/TvShow.interface";
import {MediaBanner} from "@/components/ProductBanner/ProductBanner";

type props = {
    show:TvShowInterface,
    credits:CreditsResponseInterface,
    videos:VideoTrailerInterface[],
    // images:ImageMediaResponse,
    // providers:ProvidersResponseInterface,
    // recommendations:RecommendationInterface[]
}


export default function Tv({show,credits,videos}:props){
    const createdBy = show.created_by?.map(c => ({
        ...c,
        job:"created by"
    })).slice(0,2) || []
    return (
        <main>
            <MediaBanner product={show} trailer={videos[0]} credits={createdBy} type={"tv"}/>

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