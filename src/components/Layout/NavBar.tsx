import styles from "./NavBar.module.css"
import {FaBookmark} from "react-icons/fa";
import {AiFillHeart} from "react-icons/ai";
import {BiUserCircle} from "react-icons/bi";
import {MdLocalMovies} from "react-icons/md";
import Link from "next/link";
import Image from "next/image"
import logo from "@public/logo.png";

type props = {
    className?:string
}

const navItems = [{
    icon:<FaBookmark />,
    label:"Marked"
},{
    icon:<AiFillHeart />,
    label:"Liked"
},{
    icon:<MdLocalMovies />,
    label:"Discover"
},
{
    icon:<BiUserCircle />,
    label:"User"
}]


export function NavBar({className = ""}:props){
    return (
        <aside className={`${className} ${styles.aside}`}>
            <nav className={styles.navigation}>
                <div className={styles.logo}>
                    <Link href={"/"} className={styles.link}>
                        <Image src={logo} alt={"logo"}/>
                    </Link>
                </div>
                {navItems.map(item => (
                    <div key={`nav-item-${item.label}`} className={styles.item}>
                        <Link href={"#"} className={styles.link} >
                            {item.icon}
                            <p className={styles.label}>{item.label}</p>
                        </Link>
                    </div>
                ))}
            </nav>
        </aside>
    )
}