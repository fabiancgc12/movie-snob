import React, {CSSProperties, useMemo} from "react";
import styles from "./average.module.css";

type props = {
    value:number,
    size?:"sm" | "md"
}

export function Average({value,size = "md"}:props) {
    const properties = useMemo(() => ({
        "--degree":(value*360/10).toString() + "deg"
    } as CSSProperties), [value]);
    const average = value*10
    const sizeStyle = size == "sm" ? styles.small : ""
    return (
        <div className={`${styles.average} ${sizeStyle}`} style={properties}>
            <span>{average.toFixed(1)}%</span>
        </div>
    )
}