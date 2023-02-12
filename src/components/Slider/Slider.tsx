import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Slider.module.css"
import {ReactNode} from "react";

type props = {
    className?:string,
    children:ReactNode,
    settings?:Slick["props"],
    withGap?:boolean
}

export function Slider({className = "",children,withGap = false,settings = {}}:props){
    const gapStyle = withGap ? styles.withGap : ""
    return (
        <Slick
            className={`${className} ${styles.slider} ${gapStyle}`}
            prevArrow=<PrevArrow/>
            nextArrow=<NextArrow/>
            {...settings}
        >
            {children}
        </Slick>
    )
}

const NextArrow = (props:any) => {
    const { className,onClick } = props;
    return (
        <div
            className={`${className} ${styles.nextArrow}`}
            onClick={onClick}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
        </div>
    );
}

function PrevArrow(props:any) {
    const { className,onClick } = props;
    return (
        <div
            className={`${className} ${styles.prevArrow}`}
            onClick={onClick}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
        </div>
    );
}