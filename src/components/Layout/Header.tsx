import {useShowNavBarContext} from "@/global/ShowNavbarContext";
import {CiMenuBurger} from "react-icons/ci";
import styles from "./header.module.css"

type props = {
    className?:string
}

export function Header({className = ""}:props){
    const [showNavBar,setShowNavBar] = useShowNavBarContext()
    return (
        <header className={`${className} ${styles.wrapper}`}>
            <button
                onClick={() => setShowNavBar(!showNavBar)}
                className={`${styles.openMenu} outline contrast`}
                    >
                <CiMenuBurger />
            </button>
            {/*<button>open</button>*/}
            header
        </header>
    )
}