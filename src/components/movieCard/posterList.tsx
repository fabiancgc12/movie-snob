import styles from "@/components/movieCard/cardList.module.css";
import {PosterCard} from "@/components/movieCard/posterCard";
import {Section} from "@/components/Section/Section";
import {RecommendationInterface} from "@/utils/models/Movies/RecomendationResponse.interface";
import {Slider} from "@/components/Slider/Slider";
import {MovieResumeInterface} from "@/utils/models/Movies/MovieResume.interface";
import {TvShowResume} from "@/utils/models/tv/TvShowResume";
import {useInfiniteQuery} from "@tanstack/react-query";
import {PopularMovieResponse} from "@/utils/models/popular/popularMovie.interface";
import {FaSpinner} from "react-icons/fa";
import {PopularTvShowResponse} from "@/utils/models/popular/popularTv.interface";
import {TrendingResponseInterface} from "@/utils/models/trending/TrendingMovieResponse";

export type props = {
    title:string,
    media:(MovieResumeInterface | RecommendationInterface | TvShowResume)[],
    mediaType:"tv" | "movie",
    posterType?:"poster" | "backdrop"
}

export function PosterList({title,media,mediaType,posterType}:props){
    if (media.length === 0) return <></>
    return (
        <Section className={styles.section} title={title}>
            <Slider speed={450} arrowsInContent={true}>
                {media?.map((e, i) => <PosterCard posterType={posterType} data={e} mediaType={mediaType} key={`card-${i}`}/>)}
            </Slider>
        </Section>
    )
}

type posterlist = {
    title:string,
    queryData:PopularMovieResponse | PopularTvShowResponse | TrendingResponseInterface,
    mediaType:"tv" | "movie",
    search:string
}

export function DynamicPosterList({title,queryData,mediaType,search}:posterlist){
    let {data,hasNextPage,isFetching,isFetchingNextPage,fetchNextPage} = useInfiniteQuery<typeof queryData>({
        queryKey: [search],
        queryFn: ({pageParam}) => fetch(`api/${search}?page=${pageParam ?? queryData.page}`).then(v => v.json()),
        initialData: {
            pages:[queryData],
            pageParams:[1]
        },
        keepPreviousData:true,
        enabled:false,
        getNextPageParam: (lastPage) => {
            if (lastPage.total_pages == lastPage.page) return false
            return lastPage.page + 1
        }
    })
    const media = data?.pages?.map(p => p.results).flat() ?? []
    return (
        <Section className={styles.section} title={title}>
            <Slider speed={450} arrowsInContent={true} onReachEnd={ () => {
                if (hasNextPage && !isFetchingNextPage && !isFetching)
                    fetchNextPage()
            }}>
                {media?.map((e, i) => <PosterCard data={e} mediaType={mediaType} key={`card-${i}`}/>)}
                {hasNextPage && (<article className={styles.loader}>
                    <FaSpinner className={`fa-spin`} size={32}/>
                </article>)}
            </Slider>
        </Section>
    )
}
