import { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";

type props = {
  onClick?: MouseEventHandler<any>;
  className?: string;
  children: ReactNode;
  size?: "xs" | "sm" | "md";
};

export function ActionButton({
  onClick,
  className = "",
  size = "md",
  children,
}: props) {
  const sizeStyles = {
    sm: "text-sm w-7 h-7 p-2",
    xs: "text-sm w-7 h-7 p-1",
    md: "text-base w-14 h-14 p-3.5",
  };
  return (
    <button
      className={cn(
        "cursor-pointer aspect-square rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center transition-colors",
        sizeStyles[size],
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
