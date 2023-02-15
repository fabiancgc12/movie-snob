import {ReactNode} from "react";
import {Footer} from "@/components/Layout/Footer";

type props = {
    children:ReactNode
}
export function Layout({children}:props){
    return (
        <>
            {children}
            <Footer/>
        </>
    )
}