import {ReactNode} from "react";
import styles from "./grid.module.css"

type props = {
    children:ReactNode
}
export function Grid({children}:props){
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    )
}