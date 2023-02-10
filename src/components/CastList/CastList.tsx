import {CastEntity} from "@/utils/models/Movies/Credits.interface";
import styles from "./CastList.module.css";
import {CrewMember} from "@/components/credits/CrewMember";

type props = {
    cast?:CastEntity[] | null
}
export function Cast({cast}:props){
    if (!cast) return null;
    return (
        <div>
            <h2>Cast</h2>
            <figure className={styles.cast}>
                {cast.slice(0,9).map(c => <CrewMember key={`cast-${c.id}`} people={c} type={"cast"}/>)}
            </figure>
        </div>
    )
}