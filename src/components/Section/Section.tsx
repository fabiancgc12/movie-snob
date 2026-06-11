import { ReactNode } from "react";
import Link from "next/link";

export type TitleLinksProps =
  | {
      title: string;
      titleAsLink: true;
      url: string;
    }
  | {
      title: string;
      titleAsLink?: false;
      url?: undefined;
    };

type props = {
  size?: "sm" | "md";
  className?: string;
  children: ReactNode;
} & TitleLinksProps;

export function Section({
  title,
  children,
  titleAsLink,
  url,
  className = "",
  size = "md",
}: props) {
  const sizeStyle = size == "sm" ? "text-xl" : "";
  let titleContent: ReactNode = title;
  if (titleAsLink)
    titleContent = (
      <Link
        href={url}
        className="relative !text-inherit group/title"
      >
        {title}
        <span
          className="absolute grid place-content-center text-[50px] left-[calc(100%+10px)] top-[45%] -translate-y-[55%] no-underline h-full transition-transform duration-300 group-hover/title:translate-x-2.5 group-hover/title:-translate-y-[55%]"
        >
          &rsaquo;
        </span>
      </Link>
    );
  return (
    <section className={`p-4 ${className}`}>
      <h3 className={`relative pl-8 capitalize ${sizeStyle}`}>
        <span
          className="absolute top-1/2 left-0 h-[70%] w-[5px] bg-[#8b0000] -translate-y-1/2 rounded-md"
          style={{ content: '""' }}
        />
        {titleContent}
      </h3>
      {children}
    </section>
  );
}
