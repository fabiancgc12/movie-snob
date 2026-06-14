"use client";

import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { ActionToolTip } from "@/components/common/ActionToolTip";
import { Share2 } from "lucide-react";

type props = {
  title: string;
  url: string;
};

export function ShareButton({ url, title }: props) {
  return (
    <ActionToolTip buttonContent={<Share2 size={24} />}>
      <WhatsappShareButton url={url} title={title}>
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>
      <TwitterShareButton
        url={url}
        title={title}
        hashtags={[`Movie Snob`, title]}
      >
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
      <TelegramShareButton url={url} title={title}>
        <TelegramIcon size={32} round={true} />
      </TelegramShareButton>
      <FacebookShareButton url={url} hashtag={`Movie Snob`}>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
    </ActionToolTip>
  );
}
