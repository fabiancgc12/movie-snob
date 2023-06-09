import styles from "./CrewMemberCard.module.css";
import Image from "next/image";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";
import placeholder from "../../../public/noPhotographyPlaceholder.svg"
import {PeopleDto} from "@/models/dto/Credit.dto";
import useTranslation from "next-translate/useTranslation";

type props = {
    size:"sm" | "md",
    shadow?:boolean,
    people:PeopleDto

}

export function MemberCard({people,size,shadow = true}:props){
    const {t} = useTranslation("movieortv")
    let sizeStyle = size == "sm" ? styles.small : styles.medium;
    let shadowStyle = !shadow ? styles.noShadow : "";
    const image = people.profile_path ? generateImageUrl(people.profile_path) : placeholder;
    const episodesLabel = t("totalEpisodes")
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
                <p className={styles.role}>{people.role}</p>
                {people.total_episode_count && <p className={styles.episodes}>{episodesLabel}: {people.total_episode_count}</p>}
            </div>
        </article>
    )
}
