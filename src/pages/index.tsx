import {PosterList} from "@/components/movieCard/posterList";
import {dummyRecommendations} from "@/services/movies/getMovie";
import {SlideShow} from "@/components/SlideShow/SlideShow";
import {GetStaticProps} from "next";
import {getHomePage} from "@/services/movies/getHomePage";
import {MovieResumeInterface} from "@/utils/models/Movies/MovieResume.interface";
import {TvShowResume} from "@/utils/models/tv/TvShowResume";

type props = {
    upcoming:MovieResumeInterface[],
    popular:{
        movie:MovieResumeInterface[],
        tv:TvShowResume[]
    }
}

export default function Home({upcoming,popular}:props) {
  return (
    <main>
        <SlideShow upcoming={upcoming}/>
        <div data-theme="light">
            <PosterList mediaType={"movie"} title={"Popular Movies"} media={popular.movie}/>
            <PosterList mediaType={"tv"} title={"Popular Tv Shows"} media={popular.tv}/>
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