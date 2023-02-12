import {CastEntity} from "@/utils/models/Movies/Credits.interface";
import styles from "./CastList.module.css";
import {CrewMemberCard} from "@/components/CrewMember/CrewMemberCard";
import {Section} from "@/components/common/Section/Section";
import {Slider} from "@/components/Slider/Slider";
import useMediaQuery from "@/utils/hooks/useMediaQuery";

type props = {
    cast?:CastEntity[] | null
}
export function Cast({cast}:props){
    const matchBigScreen = useMediaQuery("(min-width: 768px)")
    if (!cast) return null;
    if (!matchBigScreen)
        return (
            <Section title={"Cast"}>
                <Slider arrowsInContent={true}>
                    {cast.slice(0,12).map(c => <CrewMemberCard key={`cast-${c.id}`} size={"md"} people={c} type={"cast"}/>)}
                </Slider>
            </Section>
        )
    return (
        <Section title={"Cast"}>
            <div className={styles.cast}>
                {cast.slice(0,12).map(c => <CrewMemberCard key={`cast-${c.id}`} size={"md"} people={c} type={"cast"}/>)}
            </div>
        </Section>
    )
}