import styles from "./NavBar.module.css"
import {FaBookmark} from "react-icons/fa";
import {AiFillHeart} from "react-icons/ai";
import {MdLocalMovies,MdLanguage,MdModeNight,MdSunny} from "react-icons/md";
import Link from "next/link";
import Image from "next/image"
import logo from "@public/logo.png";
import {useShowNavBarContext} from "@/global/ShowNavbarContext";
import useClickOutside from "@/hooks/useClickOutside";
import {useRef} from "react";
import {useRouter} from "next/router";
import useTranslation from "next-translate/useTranslation";
import {useTheme} from "@/global/ThemeContext";

type props = {
    className?:string
}

const navItems = [{
    icon:<FaBookmark />,
    label:"marked",
    url:"/bookmark"
},{
    icon:<AiFillHeart/>,
    label:"liked",
    url:"/liked"
},{
    icon:<MdLocalMovies/>,
    label:"discover",
    url:"/discover"
},
{
    icon:<MdLanguage/>,
    label:"language",
    url:"/",
    switchLanguage:true
}
]

export function NavBar({className = ""}:props){
    const { t } = useTranslation('common')
    const router = useRouter();
    const [show,setShow] = useShowNavBarContext()
    const ref = useRef<HTMLElement>(null)
    useClickOutside(ref,() => {
        if (show)
            setShow(false)
    })

    //if locale is in spanish then set false (default) if not then set to spanish
    // const nextLocale = router.locale == "es" ? "en-US" : "es";
    const nextLocale:string = router.locales?.find(l => l != router.locale) ?? "es"
    return (
        <aside ref={ref} className={`${className} ${styles.aside} ${show ? styles.show : ""}`}>
            <nav className={styles.navigation}>
                <div className={styles.logo}>
                    <Link href={"/"} className={styles.link}>
                        <Image src={logo} alt={"logo"}/>
                    </Link>
                </div>
                {navItems.map(item => {
                    const label = t(item.label)
                    return (
                        <div
                            key={`nav-item-${item.label}`}
                            className={`${styles.item} ${(router.pathname == item.url && !item.switchLanguage) ? styles.active : ""}`}
                        >
                            {
                                item.switchLanguage
                                    ? <Link
                                            href={{
                                                pathname:router.pathname,
                                                query:router.query
                                            }}
                                            className={styles.link}
                                            locale={nextLocale}
                                    >
                                        {item.icon}
                                        <p className={styles.label}>{label}</p>
                                    </Link>
                                    : <Link href={item.url} className={styles.link}>
                                        {item.icon}
                                        <p className={styles.label}>{label}</p>
                                    </Link>
                            }
                        </div>
                    )
                })}
                <SwitchThemeButton/>
            </nav>
        </aside>
    )
}

function SwitchThemeButton(){
    const [theme,setTheme] = useTheme();
    const {t} = useTranslation("common");
    const themeLabel = t("theme")
    return (
        <div className={styles.item}>
            <div onClick={setTheme} className={`${styles.link} ${styles.switchLanguageButton}`}>
                <div className={`${styles.witchLanguageIcons} ${theme == "dark" ? styles.showDarkModeIcon : ""}`}>
                    <MdModeNight/>
                    <MdSunny/>
                </div>
                <p className={styles.label}>{themeLabel}</p>
            </div>
        </div>
    )
}