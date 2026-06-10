import {getHomePage} from "@/services/getHomePage";
import {dehydrate, QueryClient} from "@tanstack/react-query";
import {HomeContent} from "./HomeContent";
import {notFound} from "next/navigation";

type Props = {
    params: Promise<{ lang: string }>
}

export default async function HomePage({params}: Props) {
    const {lang} = await params
    const queryClient = new QueryClient()
    try {
        const data = await getHomePage(lang)
        await queryClient.prefetchInfiniteQuery(["trending", lang], () => data.trending)
        await queryClient.prefetchInfiniteQuery(["popularMovies", lang], () => data.popular.movie)
        await queryClient.prefetchInfiniteQuery(["popularTv", lang], () => data.popular.tv)

        return (
            <HomeContent
                upcoming={data.upcoming}
                upcomingTrailers={data.upcomingTrailers}
                dehydratedState={JSON.parse(JSON.stringify(dehydrate(queryClient)))}
            />
        )
    } catch (e) {
        notFound()
    }
}

export const revalidate = 1200
