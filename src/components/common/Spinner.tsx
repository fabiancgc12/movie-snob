import styles from "./Spinner.module.css";
import {FaSpinner} from "react-icons/fa";

export function Spinner(){
    return (<div className={styles.loader}>
        <FaSpinner className={`fa-spin`} size={32}/>
    </div>)
}