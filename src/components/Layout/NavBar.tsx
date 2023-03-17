import styles from "./NavBar.module.css"
import {FaBookmark} from "react-icons/fa";
import {AiFillHeart} from "react-icons/ai";
import {BiUserCircle} from "react-icons/bi";
import {MdLocalMovies} from "react-icons/md";
import Link from "next/link";
import Image from "next/image"
import logo from "@public/logo.png";
import {useShowNavBarContext} from "@/global/ShowNavbarContext";
import useClickOutside from "@/hooks/useClickOutside";
import {useRef} from "react";
import {useRouter} from "next/router";

type props = {
    className?:string
}

const navItems = [{
    icon:<FaBookmark />,
    label:"Marked",
    url:"/bookmark"
},{
    icon:<AiFillHeart />,
    label:"Liked",
    url:"#"
},{
    icon:<MdLocalMovies />,
    label:"Discover",
    url:"#"
},
{
    icon:<BiUserCircle />,
    label:"User",
    url:"#"
}]


export function NavBar({className = ""}:props){
    const router = useRouter();
    const [show,setShow] = useShowNavBarContext()
    const ref = useRef<HTMLElement>(null)
    useClickOutside(ref,() => {
        if (show)
            setShow(false)
    })
    return (
        <aside ref={ref} className={`${className} ${styles.aside} ${show ? styles.show : ""}`}>
            <nav className={styles.navigation}>
                <div className={styles.logo}>
                    <Link href={"/"} className={styles.link}>
                        <Image src={logo} alt={"logo"}/>
                    </Link>
                </div>
                {navItems.map(item => (
                    <div
                        key={`nav-item-${item.label}`}
                        className={`${styles.item} ${ router.pathname == item.url ? styles.active : ""}`}
                    >
                        <Link href={item.url} className={styles.link} >
                            {item.icon}
                            <p className={styles.label}>{item.label}</p>
                        </Link>
                    </div>
                ))}
            </nav>
        </aside>
    )
}