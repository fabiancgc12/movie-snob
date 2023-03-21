import {Section} from "@/components/Section/Section";
import Link from "next/link";
import styles from "./notFound.module.css"

type props = {
    title:string
}
export function ErrorPageComponent({title}:props){
    return (
        <div data-theme={"light"}  className={"full-h"}>
            <Section title={title}>
                <div className={styles.links}>
                    <Link href={"/"} role={"button"}>Home</Link>
                    <Link href={"/discover"} role={"button"} className={"secondary"}>Discover</Link>
                </div>
            </Section>
        </div>
    )
}