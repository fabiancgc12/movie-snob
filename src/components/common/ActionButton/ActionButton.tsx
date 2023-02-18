import styles from "./ActionButton.module.css";
import {ReactNode} from "react";

type props = {
    onClick: () => void,
    className?:string,
    children:ReactNode
}

export function ActionButton({onClick,className = "",children}:props) {
    return (
        <button className={`${styles.button} ${className}`} onClick={onClick}>
            {children}
        </button>
    )
}