import styles from "@/components/movieCard/cardList.module.css";
import {PosterCard} from "@/components/movieCard/posterCard";
import {Section} from "@/components/Section/Section";
import {RecommendationInterface} from "@/models/Movies/RecomendationResponse.interface";
import {Slider} from "@/components/Slider/Slider";
import {MovieResumeInterface} from "@/models/Movies/MovieResume.interface";
import {TvShowResume} from "@/models/tv/TvShowResume";
import {useInfiniteQuery} from "@tanstack/react-query";
import {PopularMovieResponse} from "@/models/popular/popularMovie.interface";
import {PopularTvShowResponse} from "@/models/popular/popularTv.interface";
import {TrendingResponseInterface} from "@/models/trending/TrendingMovieResponse";
import {Spinner} from "@/components/common/Spinner";

export type props = {
    media:(MovieResumeInterface | RecommendationInterface | TvShowResume)[],
    mediaType:"tv" | "movie",
    posterType?:"poster" | "backdrop"
}

export function PosterList({media,mediaType,posterType}:props){
    if (!media || media.length === 0) return <></>
    return (
        <>
            {media.map((e, i) => <PosterCard posterType={posterType} data={e} mediaType={mediaType} key={`card-${i}`}/>)}
        </>
    )
}

type posterlist = {
    title:string,
    mediaType:"tv" | "movie",
    api:string,
    parameters?:Record<string, any>
    enabled?:boolean,
    queryKey:any[]
}

export function DynamicPosterList({title,mediaType,api,enabled = true,parameters={},queryKey}:posterlist){
    if (!parameters.page)
        parameters.page = 1

    let {data,hasNextPage,isFetching,isFetchingNextPage,fetchNextPage} = useInfiniteQuery<PopularMovieResponse | PopularTvShowResponse | TrendingResponseInterface>({
        queryKey: queryKey,
        enabled:enabled,
        queryFn: ({pageParam}) => {
            parameters.page = pageParam ?? parameters.page
            const params = new URLSearchParams(parameters).toString();
            return fetch(`api/${api}?${params}`).then(v => v.json())
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.total_pages == lastPage.page) return false
            return lastPage.page + 1
        }
    })
    if (!data) return (
        <Section className={styles.section} title={title}>
            <Spinner/>
        </Section>
    )
    const media = data?.pages?.map(p => p.results).flat() ?? []
    return (
        <Section className={styles.section} title={title}>
            <Slider
                speed={450}
                arrowsInContent={true}
                onReachEnd={ () => {
                if (hasNextPage && !isFetchingNextPage && !isFetching)
                    fetchNextPage()
                }}
                endElement={hasNextPage && <Spinner/>}
            >
                {media?.map((e, i) => <PosterCard data={e} mediaType={mediaType} key={`card-${i}`}/>)}
            </Slider>
        </Section>
    )
}
