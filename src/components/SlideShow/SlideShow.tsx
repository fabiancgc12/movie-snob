"use client";

import { Fade, SlideshowRef } from "react-slideshow-image";
import { NextArrow } from "@/components/Slider/Slider";
import "react-slideshow-image/dist/styles.css";
import { ReactNode, useRef } from "react";
import { AiOutlineLeft } from "react-icons/ai";

type props = {
  children: ReactNode;
};

export function SlideShow({ children }: props) {
  const slideRef = useRef<SlideshowRef>(null);
  return (
    <div className="isolate">
      <Fade
        ref={slideRef}
        prevArrow={
          <button
            className="absolute -translate-y-[75%] left-0 h-16 w-12 flex items-center justify-center py-2 px-1 bg-[var(--primaryColor-60)] rounded-md border border-[whitesmoke] z-10"
            onClick={() => {}}
          >
            <AiOutlineLeft size={32} className="w-full text-[whitesmoke]" />
          </button>
        }
        nextArrow={
          <NextArrow
            onClick={() => {}}
            className="-translate-y-[75%]"
          />
        }
        indicators={true}
        transitionDuration={500}
      >
        {children}
      </Fade>
    </div>
  );
}
