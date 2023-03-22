import {useShowNavBarContext} from "@/global/ShowNavbarContext";
import {CiMenuBurger} from "react-icons/ci";
import styles from "./header.module.css"
import {useRef} from "react";
import Image from "next/image"
import wideLogo from "@public/logo-wide.png"
import Link from "next/link";

type props = {
    className?:string
}

export function Header({className = ""}:props){
    const [showNavBar,setShowNavBar] = useShowNavBarContext()
    const searchRef = useRef(null);
    return (
        <header className={`${className} ${styles.wrapper}`}>
            <button
                onClick={() => setShowNavBar(!showNavBar)}
                className={`${styles.button} outline contrast`}
                    >
                <CiMenuBurger />
            </button>
            <div className={styles.logo}>
                <Link href={"/"} className={styles.link}>
                    <Image src={wideLogo} alt={"wide logo"} fill/>
                </Link>
            </div>
            <div className={styles.search}>
                <input type={"search"} placeholder={"search..."} ref={searchRef}/>
            </div>
        </header>
    )
}