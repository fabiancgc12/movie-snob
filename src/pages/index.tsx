import {DynamicPosterList, PosterList} from "@/components/movieCard/posterList";
import {SlideShow} from "@/components/SlideShow/SlideShow";
import {GetStaticProps} from "next";
import {getHomePage} from "@/services/getHomePage";
import {MovieResumeInterface} from "@/utils/models/Movies/MovieResume.interface";
import {PopularMovieResponse} from "@/utils/models/popular/popularMovie.interface";
import {PopularTvShowResponse} from "@/utils/models/popular/popularTv.interface";
import {TrendingResponseInterface} from "@/utils/models/trending/TrendingMovieResponse";
import {UpcomingBanner} from "@/components/mainBanner/UpcomingBanner";

type props = {
    upcoming:MovieResumeInterface[],
    popular:{
        movie:PopularMovieResponse,
        tv:PopularTvShowResponse
    },
    trending:{
        movie:TrendingResponseInterface,
        tv:TrendingResponseInterface,
    }
}

export default function Home({upcoming,popular,trending}:props) {
  return (
    <main>
        <SlideShow>
            {upcoming.map(u => <UpcomingBanner key={`banner-${u.id}`} data={u}/>)}
        </SlideShow>
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
            <div data-theme="dark">
                <PosterList
                    posterType={"backdrop"}
                    media={popular.movie.results}
                    title={"backdroplist"}
                    mediaType={"movie"}
                />
            </div>
        <div data-theme="light">
            <DynamicPosterList
                mediaType={"movie"}
                title={"Trending movies"}
                queryData={trending.movie}
                search={"trendingMovie"}/>
            <DynamicPosterList
                mediaType={"tv"}
                title={"Trending tv shows"}
                queryData={trending.tv}
                search={"trendingTv"}/>
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