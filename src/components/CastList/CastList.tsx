import {CastEntity} from "@/utils/models/Movies/CreditsResponse.interface";
import styles from "./CastList.module.css";
import {
    MovieCastMemberCard,
    TvMemberCard
} from "@/components/CrewMember/CrewMemberCard";
import {Section} from "@/components/common/Section/Section";
import {Slider} from "@/components/Slider/Slider";
import {AggregateCastEntity} from "@/utils/models/tv/TvCast.interface";
import {ReactNode} from "react";

type props = {
    children:ReactNode
}
export function Cast({children}:props){
    return (
        <Section title={"Cast"}>
            <Slider className={styles.castSm} arrowsInContent={true} speed={250}>
                {children}
            </Slider>
            <div className={styles.castMd}>
                {children}
            </div>
        </Section>
    )
}

type movieProps = {
    cast?:(CastEntity)[] | null,
}

export function MovieCast({cast}:movieProps){
    if (!cast) return null;
    return (
        <Cast>
            {cast.slice(0,12).map(c =>
                <MovieCastMemberCard size={"md"} actor={c} key={`cast-${c.id}`}/>
            )}
        </Cast>
    )
}

type tvProps = {
    cast?:(AggregateCastEntity)[] | null,
}

export function TvCast({cast}:tvProps){
    if (!cast) return null;
    return (
        <Cast>
            {cast.slice(0,12).map(c =>
                <TvMemberCard size={"md"} actor={c} key={`cast-${c.id}`}/>
            )}
        </Cast>
    )
}