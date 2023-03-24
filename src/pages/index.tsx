import {DynamicPosterList, PosterList} from "@/components/poster/posterList";
import {SlideShow} from "@/components/SlideShow/SlideShow";
import {GetStaticProps} from "next";
import {getHomePage} from "@/services/getHomePage";
import {MovieResumeInterface} from "@/models/Movies/MovieResume.interface";
import {UpcomingBanner} from "@/components/mainBanner/UpcomingBanner";
import {useInView} from "react-intersection-observer";
import {Spinner} from "@/components/common/Spinner";
import {useEffect, useState} from "react";
import {MovieGenres, MovieGenresSpanish} from "@/utils/movieGenres";
import {dehydrate, QueryClient} from "@tanstack/react-query";
import {SliderSection} from "@/components/Slider/SliderSection";
import styles from "./index.module.css";
import {VideoTrailerInterface} from "@/models/Movies/VideoMedia.interface";
import useTranslation from "next-translate/useTranslation";

type props = {
    upcoming:MovieResumeInterface[],
    upcomingTrailers:VideoTrailerInterface[]

}
// TODO add page when there are trouble fetching movie or tv show
export default function Home({upcoming,upcomingTrailers}:props) {
  const {t} = useTranslation("home");
    const trendingLabel = t("trendingLabel")
    const upcomingLabel = t("upcomingLabel")
    const popularMoviesLabel = t("popularMoviesLabel")
    const popularTvLabel = t("popularTvLabel")
  return (
    <>
        <SlideShow>
            {upcoming
                .slice(0,8)
                .map((u,i) => <UpcomingBanner
                    key={`banner-${u.id}`}
                    data={u}
                    trailer={upcomingTrailers[i]}
                />)}
        </SlideShow>
        <div data-theme="light">
            <SliderSection title={trendingLabel} speed={450}>
                <DynamicPosterList
                    mediaType={"movie"}
                    enabled={false}
                    api={"trending"}
                    queryKey={["trending"]}
                    fallbackMessage={"There are not trending movies."}
                />
            </SliderSection>
        </div>
        <div data-theme="dark">
            <SliderSection title={upcomingLabel} speed={450}>
                <PosterList
                    isBackdrop={true}
                    media={upcoming}
                    mediaType={"movie"}
                    fallbackMessage={"There are not upcoming movies."}
                />
            </SliderSection>

        </div>
        <div data-theme="light">
            <SliderSection title={popularMoviesLabel} speed={450}>
                <DynamicPosterList
                    mediaType={"movie"}
                    enabled={false}
                    api={"popularMovies"}
                    queryKey={["popularMovies"]}
                    fallbackMessage={"There are not popular movies."}
                />
            </SliderSection>
            <SliderSection title={popularTvLabel} speed={450}>
                <DynamicPosterList
                    mediaType={"tv"}
                    enabled={false}
                    api={"popularTv"}
                    queryKey={["popularTv"]}
                    fallbackMessage={"There are not popular tv shows."}
                />
            </SliderSection>
        </div>
        <GenreSection/>
    </>
  )
}

const genresLimit = 9;

//TODO Add links to genres
function GenreSection(){
    const {t,lang} = useTranslation()
    const [genres, setGenres] = useState<typeof MovieGenres>([]);
    const [loadMoreRef,inView] = useInView({
        threshold:1,
        rootMargin:"300px",
    });
    useEffect(() => {
        if (inView){
            const langGenres = lang == "es" ? MovieGenresSpanish : MovieGenres;
            setGenres(current => {
                if (langGenres.length > current.length && current.length <= (genresLimit - 1)) {
                    return langGenres.slice(0,current.length + 3)
                }
                return [...current]
            })
        }
    }, [inView,lang]);

    const noMovies = t("noMovies")

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
                        fallbackMessage={noMovies}
                    />
                </SliderSection>
            </div>)
            }
            {genres.length <= (genresLimit - 1) && <div ref={loadMoreRef} className={styles.loading}>
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
            upcoming:data.upcoming,
            upcomingTrailers:data.upcomingTrailers,
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        },
        revalidate:1200 //revalidate in 20 minutes
    }
}