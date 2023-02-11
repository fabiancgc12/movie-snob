import {CastEntity} from "@/utils/models/Movies/Credits.interface";
import styles from "./CastList.module.css";
import {CrewMemberCard} from "@/components/CrewMember/CrewMemberCard";

type props = {
    cast?:CastEntity[] | null
}
export function Cast({cast}:props){
    if (!cast) return null;
    return (
        <section>
            <h2>Cast</h2>
            <figure className={styles.cast}>
                {cast.slice(0,12).map(c => <CrewMemberCard key={`cast-${c.id}`} size={"md"} people={c} type={"cast"}/>)}
            </figure>
        </section>
    )
}