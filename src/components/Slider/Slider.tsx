import styles from "./Slider.module.css"
import {ReactNode, useCallback, useRef, useState} from "react";

type props = {
    className?:string,
    children:ReactNode,
    arrowsInContent?:boolean,
}

export function Slider({className = "",children,arrowsInContent = false}:props){
    const sliderRef = useRef<HTMLElement>(null)
    const [showPrevArrow, setShowPrevArrow] = useState(false);
    const [showNextArrow, setShowNextArrow] = useState(true);

    const onScroll = useCallback(
        () => {
            if (sliderRef?.current){
                //if scrollLeft is 0 then hide the left arrow
                setShowPrevArrow(!!sliderRef.current.scrollLeft)
                let {scrollWidth,offsetWidth} = sliderRef.current;

                // calculating if scroll has reached the end
                //the -10 is to give it a margin of error
                setShowNextArrow(sliderRef.current.scrollLeft < (scrollWidth - offsetWidth - 10))
            }
        },
        [],
    );


    const moveSlider = useCallback(
    (scrollValue:number) => {
        if (sliderRef?.current){
            sliderRef.current.scrollLeft+=scrollValue
            onScroll()
            }
        },
    [onScroll],
    );

    const arrowsInContentStyle = arrowsInContent ? styles.arrowsInContent : ""
    const fadeLeftArrow = showPrevArrow ? styles.fadeIn : styles.fadeOut
    const fadeRightArrow = showNextArrow ? styles.fadeIn : styles.fadeOut
    return (
        <div className={`${className} ${styles.slider}`}>
            <PrevArrow className={`${arrowsInContentStyle} ${fadeLeftArrow}`} onClick={() => moveSlider(-300)}/>
            <figure className={styles.track} ref={sliderRef} onScroll={onScroll}>
                {children}
            </figure>
            <NextArrow className={`${arrowsInContentStyle} ${fadeRightArrow}`} onClick={() => moveSlider(300)}/>
        </div>
    )
}

type ArrowProps = {
    onClick: () => void,
    className?:string
}

const NextArrow = ({onClick,className = ""}:ArrowProps) => {
    return (
        <button
            className={`${styles.nextArrow} ${className}`}
            onClick={onClick}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
        </button>
    );
}

function PrevArrow({onClick,className = ""}:ArrowProps) {
    return (
        <button
            className={`${styles.prevArrow} ${className}`}
            onClick={onClick}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
        </button>
    );
}