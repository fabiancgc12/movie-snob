import styles from "./CastList.module.css";
import {MemberCard} from "@/components/CrewMember/CrewMemberCard";
import {Section} from "@/components/Section/Section";
import {Slider} from "@/components/Slider/Slider";
import {ReactNode} from "react";
import {PeopleDto} from "@/models/dto/Credit.dto";

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
    cast?:(PeopleDto)[] | null,
}

export function MovieCast({cast}:movieProps){
    if (!cast) return null;
    return (
        <Cast>
            {cast.slice(0,12).map(c =>
                <MemberCard size={"md"} people={c} key={`cast-${c.id}`}/>
            )}
        </Cast>
    )
}

type tvProps = {
    cast?:(PeopleDto)[] | null,
}

export function TvCast({cast}:tvProps){
    if (!cast) return null;
    return (
        <Cast>
            {cast.slice(0,12).map(c =>
                <MemberCard size={"md"} people={c} key={`cast-${c.id}`}/>
            )}
        </Cast>
    )
}