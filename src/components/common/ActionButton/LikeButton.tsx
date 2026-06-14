"use client";

import { ActionButton } from "@/components/common/ActionButton/ActionButton";
import { useCheckedButton } from "@/components/common/ActionButton/useCheckedButton";
import { BookmarkButtonProps } from "./chechMarkButton";
import { Heart } from "lucide-react";

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
        <Heart size={16} />
      ) : (
        <Heart size={16} />
      )}
    </ActionButton>
  );
}
