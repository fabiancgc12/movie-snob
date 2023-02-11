import {CastEntity, CrewEntity} from "@/utils/models/Movies/Credits.interface";
import styles from "./CrewMemberCard.module.css";
import Image from "next/image";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";

type props = {
    size:"sm" | "md",
    shadow?:boolean
    }
    & ({
        people:CrewEntity,
        type:"crew"
    } | {
        people:CastEntity,
        type:"cast"
    })
export function CrewMemberCard({people,type,size,shadow = true}:props){
    let job = type == "crew" ? people.job : people.character;
    let sizeStyle = size == "sm" ? styles.small : styles.medium;
    let shadowStyle = !shadow ? styles.noShadow : ""
    return (
        <article className={`${styles.wrapper} ${sizeStyle} ${shadowStyle}`}>
            <div className={styles.profile}>
                {people.profile_path &&
                    <Image
                    src={generateImageUrl(people.profile_path)}
                    alt={`${people.name} profile`}
                    fill
                />}
            </div>
            <h6 className={styles.name}>{people.name}</h6>
            <h6 className={styles.job}>{job}</h6>
        </article>
    )
}