import {ReactNode} from "react";
import styles from "./Section.module.css";

type props = {
    title:string,
    size?: "sm" | "md",
    className?:string,
    children:ReactNode
}

export function Section({title,children,className = "",size = "md"}:props){
    const sizeStyle = size == "sm" ? styles.small : ""
    return (
        <section className={`${styles.wrapper} ${className}`}>
            <h3 className={`${styles.title} ${sizeStyle}`}>{title}</h3>
            {children}
        </section>
    )
}