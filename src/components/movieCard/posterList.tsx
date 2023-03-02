import styles from "@/components/movieCard/cardList.module.css";
import {PosterCard} from "@/components/movieCard/posterCard";
import {Section} from "@/components/Section/Section";
import {MovieInterface} from "@/utils/models/Movies/Movie.interface";
import {RecommendationInterface} from "@/utils/models/Movies/RecomendationResponse.interface";
import {Slider} from "@/components/Slider/Slider";

type props = {
    title:string,
    media:(MovieInterface | RecommendationInterface)[],
    mediaType:"tv" | "movie"
}

export function PosterList({title,media,mediaType}:props){
    return (
        <Section className={styles.section} title={title}>
            <Slider speed={450} arrowsInContent={true}>
                {media?.map((e, i) => <PosterCard data={e} mediaType={mediaType} key={`card-${i}`}/>)}
            </Slider>
        </Section>

    )
}