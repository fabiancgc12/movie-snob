import {CastEntity} from "@/utils/models/Movies/Credits.interface";
import styles from "./CastList.module.css";
import {CrewMemberCard} from "@/components/CrewMember/CrewMemberCard";
import {Section} from "@/components/common/Section/Section";

type props = {
    cast?:CastEntity[] | null
}
export function Cast({cast}:props){
    if (!cast) return null;
    return (
        <Section title={"Cast"}>
            <figure className={styles.cast}>
                {cast.slice(0,12).map(c => <CrewMemberCard key={`cast-${c.id}`} size={"md"} people={c} type={"cast"}/>)}
            </figure>
        </Section>
    )
}