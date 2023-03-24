import styles from "./CastSection.module.css";
import {MemberCard} from "@/components/CrewMember/CrewMemberCard";
import {Section} from "@/components/Section/Section";
import {Slider} from "@/components/Slider/Slider";
import {ReactNode} from "react";
import {PeopleDto} from "@/models/dto/Credit.dto";
import useTranslation from "next-translate/useTranslation";

type props = {
    children:ReactNode
}
export function Cast({children}:props){
    const {t} = useTranslation("movieortv")
    const castTitle = t("castLabel")
    return (
        <Section title={castTitle}>
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
    const {t} = useTranslation("movieortv")
    const castTitle = t("castLabel")
    const castFallbackMessage = t("castFallbackMessage")
    if (!cast || cast.length == 0){
        return <Section title={castTitle}>
            <p>{castFallbackMessage}</p>
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

