import {ReactNode} from "react";
import {Footer} from "@/components/Layout/Footer";
import { NavBar } from "./NavBar";
import {Header} from "@/components/Layout/Header";

type props = {
    children:ReactNode
}
export function Layout({children}:props){
    return (
        <>
            <Header/>
            <NavBar/>
            <main>
                {children}
            </main>
            <Footer/>
        </>
    )
}