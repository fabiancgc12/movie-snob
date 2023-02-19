import {CastEntity} from "@/utils/models/Movies/CreditsResponse.interface";
import styles from "./CastList.module.css";
import {CrewMemberCard} from "@/components/CrewMember/CrewMemberCard";
import {Section} from "@/components/common/Section/Section";
import {Slider} from "@/components/Slider/Slider";

type props = {
    cast?:(CastEntity)[] | null
}
export function Cast({cast}:props){
    if (!cast) return null;
    return (
        <Section title={"Cast"}>
            <Slider className={styles.castSm} arrowsInContent={true} speed={250}>
                {cast.slice(0,12).map(c =>
                    <CrewMemberCard size={"md"} people={c} type={"cast"} key={`cast-${c.id}`}/>
                )}
            </Slider>
            <div className={styles.castMd}>
                {cast.slice(0,12).map(c => <CrewMemberCard key={`cast-${c.id}`} size={"md"} people={c} type={"cast"}/>)}
            </div>
        </Section>
    )
}