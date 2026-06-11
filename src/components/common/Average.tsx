"use client";

import React, { CSSProperties, useMemo } from "react";
import { cn } from "@/lib/utils";

type props = {
  value: number;
  size?: "sm" | "md" | "bg";
};

export function Average({ value, size = "md" }: props) {
  const properties = useMemo(
    () =>
      ({
        "--degree": ((value * 360) / 10).toString() + "deg",
      }) as CSSProperties,
    [value],
  );
  const average = value * 10;
  const sizeStyles = {
    sm: "text-sm p-1",
    md: "text-base p-4",
    bg: "text-lg p-4 max-md:text-base",
  };
  return (
    <div
      className={cn(
        "inline-grid place-items-center relative w-16 rounded-full bg-black text-white aspect-square isolate before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:aspect-square before:bg-[conic-gradient(var(--secondaryDark)_var(--degree,0),transparent_var(--degree,0))] before:z-[-2] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:aspect-square after:bg-black after:z-[-1]",
        sizeStyles[size],
      )}
      style={properties}
    >
      <span className="font-bold">{Math.trunc(average)}%</span>
    </div>
  );
}
