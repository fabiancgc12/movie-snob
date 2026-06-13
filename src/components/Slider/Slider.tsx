"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useCallback, useRef, useState } from "react";
import useResizeObserver from "@react-hook/resize-observer";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

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
        showArrow={showPrevArrow}
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
      <NextArrow showArrow={showNextArrow} onClick={() => moveSlider(speed)} />
    </div>
  );
}

type ArrowProps = {
  onClick: () => void;
  showArrow: boolean;
};

const arrowBase =
  "absolute h-16 w-12 flex items-center justify-center py-2 px-1 bg-[var(--primaryColor-60)] rounded-md border border-[whitesmoke] m-0 z-10 hover:bg-[var(--primaryColor-60)] cursor-pointer text-muted-foreground hover:text-white transition-all";

export const NextArrow = ({ onClick, showArrow }: ArrowProps) => {
  return (
    <button
      className={cn(
        arrowBase,
        showArrow
          ? "animate-[fadeIn_0.35s_forwards]"
          : "animate-[fadeOut_0.35s_forwards]",
        "right-0",
      )}
      onClick={onClick}
    >
      <HugeiconsIcon icon={ArrowRight01Icon} />
    </button>
  );
};

const PrevArrow = ({ onClick, showArrow }: ArrowProps) => {
  return (
    <button
      className={cn(
        arrowBase,
        showArrow
          ? "animate-[fadeIn_0.35s_forwards]"
          : "animate-[fadeOut_0.35s_forwards]",
        "left-0",
      )}
      onClick={onClick}
    >
      <HugeiconsIcon icon={ArrowLeft01Icon} />
    </button>
  );
};
