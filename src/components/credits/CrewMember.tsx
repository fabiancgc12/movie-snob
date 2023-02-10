import {CastEntity, CrewEntity} from "@/utils/models/Movies/Credits.interface";
import styles from "./CrewMember.module.css";
import Image from "next/image";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";

type props = {
    size:"sm" | "md"
    }
    & ({
        people:CrewEntity,
        type:"crew"
    } | {
        people:CastEntity,
        type:"cast"
    })
export function CrewMember({people,type,size = "md"}:props){
    let job = type == "crew" ? people.job : people.character;
    let sizeStyle = size == "sm" ? styles.small : styles.medium
    return (
        <div className={`${styles.wrapper} ${sizeStyle}`}>
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
        </div>
    )
}