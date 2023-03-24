import {useShowNavBarContext} from "@/global/ShowNavbarContext";
import {CiMenuBurger} from "react-icons/ci";
import styles from "./header.module.css"
import {FormEvent, useRef} from "react";
import Image from "next/image"
import wideLogo from "@public/logo-wide.png"
import Link from "next/link";
import {useRouter} from "next/router";
import useTranslation from 'next-translate/useTranslation'

type props = {
    className?:string
}

export function Header({className = ""}:props){
    const { t } = useTranslation('common')
    const [showNavBar,setShowNavBar] = useShowNavBarContext()
    const searchRef = useRef<HTMLInputElement>(null);
    const router = useRouter()
    const onSubmit = (e:FormEvent) => {
        e.preventDefault();
        if (searchRef.current?.value)
            router.push(`/search?title=${searchRef.current.value}`)
    }
    const placeholder = t("searchPlaceHolder")
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
            <form className={styles.search} onSubmit={onSubmit}>
                <input type={"search"} placeholder={placeholder} ref={searchRef}/>
            </form>
        </header>
    )
}