import styles from "./CrewMemberCard.module.css";
import Image from "next/image";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";
import placeholder from "../../../public/noPhotographyPlaceholder.svg"
import {PeopleDto} from "@/utils/models/dto/Credit.dto";

type baseProps = {
    size:"sm" | "md",
    shadow?:boolean
}

type props = baseProps
    & {
    people:PeopleDto
}
export function MemberCard({people,size,shadow = true}:props){
    let sizeStyle = size == "sm" ? styles.small : styles.medium;
    let shadowStyle = !shadow ? styles.noShadow : "";
    const image = people.profile_path ? generateImageUrl(people.profile_path) : placeholder
    return (
        <article className={`${styles.wrapper} ${sizeStyle} ${shadowStyle}`}>
            <div className={styles.profile}>
                <Image
                    src={image}
                    alt={`${people.name} profile`}
                    fill
                    className={people.profile_path ? "" : "placeholderImage"}
                />
            </div>
            <h6 className={styles.name}>{people.name}</h6>
            <div className={styles.description}>
                <p>{people.role}</p>
                {people.total_episode_count && <p className={styles.episodes}>Total episodes: {people.total_episode_count}</p>}
            </div>
        </article>
    )
}

type crewProps = baseProps & {people:PeopleDto}

export function CrewMemberCard({people,...rest}:crewProps){
    return (
        <MemberCard people={people} {...rest}/>
    )
}

type MovieCastCard = baseProps
    & {
        actor:PeopleDto
    }

export function MovieCastMemberCard({actor,...rest}:MovieCastCard){
    return (
        <MemberCard {...rest} people={actor}/>
    )
}

type TvCastCard = baseProps
    & {
    actor:PeopleDto
}

export function TvMemberCard({actor,...rest}:TvCastCard){
    return (
        <MemberCard {...rest} people={actor}/>
    )
}

