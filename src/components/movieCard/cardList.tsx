import styles from "@/components/movieCard/cardList.module.css";
import {MovieCard} from "@/components/movieCard/movieCard";
import {Section} from "@/components/common/Section/Section";
import {MovieInterface} from "@/utils/models/Movies/Movie.interface";
import {RecommendationInterface} from "@/utils/models/Movies/RecomendationResult.interface";
import {Slider} from "@/components/Slider/Slider";

type props = {
    title:string,
    movies:(MovieInterface | RecommendationInterface)[]
}

export function CardList({title,movies}:props){
    return (
        <Section className={styles.section} title={title}>
            <Slider speed={300} arrowsInContent={true}>
                {movies?.map((e,i) => <MovieCard data={e} key={`card-${i}`}/>)}
            </Slider>
        </Section>

    )
}