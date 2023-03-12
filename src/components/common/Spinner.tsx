import styles from "./Spinner.module.css";

export function Spinner(){
    return (<div className={styles.loader} aria-busy={true}></div>)
}