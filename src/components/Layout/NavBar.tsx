import styles from "./NavBar.module.css"
import {FaBookmark} from "react-icons/fa";
import {AiFillHeart} from "react-icons/ai";
import {MdLocalMovies, MdLanguage, MdModeNight, MdSunny} from "react-icons/md";
import Link from "next/link";
import Image from "next/image"
import logo from "@public/logo.png";
import {useShowNavBarContext} from "@/global/ShowNavbarContext";
import useClickOutside from "@/hooks/useClickOutside";
import {useRef} from "react";
import {usePathname} from "next/navigation";
import useTranslation from "next-translate/useTranslation";
import {useTheme} from "@/global/ThemeContext";

type props = {
    className?: string
}

const navItems = [{
    icon: <FaBookmark/>,
    label: "marked",
    url: "/bookmark"
}, {
    icon: <AiFillHeart/>,
    label: "liked",
    url: "/liked"
}, {
    icon: <MdLocalMovies/>,
    label: "discover",
    url: "/discover"
},
    {
        icon: <MdLanguage/>,
        label: "language",
        url: "/",
        switchLanguage: true
    }
]

export function NavBar({className = ""}: props) {
    const {t, lang} = useTranslation('common')
    const pathname = usePathname();
    const [show, setShow] = useShowNavBarContext()
    const ref = useRef<HTMLElement>(null)
    useClickOutside(ref, () => {
        if (show)
            setShow(false)
    })

    const nextLocale: string = lang === "es" ? "en-US" : "es"
    return (
        <aside ref={ref} className={`${className} ${styles.aside} ${show ? styles.show : ""}`}>
            <nav className={styles.navigation}>
                <div className={styles.logo}>
                    <Link href={`/${lang}`} className={styles.link}>
                        <Image src={logo} alt={"logo"}/>
                    </Link>
                </div>
                {navItems.map(item => {
                    const label = t(item.label)
                    const itemPath = `/${lang}${item.url}`
                    const isActive = pathname === itemPath || pathname.startsWith(itemPath + "/")
                    return (
                        <div
                            key={`nav-item-${item.label}`}
                            className={`${styles.item} ${(isActive && !item.switchLanguage) ? styles.active : ""}`}
                        >
                            {
                                item.switchLanguage
                                    ? <Link
                                        href={pathname}
                                        className={styles.link}
                                        locale={nextLocale}
                                    >
                                        {item.icon}
                                        <p className={styles.label}>{label}</p>
                                    </Link>
                                    : <Link href={itemPath} className={styles.link}>
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

function SwitchThemeButton() {
    const [theme, setTheme] = useTheme();
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
