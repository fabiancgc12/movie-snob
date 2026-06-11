"use client";

import { VideoTrailerInterface } from "@/models/Movies/VideoMedia.interface";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { createPortal } from "react-dom";

type props = {
  video: VideoTrailerInterface;
  children: ReactNode;
};
export function Video({ video, children }: props) {
  const [show, setShow] = useState(false);

  return (
    <div className="inline-block">
      {show &&
        createPortal(
          <div
            className={cn(
              "fixed inset-0 w-full h-screen bg-black/75 z-[1000] place-items-center",
              show ? "grid" : "hidden"
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

      <div onClick={() => setShow(true)}>{children}</div>
    </div>
  );
}
