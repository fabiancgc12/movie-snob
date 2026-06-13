"use client";

import { ActionButton } from "@/components/common/ActionButton/ActionButton";
import { useCheckedButton } from "@/components/common/ActionButton/useCheckedButton";
import { BookmarkButtonProps } from "./chechMarkButton";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { HugeiconsIcon } from "@hugeicons/react";
import { HeartIcon } from "@hugeicons/core-free-icons";

export function LikeButton(props: BookmarkButtonProps) {
  return <Button key={`${props.mediaType}-${props.media.id}`} {...props} />;
}

export const likedStoreKey = "liked";

export function Button({
  mediaType,
  media,
  size,
  className = "",
}: BookmarkButtonProps) {
  const [checked, onClick] = useCheckedButton(likedStoreKey, mediaType, media);

  return (
    <ActionButton
      className={`hover:bg-destructive hover:text-destructive-foreground ${className}`}
      size={size}
      onClick={onClick}
    >
      {checked ? (
        <HugeiconsIcon icon={HeartIcon} size={16} />
      ) : (
        <HugeiconsIcon icon={HeartIcon} size={16} />
      )}
    </ActionButton>
  );
}
