import React, {CSSProperties, useMemo} from "react";
import styles from "./Average.module.css";

type props = {
    value:number,
    size?:"sm" | "md" | "bg"
}

export function Average({value,size = "md"}:props) {
    const properties = useMemo(() => ({
        "--degree":(value*360/10).toString() + "deg"
    } as CSSProperties), [value]);
    const average = value*10
    let sizeStyle = "";
    if (size == "sm")
        sizeStyle = styles.small
    else if (size == "bg")
        sizeStyle = styles.bg
    return (
        <div className={`${styles.average} ${sizeStyle}`} style={properties}>
            <span>{Math.trunc(average)}%</span>
        </div>
    )
}