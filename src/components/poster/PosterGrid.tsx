import { ReactNode } from "react";

type props = {
  children: ReactNode;
};
export function PosterGrid({ children }: props) {
  return (
    <div className="flex flex-wrap gap-[15px_10px] py-2.5 pr-5">
      {children}
    </div>
  );
}
