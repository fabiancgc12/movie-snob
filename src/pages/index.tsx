import {DynamicPosterList, PosterList} from "@/components/movieCard/posterList";
import {SlideShow} from "@/components/SlideShow/SlideShow";
import {GetStaticProps} from "next";
import {getHomePage} from "@/services/getHomePage";
import {MovieResumeInterface} from "@/models/Movies/MovieResume.interface";
import {UpcomingBanner} from "@/components/mainBanner/UpcomingBanner";
import {useInView} from "react-intersection-observer";
import {Spinner} from "@/components/common/Spinner";
import {useEffect, useState} from "react";
import {ApiGenres} from "@/utils/apiGenres";
import {dehydrate, QueryClient} from "@tanstack/react-query";

type props = {
    upcoming:MovieResumeInterface[],
}

export default function Home({upcoming}:props) {
  return (
    <main>
        <SlideShow>
            {upcoming.slice(0,8).map(u => <UpcomingBanner key={`banner-${u.id}`} data={u}/>)}
        </SlideShow>
        <div data-theme="light">
            <DynamicPosterList
                mediaType={"movie"}
                enabled={false}
                title={"Trending right now"}
                api={"trending"}
                queryKey={["trending"]}/>
        </div>
        <div data-theme="dark">
            <PosterList
                posterType={"backdrop"}
                media={upcoming}
                title={"Upcoming movies"}
                mediaType={"movie"}
            />
        </div>
        <div data-theme="light">
            <DynamicPosterList
                mediaType={"movie"}
                title={"Popular Movies"}
                enabled={false}
                api={"popularMovies"}
                queryKey={["popularMovies"]}
            />
            <DynamicPosterList
                mediaType={"tv"}
                title={"Popular Tv Shows"}
                enabled={false}
                api={"popularTv"}
                queryKey={["popularTv"]}
            />
        </div>
        <GenreSection/>
    </main>
  )
}

const genresLimit = 9;

function GenreSection(){
    const [genres, setGenres] = useState<typeof ApiGenres>([]);
    const [loadMoreRef,inView] = useInView({
        threshold:1,
        rootMargin:"300px",
    });
    useEffect(() => {
        if (inView){
            setGenres(current => {
                if (ApiGenres.length > current.length && current.length <= (genresLimit - 1)) {
                    return ApiGenres.slice(0,current.length + 3)
                }
                return [...current]
            })
        }
    }, [inView]);

    return (
        <div>
            {genres.map((g,i) => <div
                key={`genre-section-${g.id}`}
                data-theme={(i % 3 == 0) ? "dark" : "light"}
            >
                <DynamicPosterList
                    title={g.name}
                    mediaType={"movie"}
                    api={`discoverMovies`}
                    parameters={{
                        genre:g.id
                    }}
                    queryKey={["discoverMovies",`genre-${g.id}`]}
                />
            </div>)
            }
            {genres.length <= (genresLimit - 1) && <div ref={loadMoreRef}>
                <Spinner/>
            </div>}
        </div>
    )
}


export const getStaticProps:GetStaticProps = async () => {
    const queryClient = new QueryClient()
    const data = await getHomePage()
    await queryClient.prefetchInfiniteQuery(["trending"],() => data.trending)
    await queryClient.prefetchInfiniteQuery(["popularMovies"],() => data.popular.movie)
    await queryClient.prefetchInfiniteQuery(["popularTv"],() => data.popular.tv)
    return {
        props: {
            ...data,
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        },
        revalidate:600 //revalidate in 10 minutes
    }
}