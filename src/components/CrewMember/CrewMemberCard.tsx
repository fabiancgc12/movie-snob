import {CastEntity, CrewDto} from "@/utils/models/Movies/CreditsResponse.interface";
import styles from "./CrewMemberCard.module.css";
import Image from "next/image";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";
import placeholder from "../../../public/noPhotographyPlaceholder.svg"
import {AggregateCastEntity} from "@/utils/models/tv/TvCast.interface";

type baseProps = {
    size:"sm" | "md",
    shadow?:boolean
}

type props = baseProps
    & {
    people:{
        profile_path?:string | null
        name:string
        job:string,
        episode_count?:number
    }
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
                <p>{people.job}</p>
                {people.episode_count && <p className={styles.episodes}>Total episodes: {people.episode_count}</p>}
            </div>
        </article>
    )
}

type crewProps = baseProps & {people:CrewDto}

export function CrewMemberCard({people,...rest}:crewProps){
    return (
        <MemberCard people={people} {...rest}/>
    )
}

type MovieCastCard = baseProps
    & {
        actor:CastEntity
    }

export function MovieCastMemberCard({actor,...rest}:MovieCastCard){
    const people = {
        profile_path:actor.profile_path,
        id:actor.id,
        name:actor.name,
        job:actor.character
    }
    return (
        <MemberCard {...rest} people={people}/>
    )
}

type TvCastCard = baseProps
    & {
    actor:AggregateCastEntity
}

export function TvMemberCard({actor,...rest}:TvCastCard){
    const people = {
        profile_path:actor.profile_path,
        id:actor.id,
        name:actor.name,
        job:"",
        episode_count:actor.total_episode_count
    }
        if (actor.roles){
            const role = actor.roles[0]
            people.job = `${role.character}`
        }
    return (
        <MemberCard {...rest} people={people}/>
    )
}

