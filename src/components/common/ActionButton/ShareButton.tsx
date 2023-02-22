import {ActionButton} from "@/components/common/ActionButton/ActionButton";
import {useState} from "react";
import styles from "./ShateButton.module.css"
import {WhatsappIcon, WhatsappShareButton} from "react-share";

type props = {
    title:string,
    url:string
}

//TODO add functionality to sharebutton
export function ShareButton({url,title}:props){
    const [show, setShow] = useState(false);
    // const showOptions
    return (
        <div className={styles.wrapper}>
            <ActionButton onClick={() => {}} className={`secondary`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z" clipRule="evenodd" />
                </svg>
            </ActionButton>
            <div className={styles.options}>
                <WhatsappShareButton url={url} title={title}>
                    <WhatsappIcon/>
                </WhatsappShareButton>
            </div>
        </div>

    )
}