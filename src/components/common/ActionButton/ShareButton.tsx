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
import {ActionToolTip} from "@/components/common/ActionToolTip";

type props = {
    title:string,
    url:string
}

export function ShareButton({url,title}:props){

    return (
        <ActionToolTip buttonContent={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z" clipRule="evenodd" />
            </svg>
            }
        >
            <WhatsappShareButton
                url={url}
                title={title}
            >
                <WhatsappIcon size={32} round={true}/>
            </WhatsappShareButton>
            <TwitterShareButton
                url={url}
                title={title}
                hashtags={[`PopCorn-Search`,title]}
            >
                <TwitterIcon size={32} round={true}/>
            </TwitterShareButton>
            <TelegramShareButton
                url={url}
                title={title}
            >
                <TelegramIcon size={32} round={true}/>
            </TelegramShareButton>
            <FacebookShareButton
                url={url}
                hashtag={`PopCorn-Search`}
            >
                <FacebookIcon size={32} round={true}/>
            </FacebookShareButton>
        </ActionToolTip>
    )
}