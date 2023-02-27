import {ReactNode} from "react";
import { Fade } from "react-slideshow-image";
import arrowStyles from "@/components/Slider/Slider.module.css";
import {NextArrow} from "@/components/Slider/Slider";
import 'react-slideshow-image/dist/styles.css'

type props = {
    children:ReactNode
}

export function SlideShow({children}:props){
    // using the prevArrow component causes the slide the always go forward,
    // using only a button makes it works
    return (
        <Fade
            transitionDuration={500}
            duration={100000}
            prevArrow={<button
                className={`${arrowStyles.prevArrow}`}
                onClick={() => {}}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>}
            nextArrow={<NextArrow onClick={() => {}}/>}
            indicators={true}
        >
            {children}
        </Fade>
    )
}