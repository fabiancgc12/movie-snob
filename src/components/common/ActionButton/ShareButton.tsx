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
import {AiOutlineShareAlt} from "react-icons/ai";

type props = {
    title:string,
    url:string
}

export function ShareButton({url,title}:props){

    return (
        <ActionToolTip buttonContent={<AiOutlineShareAlt size={24}/>}>
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