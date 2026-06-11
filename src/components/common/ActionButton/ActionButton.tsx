import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type props = {
  onClick: () => void;
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
    sm: "text-sm w-10 p-2",
    xs: "text-sm w-10 p-1",
    md: "text-base w-14 p-3.5",
  };
  return (
    <button
      className={cn(
        "inline-block rounded-full bg-[hsl(205deg,15%,41%,0.4)] mb-0",
        sizeStyles[size],
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
