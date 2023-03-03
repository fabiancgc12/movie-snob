import {PosterList} from "@/components/movieCard/posterList";
import {dummyRecommendations} from "@/services/movies/getMovie";
import {SlideShow} from "@/components/SlideShow/SlideShow";
import {GetStaticProps} from "next";
import {getHomePage} from "@/services/movies/getHomePage";
import {MovieResumeInterface} from "@/utils/models/Movies/MovieResume.interface";

type props = {
    upcoming:MovieResumeInterface[]
}

export default function Home({upcoming}:props) {
  return (
    <main>
        <SlideShow upcoming={upcoming}/>
        <div data-theme="light">
            <PosterList mediaType={"movie"} title={"Currently watching"} media={dummyRecommendations.results}/>
            <PosterList mediaType={"movie"} title={"Most watched"} media={dummyRecommendations.results}/>
            <PosterList mediaType={"movie"} title={"Comedy"} media={dummyRecommendations.results}/>
            <PosterList mediaType={"movie"} title={"Dramas"} media={dummyRecommendations.results}/>
        </div>
    </main>
  )
}

export const getStaticProps:GetStaticProps = async () => {
    const {upcoming} = await getHomePage()
    return {
        props: {
            upcoming,
        },
        revalidate:600 //revalidate in 10 minutes
    }
}