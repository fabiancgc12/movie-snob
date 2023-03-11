import {DynamicPosterList, PosterList} from "@/components/poster/posterList";
import {SlideShow} from "@/components/SlideShow/SlideShow";
import {GetStaticProps} from "next";
import {getHomePage} from "@/services/getHomePage";
import {MovieResumeInterface} from "@/models/Movies/MovieResume.interface";
import {UpcomingBanner} from "@/components/mainBanner/UpcomingBanner";
import {useInView} from "react-intersection-observer";
import {Spinner} from "@/components/common/Spinner";
import {useEffect, useState} from "react";
import {MovieGenres} from "@/utils/movieGenres";
import {dehydrate, QueryClient} from "@tanstack/react-query";
import { Section } from "@/components/Section/Section";
import {Slider} from "@/components/Slider/Slider";
import {SliderSection} from "@/components/Slider/SliderSection";

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
            <SliderSection title={"Trending movies"} speed={450}>
                <DynamicPosterList
                    mediaType={"movie"}
                    enabled={false}
                    api={"trending"}
                    queryKey={["trending"]}/>
            </SliderSection>
        </div>
        <div data-theme="dark">
            <Section title={"Upcoming movies"}>
                <Slider speed={450}>
                    <PosterList
                        isBackdrop={true}
                        media={upcoming}
                        mediaType={"movie"}
                    />
                </Slider>
            </Section>

        </div>
        <div data-theme="light">
            <SliderSection title={"Popular Movies"} speed={450}>
                <DynamicPosterList
                    mediaType={"movie"}
                    enabled={false}
                    api={"popularMovies"}
                    queryKey={["popularMovies"]}
                />
            </SliderSection>
            <SliderSection title={"Popular Movies"} speed={450}>
                <DynamicPosterList
                    mediaType={"tv"}
                    enabled={false}
                    api={"popularTv"}
                    queryKey={["popularTv"]}
                />
            </SliderSection>
        </div>
        <GenreSection/>
    </main>
  )
}

const genresLimit = 9;

function GenreSection(){
    const [genres, setGenres] = useState<typeof MovieGenres>([]);
    const [loadMoreRef,inView] = useInView({
        threshold:1,
        rootMargin:"300px",
    });
    useEffect(() => {
        if (inView){
            setGenres(current => {
                if (MovieGenres.length > current.length && current.length <= (genresLimit - 1)) {
                    return MovieGenres.slice(0,current.length + 3)
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
                <SliderSection title={g.name} speed={450}>
                    <DynamicPosterList
                        mediaType={"movie"}
                        api={`discoverMovies`}
                        parameters={{
                            genre:g.id
                        }}
                        isBackdrop={i % 3 == 0}
                        queryKey={["discoverMovies",`genre-${g.id}`]}
                    />
                </SliderSection>
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