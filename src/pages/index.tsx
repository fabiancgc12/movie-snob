import {DynamicPosterList, PosterList} from "@/components/movieCard/posterList";
import {SlideShow} from "@/components/SlideShow/SlideShow";
import {GetStaticProps} from "next";
import {getHomePage} from "@/services/getHomePage";
import {MovieResumeInterface} from "@/models/Movies/MovieResume.interface";
import {PopularMovieResponse} from "@/models/popular/popularMovie.interface";
import {PopularTvShowResponse} from "@/models/popular/popularTv.interface";
import {TrendingResponseInterface} from "@/models/trending/TrendingMovieResponse";
import {UpcomingBanner} from "@/components/mainBanner/UpcomingBanner";
import {useInView} from "react-intersection-observer";
import {Spinner} from "@/components/common/Spinner";
import {useEffect, useState} from "react";
import {ApiGenres} from "@/utils/apiGenres";

type props = {
    upcoming:MovieResumeInterface[],
    popular:{
        movie:PopularMovieResponse,
        tv:PopularTvShowResponse
    },
    trending:TrendingResponseInterface
}

export default function Home({upcoming,popular,trending}:props) {
  return (
    <main>
        <SlideShow>
            {upcoming.slice(0,8).map(u => <UpcomingBanner key={`banner-${u.id}`} data={u}/>)}
        </SlideShow>
        <div data-theme="light">
            <DynamicPosterList
                mediaType={"movie"}
                title={"Trending right now"}
                initialData={trending}
                search={"trending"}/>
        </div>
        <div data-theme="dark">
            <PosterList
                posterType={"backdrop"}
                media={popular.movie.results}
                title={"Upcoming movies"}
                mediaType={"movie"}
            />
        </div>
        <div data-theme="light">
            <DynamicPosterList
                mediaType={"movie"}
                title={"Popular Movies"}
                initialData={popular.movie}
                search={"popularMovies"}
            />
            <DynamicPosterList
                mediaType={"tv"}
                title={"Popular Tv Shows"}
                initialData={popular.tv}
                search={"popularTv"}/>
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
        rootMargin:"150px",
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
                {g.name}
            </div>)
            }
            {genres.length <= (genresLimit - 1) && <div ref={loadMoreRef}>
                <Spinner/>
            </div>}
        </div>
    )
}


export const getStaticProps:GetStaticProps = async () => {
    const data = await getHomePage()
    return {
        props: data,
        revalidate:600 //revalidate in 10 minutes
    }
}