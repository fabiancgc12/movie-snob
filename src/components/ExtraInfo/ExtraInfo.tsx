import {Section} from "@/components/Section/Section";
import styles from "./ExtraInfo.module.css"
import {ReactNode} from "react";

type props = {
    children:ReactNode
}

export function ExtraInfo({children}:props){
    return (
        <Section title={"More info"}>
            <div className={styles.wrapper}>
                {children}
            </div>
        </Section>
    )
}





