"use client";

import { ReactNode, useRef, useState } from "react";
import useOnClickOutside from "@/hooks/useClickOutside";
import { ActionButton } from "@/components/common/ActionButton/ActionButton";
import { cn } from "@/lib/utils";

type props = {
  children: ReactNode;
  buttonContent: ReactNode;
  buttonSize?: "xs" | "sm" | "md";
};

export function ActionToolTip({ children, buttonContent, buttonSize }: props) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setShow(false));
  return (
    <div className="relative" ref={ref}>
      <ActionButton
        onClick={() => setShow(!show)}
        className={`bg-secondary`}
        size={buttonSize}
      >
        {buttonContent}
      </ActionButton>
      <div
        className={cn(
          "absolute top-0 right-[calc(100%+15px)] z-[5] w-max flex-col items-start justify-around gap-1.5 rounded-[0.25em] border border-[var(--primaryLight)] p-1.5 transition-transform origin-right-[10%]",
          show ? "scale-100" : "scale-0",
        )}
      >
        {children}
      </div>
    </div>
  );
}
