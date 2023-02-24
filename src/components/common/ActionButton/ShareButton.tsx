import {ActionButton} from "@/components/common/ActionButton/ActionButton";
import {useRef, useState} from "react";
import styles from "./ShareButton.module.css"
import {
    FacebookIcon,
    FacebookShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from "react-share";
import useOnClickOutside from "@/hooks/useClickOutside";

type props = {
    title:string,
    url:string
}

//TODO add functionality to sharebutton
export function ShareButton({url,title}:props){
    const [show, setShow] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref,() => setShow(false));
    const showOptions = show ? styles.show : ""
    return (
        <div className={styles.wrapper} ref={ref}>
            <ActionButton onClick={() => setShow(!show)} className={`secondary`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z" clipRule="evenodd" />
                </svg>
            </ActionButton>
            <div className={`${styles.options} ${showOptions}`} data-theme="light">
                <WhatsappShareButton
                    url={url}
                    title={title}
                    className={styles.shareOption}
                >
                    <WhatsappIcon size={32} round={true}/>
                </WhatsappShareButton>
                <TwitterShareButton
                    url={url}
                    title={title}
                    hashtags={[`PopCorn-Search`,title]}
                    className={styles.shareOption}
                >
                    <TwitterIcon size={32} round={true}/>
                </TwitterShareButton>
                <TelegramShareButton
                    url={url}
                    title={title}
                    className={styles.shareOption}
                >
                    <TelegramIcon size={32} round={true}/>
                </TelegramShareButton>
                <FacebookShareButton
                    url={url}
                    hashtag={`PopCorn-Search`}
                    className={styles.shareOption}
                >
                    <FacebookIcon size={32} round={true}/>
                </FacebookShareButton>
            </div>
        </div>

    )
}