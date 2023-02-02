import React, {CSSProperties, useMemo} from "react";
import styles from "./average.module.css";

type props = {
    value:number,
}

export function Average({value}:props) {
    const properties = useMemo(() => ({
        "--degree":(value*360/10).toString() + "deg"
    } as CSSProperties), [value]);

    return (
        <div className={styles.average} style={properties}>
            <span>{value}</span>
        </div>
    )
}