import {Fade, SlideshowRef} from "react-slideshow-image";
import arrowStyles from "@/components/Slider/Slider.module.css";
import {NextArrow} from "@/components/Slider/Slider";
import 'react-slideshow-image/dist/styles.css'
import {ReactNode, useRef} from "react";
import {AiOutlineLeft} from "react-icons/ai";
import styles from "./SlideShow.module.css"


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
                prevArrow={<button className={`${arrowStyles.prevArrow} ${styles.arrow}`} onClick={() => {}}>
                    <AiOutlineLeft size={32}/>
                </button>}
                nextArrow={<NextArrow onClick={() => {}} className={styles.arrow}/>}
                indicators={true}
                transitionDuration={500}
            >
                {children}
            </Fade>
        </div>
    )
}

