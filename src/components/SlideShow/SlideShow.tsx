import {Fade, SlideshowRef} from "react-slideshow-image";
import arrowStyles from "@/components/Slider/Slider.module.css";
import {NextArrow} from "@/components/Slider/Slider";
import 'react-slideshow-image/dist/styles.css'
import {ReactNode, useRef} from "react";

type props = {
    children:ReactNode
}

export function SlideShow({children}:props){
    const slideRef = useRef<SlideshowRef>(null)
    // using the prevArrow component causes the slide the always go forward,
    // for some reason using a component makes it to go always forward and using only a button makes it works
    return (
        <div>
            <Fade
                ref={slideRef}
                prevArrow={<button className={`${arrowStyles.prevArrow}`} onClick={() => {}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>}
                nextArrow={<NextArrow onClick={() => {}}/>}
                indicators={true}
            >
                {children}
            </Fade>
        </div>
    )
}

