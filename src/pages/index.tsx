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
import { Section } from "@/components/Section/Section";
import {Slider} from "@/components/Slider/Slider";
import {useTheme} from "@/global/ThemeContext";

type props = {
    upcoming:MovieResumeInterface[],
    upcomingTrailers:VideoTrailerInterface[]

}
export default function Home({upcoming,upcomingTrailers}:props) {
    const {t,lang} = useTranslation("home");
    const [theme] = useTheme();
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
        <div data-theme={theme}>
            <SliderSection title={trendingLabel} speed={450}>
                <DynamicPosterList
                    mediaType={"movie"}
                    enabled={false}
                    api={"trending"}
                    queryKey={["trending",lang]}
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
        <div data-theme={theme}>
            <SliderSection title={popularMoviesLabel} speed={450}>
                <DynamicPosterList
                    mediaType={"movie"}
                    enabled={false}
                    api={"popularMovies"}
                    queryKey={["popularMovies",lang]}
                    fallbackMessage={"There are not popular movies."}
                />
            </SliderSection>
            <SliderSection title={popularTvLabel} speed={450}>
                <DynamicPosterList
                    mediaType={"tv"}
                    enabled={false}
                    api={"popularTv"}
                    queryKey={["popularTv",lang]}
                    fallbackMessage={"There are not popular tv shows."}
                />
            </SliderSection>
        </div>
        <GenreSection/>
    </>
    )
}

const genresLimit = 9;

function GenreSection(){
    const {t,lang} = useTranslation("home")
    const [genres, setGenres] = useState<typeof MovieGenres>([]);
    const [theme] = useTheme();
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
            {genres.map((g,i) => {
                return <div
                    key={`genre-section-${g.id}`}
                    data-theme={(i % 3 == 0) ? "dark" : theme}
                >
                    <Section title={g.name} titleAsLink={true} url={`/discover?media=movie&genre=${g.id}`}>
                        <Slider speed={450}>
                            <DynamicPosterList
                                mediaType={"movie"}
                                api={`discoverMovies`}
                                parameters={{
                                    genre: g.id
                                }}
                                isBackdrop={i % 3 == 0}
                                queryKey={["discoverMovies", "movie", g.id.toString(),lang]}
                                fallbackMessage={noMovies}
                            />
                        </Slider>
                    </Section>
                </div>
            })
            }
            {genres.length <= (genresLimit - 1) && <div ref={loadMoreRef} className={styles.loading}>
                <Spinner/>
            </div>}
        </div>
    )
}


export const getStaticProps:GetStaticProps = async ({locale}) => {
    const queryClient = new QueryClient()
    try {
        const data = await getHomePage(locale)
        //could delete this prefecths so the stale data persist on the client during navigation
        // but at the cost of fetching every time the user goes to the home page
        // for now I prefer this version where the whole home page is delivered to the user
        await queryClient.prefetchInfiniteQuery(["trending",locale],() => data.trending)
        await queryClient.prefetchInfiniteQuery(["popularMovies",locale],() => data.popular.movie)
        await queryClient.prefetchInfiniteQuery(["popularTv",locale],() => data.popular.tv)
        return {
            props: {
                upcoming:data.upcoming,
                upcomingTrailers:data.upcomingTrailers,
                dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
            },
            revalidate:1200 //revalidate in 20 minutes
        }
    } catch (e) {
        return {
            props:{},
            redirect:{
                destination:`/${locale}/500`,
            }
        }
    }
}