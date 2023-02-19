import {CastEntity, CrewDto} from "@/utils/models/Movies/CreditsResponse.interface";
import styles from "./CrewMemberCard.module.css";
import Image from "next/image";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";
import placeholder from "../../../public/noPhotographyPlaceholder.svg"

type props = {
    size:"sm" | "md",
    shadow?:boolean
    }
    & ({
        people:CrewDto,
        type:"crew"
    } | {
        people:CastEntity,
        type:"cast"
    })
export function CrewMemberCard({people,type,size,shadow = true}:props){
    let job = type == "crew" ? people.job : people.character;
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
            <h6 className={styles.job}>{job}</h6>
        </article>
    )
}


