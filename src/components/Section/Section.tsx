import {ReactNode} from "react";
import styles from "./Section.module.css";
import Link from "next/link";

export type TitleLinksProps = ({
    title:string,
    titleAsLink:true,
    url:string
} | {
    title:string,
    titleAsLink?:false,
    url?:undefined
});

type props = {
    size?: "sm" | "md",
    className?:string,
    children:ReactNode,
} & TitleLinksProps

export function Section({title,children,titleAsLink,url,className = "",size = "md"}:props){
    const sizeStyle = size == "sm" ? styles.small : "";
    let titleContent:string | ReactNode = title
    if (titleAsLink)
        titleContent = <Link href={url} className={styles.link}>{title}</Link>
    return (
        <section className={`${styles.wrapper} ${className}`}>
            <h3 className={`${styles.title} ${sizeStyle}`}>{titleContent}</h3>
            {children}
        </section>
    )
}