import styles from "./Slider.module.css"
import {ReactNode, useCallback, useRef} from "react";

type props = {
    className?:string,
    children:ReactNode,
    arrowsInContent?:boolean,
}

export function Slider({className = "",children,arrowsInContent = false}:props){
    const sliderRef = useRef<HTMLElement>(null)

    const moveSlider = useCallback(
    (scrollValue:number) => {
        if (sliderRef.current)
            sliderRef.current.scrollLeft+=scrollValue
        },
    [],
    );

    const arrowsInContentStyle = arrowsInContent ? styles.arrowsInContent : ""

    return (
        <div className={`${className} ${styles.slider}`}>
            <PrevArrow className={arrowsInContentStyle} onClick={() => moveSlider(-300)}/>
            <figure className={styles.track} ref={sliderRef}>
                {children}
            </figure>
            <NextArrow className={arrowsInContentStyle} onClick={() => moveSlider(300)}/>
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