import {ReactNode} from "react";
import {Footer} from "@/components/Layout/Footer";
import { NavBar } from "./NavBar";
import {Header} from "@/components/Layout/Header";
import styles from "./layout.module.css"

type props = {
    children:ReactNode
}

export function Layout({children}:props){
    return (
        <div className={styles.pageContainer}>
            <Header/>
            <NavBar/>
            <main>
                {children}
            </main>
            <Footer/>
        </div>
    )
}