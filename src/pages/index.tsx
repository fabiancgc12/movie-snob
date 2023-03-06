import {DynamicPosterList, PosterList} from "@/components/movieCard/posterList";
import {dummyRecommendations} from "@/services/movies/getMovie";
import {SlideShow} from "@/components/SlideShow/SlideShow";
import {GetStaticProps} from "next";
import {getHomePage} from "@/services/getHomePage";
import {MovieResumeInterface} from "@/utils/models/Movies/MovieResume.interface";
import {PopularMovieResponse} from "@/utils/models/popular/popularMovie.interface";
import {PopularTvShowResponse} from "@/utils/models/popular/popularTv.interface";

type props = {
    upcoming:MovieResumeInterface[],
    popular:{
        movie:PopularMovieResponse,
        tv:PopularTvShowResponse
    }
}

export default function Home({upcoming,popular}:props) {
  return (
    <main>
        <SlideShow upcoming={upcoming}/>
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
            <PosterList mediaType={"movie"} title={"Comedy"} media={dummyRecommendations.results}/>
            <PosterList mediaType={"movie"} title={"Dramas"} media={dummyRecommendations.results}/>
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