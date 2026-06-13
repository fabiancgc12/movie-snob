"use client";

import { ActionButton } from "@/components/common/ActionButton/ActionButton";
import {
  StoreProductType,
  useCheckedButton,
} from "@/components/common/ActionButton/useCheckedButton";
import { Bookmark02Icon, HugeiconsFreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export type BookmarkButtonProps = {
  mediaType: "movie" | "tv";
  media: StoreProductType;
  className?: string;
  size?: "xs" | "sm" | "md";
};

export function BookmarkButton(props: BookmarkButtonProps) {
  return <Button key={`${props.mediaType}-${props.media}`} {...props} />;
}

export const bookmarkStoreKey = "checked";

function Button({
  mediaType,
  media,
  size,
  className = "",
}: BookmarkButtonProps) {
  const [checked, onClick] = useCheckedButton(
    bookmarkStoreKey,
    mediaType,
    media,
  );
  return (
    <ActionButton
      className={"hover:bg-primary hover:text-primary-foreground"}
      onClick={onClick}
      size={size}
    >
      {checked ? (
        <HugeiconsIcon icon={Bookmark02Icon} size={16} />
      ) : (
        <HugeiconsIcon icon={Bookmark02Icon} size={16} />
      )}
    </ActionButton>
  );
}
