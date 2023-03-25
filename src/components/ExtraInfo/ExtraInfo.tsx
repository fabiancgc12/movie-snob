import {Section} from "@/components/Section/Section";
import styles from "./ExtraInfo.module.css"
import {ReactNode} from "react";
import useTranslation from "next-translate/useTranslation";

type props = {
    children:ReactNode
}

export function ExtraInfo({children}:props){
    const {t} = useTranslation("movieortv");
    return (
        <Section title={t("moreLabel")}>
            <div className={styles.wrapper}>
                {children}
            </div>
        </Section>
    )
}





