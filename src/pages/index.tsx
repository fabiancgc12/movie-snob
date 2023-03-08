import {DynamicPosterList, PosterList} from "@/components/movieCard/posterList";
import {SlideShow} from "@/components/SlideShow/SlideShow";
import {GetStaticProps} from "next";
import {getHomePage} from "@/services/getHomePage";
import {MovieResumeInterface} from "@/models/Movies/MovieResume.interface";
import {PopularMovieResponse} from "@/models/popular/popularMovie.interface";
import {PopularTvShowResponse} from "@/models/popular/popularTv.interface";
import {TrendingResponseInterface} from "@/models/trending/TrendingMovieResponse";
import {UpcomingBanner} from "@/components/mainBanner/UpcomingBanner";

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
                queryData={trending}
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
                queryData={popular.movie}
                search={"popularMovies"}
            />
            <DynamicPosterList
                mediaType={"tv"}
                title={"Popular Tv Shows"}
                queryData={popular.tv}
                search={"popularTv"}/>
        </div>
    </main>
  )
}



export const getStaticProps:GetStaticProps = async () => {
    const data = await getHomePage()
    return {
        props: data,
        revalidate:600 //revalidate in 10 minutes
    }
}