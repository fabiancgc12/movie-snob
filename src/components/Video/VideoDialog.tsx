"use client";
import { VideoTrailer } from "@/models/Movies/VideoMedia.schema";
import { cn } from "@/lib/utils";
import { PropsWithChildren, ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";

type props = {
  video: VideoTrailer;
  children: (props: { onClick: () => void }) => ReactNode;
};
export function VideoDialog({ video, children }: props) {
  const [show, setShow] = useState(false);

  return (
    <div className="inline-block">
      {show &&
        createPortal(
          <div
            className={cn(
              "fixed inset-0 w-full h-screen bg-black/75 z-[1000] place-items-center",
              show ? "grid" : "hidden",
            )}
            onClick={() => setShow(false)}
          >
            <iframe
              src={`https://www.youtube.com/embed/${video.key}`}
              title={video.name}
              allowFullScreen
              allow={"encrypted-media; picture-in-picture full"}
              className="w-full aspect-[16/9] max-w-[720px]"
            />
          </div>,
          document.body,
        )}
      {children({ onClick: () => setShow(true) })}
    </div>
  );
}

type VideLinkButtonProps = PropsWithChildren & {
  trailer: VideoTrailer;
};

export const VideLinkButton = ({ trailer, children }: VideLinkButtonProps) => {
  return (
    <VideoDialog video={trailer}>
      {(props) => (
        <Button variant={"link"} {...props}>
          {children}
        </Button>
      )}
    </VideoDialog>
  );
};
