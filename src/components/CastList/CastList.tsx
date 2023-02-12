import {CastEntity} from "@/utils/models/Movies/Credits.interface";
import styles from "./CastList.module.css";
import {CrewMemberCard} from "@/components/CrewMember/CrewMemberCard";
import {Section} from "@/components/common/Section/Section";
import {Slider} from "@/components/Slider/Slider";

type props = {
    cast?:CastEntity[] | null
}
export function Cast({cast}:props){
    if (!cast) return null;
    let settings = {
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2
    };
    return (
        <Section title={"Cast"}>
            <Slider settings={settings}>
                {cast.slice(0,12).map(c => <CrewMemberCard key={`cast-${c.id}`} size={"md"} people={c} type={"cast"}/>)}
            </Slider>
        </Section>
    )
    // return (
    //     <Section title={"Cast"}>
    //         <figure className={styles.cast}>
    //             {cast.slice(0,12).map(c => <CrewMemberCard key={`cast-${c.id}`} size={"md"} people={c} type={"cast"}/>)}
    //         </figure>
    //     </Section>
    // )
}