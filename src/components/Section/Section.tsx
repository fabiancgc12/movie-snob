import { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type props = {
  title: string;
  url?: string;
  size?: "sm" | "md";
  className?: string;
  children: ReactNode;
};

export function Section({
  title,
  children,
  url,
  className = "",
  size = "md",
}: props) {
  const sizeStyle = size == "sm" ? "text-xl" : "";
  return (
    <section className={`p-4 group/title ${className}`}>
      <h3
        className={`relative pl-8 capitalize text-lg font-bold text-foreground tracking-tight ${sizeStyle}`}
      >
        <span
          className="absolute top-1/2 left-0 h-[90%] w-1 bg-primary -translate-y-1/2 rounded-md"
          style={{ content: '""' }}
        />
        {url ? (
          <Link href={url} className="relative !text-inherit">
            {title}
            <span className="absolute grid place-content-center text-[50px] left-[calc(100%+10px)] top-[45%] -translate-y-[55%] no-underline h-full transition-transform duration-300 group-hover/title:translate-x-2.5 group-hover/title:-translate-y-[55%]">
              &rsaquo;
            </span>
          </Link>
        ) : (
          title
        )}
      </h3>
      {children}
    </section>
  );
}
