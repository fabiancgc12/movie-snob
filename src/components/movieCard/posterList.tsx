import {PosterCard, PosterType} from "@/components/movieCard/posterCard";
import {Slider} from "@/components/Slider/Slider";
import {useInfiniteQuery} from "@tanstack/react-query";
import {PopularMovieResponse} from "@/models/popular/popularMovie.interface";
import {PopularTvShowResponse} from "@/models/popular/popularTv.interface";
import {TrendingResponseInterface} from "@/models/trending/TrendingMovieResponse";
import {Spinner} from "@/components/common/Spinner";

export type props = {
    media:PosterType[],
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
    mediaType:"tv" | "movie",
    api:string,
    parameters?:Record<string, any>
    enabled?:boolean,
    queryKey:any[]
}

export function DynamicPosterList({mediaType,api,enabled = true,parameters={},queryKey}:posterlist){
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
    if (!data) return <Slider speed={450}><Spinner/></Slider>
    const media = data?.pages?.map(p => p.results).flat() ?? []
    return (
        <Slider
            speed={450}
            onReachEnd={ () => {
            if (hasNextPage && !isFetchingNextPage && !isFetching)
                fetchNextPage()
            }}
            endElement={hasNextPage && <Spinner/>}
        >
            <PosterList mediaType={mediaType} media={media}/>
        </Slider>
    )
}
