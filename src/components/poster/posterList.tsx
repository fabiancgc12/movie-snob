import {PosterCard, PosterType, SkeletonCard} from "@/components/poster/posterCard";
import {useInfiniteQuery} from "@tanstack/react-query";
import {PopularMovieResponse} from "@/models/popular/popularMovie.interface";
import {PopularTvShowResponse} from "@/models/popular/popularTv.interface";
import {TrendingResponseInterface} from "@/models/trending/TrendingMovieResponse";
import {Spinner} from "@/components/common/Spinner";
import {useInView} from "react-intersection-observer";
import {MediaType} from "@/models/MediaType";
import styles from "./list.module.css"
import useTranslation from "next-translate/useTranslation";

export type props = {
    media:PosterType[],
    mediaType:MediaType,
    isBackdrop?:boolean,
    fallbackMessage:string
}

export function PosterList({media,mediaType,isBackdrop,fallbackMessage}:props){
    if (!media || media.length === 0) return <p>{fallbackMessage}</p>
    return (
        <>
            {media.map((e, i) => <PosterCard isBackdrop={isBackdrop} data={e} mediaType={mediaType} key={`card-${i}`}/>)}
        </>
    )
}

type posterlist = {
    mediaType:MediaType,
    api:string,
    parameters?:Record<string, any>
    enabled?:boolean,
    queryKey:any[],
    isBackdrop?:boolean
    fallbackMessage:string
}

export function DynamicPosterList({mediaType,api,enabled = true,parameters={},queryKey,isBackdrop,fallbackMessage}:posterlist){
    if (!parameters.page)
        parameters.page = 1
    let {data,hasNextPage,isFetching,isFetchingNextPage,fetchNextPage,refetch,error,isError,isLoadingError,isRefetchError} = useInfiniteQuery<PopularMovieResponse | PopularTvShowResponse | TrendingResponseInterface>({
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
    const {t} = useTranslation("common")
    const [endElementRef] = useInView({
        threshold:1,
        rootMargin:"700px 700px",
        onChange: inView => {
            if (inView)
                if (hasNextPage && !isFetchingNextPage && !isFetching){
                    fetchNextPage()
                }
        }
    });
    if (error || isError || isLoadingError || isRefetchError){
        const retry = t("retry");
        const message = t("errorConnectingToServer")
        return (
            <div className={styles.error}>
                <p>{message}</p>
                <button onClick={() => refetch()}>{retry}</button>
            </div>
        )
    }
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
            <PosterList
                mediaType={mediaType}
                media={media}
                isBackdrop={isBackdrop}
                fallbackMessage={fallbackMessage}
            />
            {hasNextPage && media.length > 0 && <div ref={endElementRef} className={"loader"}><Spinner/></div>}
        </>
    )
}