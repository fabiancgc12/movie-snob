import styles from "./Slider.module.css"
import {ReactNode, useCallback, useEffect, useMemo, useRef, useState} from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import {useInView} from "react-intersection-observer";
import {SliderProvider} from "./SliderContext";

type props = {
    className?:string,
    children:ReactNode,
    arrowsInContent?:boolean,
    speed:number,
    endElement?:ReactNode
}

export function Slider({className = "",children,arrowsInContent = true,speed}:props){
    const sliderRef = useRef<HTMLElement>(null);
    const [endElementRef,endInView] = useInView({
        threshold:1,
        rootMargin:"700px",
        root:sliderRef.current,
    });
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

    useEffect(() => {
        onScroll()
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('resize', onScroll);
        };
    },[onScroll])
    const providerMemo = useMemo(() => ({
            isEndVisible: endInView
        }),
        [endInView]
    );

    const arrowsInContentStyle = arrowsInContent ? styles.arrowsInContent : ""
    const fadeLeftArrow = showPrevArrow ? styles.fadeIn : styles.fadeOut
    const fadeRightArrow = showNextArrow ? styles.fadeIn : styles.fadeOut;


    return (
        <SliderProvider value={providerMemo}>
            <div className={`${className} ${styles.slider}`}>
                <PrevArrow className={`${arrowsInContentStyle} ${fadeLeftArrow}`} onClick={() => moveSlider(speed*(-1))}/>
                <figure className={styles.track} ref={sliderRef} onScroll={onScroll}>
                    {children}
                    <div ref={endElementRef}></div>
                </figure>
                <NextArrow className={`${arrowsInContentStyle} ${fadeRightArrow}`} onClick={() => moveSlider(speed)}/>
            </div>
        </SliderProvider>
    )
}

type ArrowProps = {
    onClick: () => void,
    className?:string
}

export const NextArrow = ({onClick,className = ""}:ArrowProps) => {
    return (
        <button
            className={`${styles.nextArrow} ${className}`}
            onClick={onClick}
        >
            <AiOutlineRight size={32}/>
        </button>
    );
}

export function PrevArrow({onClick,className = ""}:ArrowProps) {
    return (
        <button
            className={`${styles.prevArrow} ${className}`}
            onClick={onClick}
        >
            <AiOutlineLeft size={32}/>
        </button>
    );
}