import {CastEntity, CrewEntity} from "@/utils/models/Movies/Credits.interface";
import styles from "./CrewMember.module.css";
import Image from "next/image";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";

type props = {
    people:CrewEntity,
    type:"crew"
} | {
    people:CastEntity,
    type:"cast"
}
export function CrewMember({people,type}:props){
    let job = type == "crew" ? people.job : people.character
    return (
        <div className={styles.wrapper}>
            <div className={styles.profile}>
                {people.profile_path &&
                    <Image
                    src={generateImageUrl(people.profile_path)}
                    alt={`${people.name} profile`}
                    fill
                />}
            </div>
            <span className={styles.name}>{people.name}</span>
            <span className={styles.job}>{job}</span>
        </div>
    )
}