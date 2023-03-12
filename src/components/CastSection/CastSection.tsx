import styles from "./CastSection.module.css";
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
            <Slider className={styles.castSm} speed={250}>
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

export function CastSection({cast}:movieProps){
    if (!cast) return null;
    if (cast.length == 0){
        return <Section title={"Cast"}>
            <p>Currently we dont have any cast on our database for this movie/tv show.</p>
        </Section>
    }
    return (
        <Cast>
            {cast.slice(0,12).map(c =>
                <MemberCard size={"md"} people={c} key={`cast-${c.id}`}/>
            )}
        </Cast>
    )
}

