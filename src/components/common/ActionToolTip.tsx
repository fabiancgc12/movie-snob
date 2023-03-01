import {ReactNode, useRef, useState} from "react";
import useOnClickOutside from "@/hooks/useClickOutside";
import {ActionButton} from "@/components/common/ActionButton/ActionButton";
import styles from "./ActionToolTip.module.css"

type props = {
    children:ReactNode,
    buttonContent:ReactNode,
    buttonSize?: "xs" | "sm" | "md"
}

export function ActionToolTip({children,buttonContent,buttonSize}:props){
    const [show, setShow] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref,() => setShow(false));
    const showOptions = show ? styles.show : ""
    return (
        <div className={styles.wrapper} ref={ref}>
            <ActionButton onClick={() => setShow(!show)} className={`secondary`} size={buttonSize}>
                {buttonContent}
            </ActionButton>
            <div className={`${styles.options} ${showOptions}`} data-theme="light">
                {children}
            </div>
        </div>
    )
}