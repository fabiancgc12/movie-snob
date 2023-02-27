import { MainBanner } from "@/components/mainBanner/MainBanner";
import {PosterList} from "@/components/movieCard/posterList";
import {dummyRecommendations} from "@/services/movies/getMovie";
import {SlideShow} from "@/components/SlideShow/SlideShow";

export default function Home() {
  return (
    <main>
        <SlideShow>
                {dummyRecommendations.results.map(s => <MainBanner key={`banner-${s.id}`} data={s}/>)}
        </SlideShow>
        <PosterList mediaType={"movie"} title={"Currently watching"} media={dummyRecommendations.results}/>
        <PosterList mediaType={"movie"} title={"Most watched"} media={dummyRecommendations.results}/>
        <PosterList mediaType={"movie"} title={"Comedy"} media={dummyRecommendations.results}/>
        <PosterList mediaType={"movie"} title={"Dramas"} media={dummyRecommendations.results}/>
    </main>
  )
}
