import {PosterCard, PosterType, SkeletonCard} from "@/components/poster/posterCard";
import {useInfiniteQuery} from "@tanstack/react-query";
import {PopularMovieResponse} from "@/models/popular/popularMovie.interface";
import {PopularTvShowResponse} from "@/models/popular/popularTv.interface";
import {TrendingResponseInterface} from "@/models/trending/TrendingMovieResponse";
import {Spinner} from "@/components/common/Spinner";
import {useWhyDidYouUpdate} from "@/hooks/whydidYouRender";
import {useInView} from "react-intersection-observer";

export type props = {
    media:PosterType[],
    mediaType:"tv" | "movie",
    isBackdrop?:boolean
}

export function PosterList({media,mediaType,isBackdrop}:props){
    if (!media || media.length === 0) return <></>
    return (
        <>
            {media.map((e, i) => <PosterCard isBackdrop={isBackdrop} data={e} mediaType={mediaType} key={`card-${i}`}/>)}
        </>
    )
}

type posterlist = {
    mediaType:"tv" | "movie",
    api:string,
    parameters?:Record<string, any>
    enabled?:boolean,
    queryKey:any[],
    isBackdrop?:boolean
}

export function DynamicPosterList({mediaType,api,enabled = true,parameters={},queryKey,isBackdrop}:posterlist){
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

    const [endElementRef] = useInView({
        threshold:1,
        rootMargin:"700px 700px",
        onChange: inView => {
            if (inView)
                if (hasNextPage && !isFetchingNextPage && !isFetching){
                    console.log("posterlist api/" + api + "/genre" + parameters.genre)
                    fetchNextPage()
                }
        }
    });

    useWhyDidYouUpdate("posterlist api/" + api + "/genre" + parameters.genre,{data,hasNextPage,isFetching,isFetchingNextPage,fetchNextPage})

    if (!data) return (
    <>
        <SkeletonCard isBackdrop={isBackdrop}/>
        <SkeletonCard isBackdrop={isBackdrop}/>
        <SkeletonCard isBackdrop={isBackdrop}/>
        <SkeletonCard isBackdrop={isBackdrop}/>
        <SkeletonCard isBackdrop={isBackdrop}/>
        <SkeletonCard isBackdrop={isBackdrop}/>
    </>
    )

    const media = data?.pages?.map(p => p.results).flat() ?? []
    return (
        <>
            <PosterList mediaType={mediaType} media={media} isBackdrop={isBackdrop}/>
            {hasNextPage && <div ref={endElementRef}><Spinner/></div>}
        </>
    )
}