import styles from "./NavBar.module.css"
import {FaBookmark} from "react-icons/fa";
import {AiFillHeart} from "react-icons/ai";
import {MdLocalMovies, MdLanguage, MdModeNight, MdSunny} from "react-icons/md";
import Link from "next/link";
import Image from "next/image"
import logo from "@public/logo.png";
import {useShowNavBarContext} from "@/global/ShowNavbarContext";
import useClickOutside from "@/hooks/useClickOutside";
import {ReactNode, useRef} from "react";
import {usePathname} from "next/navigation";
import {useTranslations, useLocale} from "next-intl";
import {useTheme} from "@/global/ThemeContext";

type props = {
    className?: string
}

type NavItemType = {
    icon:ReactNode,
    label: string
    url: string
    switchLanguage?: boolean
}

const navItems = [{
    icon: <FaBookmark/>,
    label: "marked",
    url: "/bookmark",
    switchLanguage: false
}, {
    icon: <AiFillHeart/>,
    label: "liked",
    url: "/liked",
    switchLanguage: false
}, {
    icon: <MdLocalMovies/>,
    label: "discover",
    url: "/discover",
    switchLanguage: false
},
    {
        icon: <MdLanguage/>,
        label: "language",
        url: "/",
        switchLanguage: true
    }
] as const satisfies NavItemType[]

export function NavBar({className = ""}: props) {
    const t = useTranslations('common')
    const locale = useLocale()
    const pathname = usePathname();
    const [show, setShow] = useShowNavBarContext()
    const ref = useRef<HTMLElement>(null)
    useClickOutside(ref, () => {
        if (show)
            setShow(false)
    })

    const nextLocale: string = locale === "es" ? "en-US" : "es"
    return (
        <aside ref={ref} className={`${className} ${styles.aside} ${show ? styles.show : ""}`}>
            <nav className={styles.navigation}>
                <div className={styles.logo}>
                    <Link href={`/${locale}`} className={styles.link}>
                        <Image src={logo} alt={"logo"}/>
                    </Link>
                </div>
                {navItems.map(item => {
                    const label = t(item.label)
                    const itemPath = `/${locale}${item.url}`
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
    const t = useTranslations("common");
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
