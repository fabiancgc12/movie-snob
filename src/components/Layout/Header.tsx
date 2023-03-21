import {useShowNavBarContext} from "@/global/ShowNavbarContext";
import {CiMenuBurger} from "react-icons/ci";
import styles from "./header.module.css"
import {useRef, useState} from "react";
import {ActionButton} from "@/components/common/ActionButton/ActionButton";
import { BiSearch } from "react-icons/bi";
import useClickOutside from "@/hooks/useClickOutside";

type props = {
    className?:string
}

export function Header({className = ""}:props){
    const [showNavBar,setShowNavBar] = useShowNavBarContext()
    const [showSearch,setShowSearch] = useState(false);
    const searchRef = useRef(null);
    useClickOutside(searchRef, () => {
        setShowSearch(false)
    })
    return (
        <header className={`${className} ${styles.wrapper}`}>
            <button
                onClick={() => setShowNavBar(!showNavBar)}
                className={`${styles.button} outline contrast`}
                    >
                <CiMenuBurger />
            </button>
            <div>
                {showSearch && <input type={"text"} placeholder={"search"} ref={searchRef}/>}
                <ActionButton onClick={() => setShowSearch(true)} size={"xs"}>
                    <BiSearch/>
                </ActionButton>
            </div>
        </header>
    )
}