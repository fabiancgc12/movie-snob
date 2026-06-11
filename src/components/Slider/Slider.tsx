"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useCallback, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import useResizeObserver from "@react-hook/resize-observer";

export type SliderProps = {
  className?: string;
  children: ReactNode;
  speed?: number;
  endElement?: ReactNode;
};

export function Slider({ className = "", children, speed = 200 }: SliderProps) {
  const sliderRef = useRef<HTMLElement>(null);
  const [showPrevArrow, setShowPrevArrow] = useState(false);
  const [showNextArrow, setShowNextArrow] = useState(true);

  const onScroll = useCallback(() => {
    if (sliderRef?.current) {
      setShowPrevArrow(!!sliderRef.current.scrollLeft);
      let { scrollWidth, offsetWidth } = sliderRef.current;
      setShowNextArrow(
        sliderRef.current.scrollLeft < scrollWidth - offsetWidth - 10,
      );
    }
  }, []);
  useResizeObserver(sliderRef, onScroll);

  const moveSlider = useCallback(
    (scrollValue: number) => {
      if (sliderRef?.current) {
        sliderRef.current.scrollLeft += scrollValue;
        onScroll();
      }
    },
    [onScroll],
  );

  return (
    <div className={cn("relative flex items-center", className)}>
      <PrevArrow
        className={cn("absolute", showPrevArrow ? "animate-[fadeIn_0.35s_forwards]" : "animate-[fadeOut_0.35s_forwards]")}
        onClick={() => moveSlider(speed * -1)}
      />
      <figure
        className="w-full text-xl flex flex-row flex-nowrap items-stretch py-2 px-0 gap-[var(--gap)] scroll-smooth snap-x snap-mandatory scroll-pl-[var(--gap)] overflow-x-auto overscroll-x-contain snap-always [&>*]:shrink-0 [&>*:not(.loader)]:snap-start [&>*:not(.loader)]:items-start"
        style={{ "--gap": "10px" } as React.CSSProperties}
        ref={sliderRef}
        onScroll={onScroll}
      >
        {children}
      </figure>
      <NextArrow
        className={cn("absolute", showNextArrow ? "animate-[fadeIn_0.35s_forwards]" : "animate-[fadeOut_0.35s_forwards]")}
        onClick={() => moveSlider(speed)}
      />
    </div>
  );
}

type ArrowProps = {
  onClick: () => void;
  className?: string;
};

const arrowBase = "h-16 w-12 flex items-center justify-center py-2 px-1 bg-[var(--primaryColor-60)] rounded-md border border-[whitesmoke] m-0 z-10 hover:bg-[var(--primaryColor-60)]";

export const NextArrow = ({ onClick, className = "" }: ArrowProps) => {
  return (
    <button className={cn(arrowBase, "right-0", className)} onClick={onClick}>
      <AiOutlineRight size={32} className="w-full text-[whitesmoke] hover:text-[var(--primaryLight)]" />
    </button>
  );
};

export function PrevArrow({ onClick, className = "" }: ArrowProps) {
  return (
    <button className={cn(arrowBase, "left-0", className)} onClick={onClick}>
      <AiOutlineLeft size={32} className="w-full text-[whitesmoke] hover:text-[var(--primaryLight)]" />
    </button>
  );
}
