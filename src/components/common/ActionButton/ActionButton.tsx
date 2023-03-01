import styles from "./ActionButton.module.css";
import {ReactNode} from "react";

type props = {
    onClick: () => void,
    className?:string,
    children:ReactNode,
    size?: "xs" | "sm" | "md"
}

export function ActionButton({onClick,className = "",size = "md",children}:props) {
    let sizeStyles = "";
    if (size == "sm")
        sizeStyles = styles.sm
    else if (size == "xs")
        sizeStyles = styles.xs
    return (
        <button className={`${styles.button} ${sizeStyles} ${className}`} onClick={onClick}>
            {children}
        </button>
    )
}