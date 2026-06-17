"use client";

import { cn } from "@/lib/utils";
import { useMemo } from "react";

type Props = {
  rating: number;
  size: number;
};

export const RatingAverage = ({ rating, size = 32 }: Props) => {
  const average = rating * 10;
  const r = size / 2 - 3;
  const circ = 2 * Math.PI * r;
  const filled = (average / 100) * circ;
  const displayRating = rating.toFixed(1);
  const { style, colorStyles } = useMemo(() => {
    const color =
      average >= 85
        ? "oklch(0.78 0.18 55)"
        : average >= 70
          ? "oklch(0.7 0.15 140)"
          : "oklch(0.6 0.15 30)";
    return {
      style: { width: size, height: size },
      colorStyles: { color },
    };
  }, [size]);
  return (
    <div
      className="relative flex items-center justify-center bg-background rounded-full"
      style={style}
    >
      <svg
        width={size}
        height={size}
        className="absolute inset-0 -rotate-90"
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="oklch(0.25 0 0)"
          strokeWidth="2.5"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={colorStyles.color}
          strokeWidth="2.5"
          strokeDasharray={`${filled} ${circ - filled}`}
          strokeLinecap="round"
        />
      </svg>
      <span
        className={cn(
          "relative text-[9px] font-bold leading-none",
          size > 30 && "text-xs",
        )}
        style={colorStyles}
      >
        {displayRating}
      </span>
    </div>
  );
};
