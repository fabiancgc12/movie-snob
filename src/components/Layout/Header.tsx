"use client";
import { FormEvent, useRef } from "react";
import Image from "next/image";
import wideLogo from "@public/logo-wide.png";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Link, useRouter } from "@/i18n/navigation";

type props = {
  className?: string;
};

export function Header({ className = "" }: props) {
  const t = useTranslations("common");
  const locale = useLocale();
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchRef.current?.value)
      router.push(
        `/${locale}/search?title=${encodeURIComponent(searchRef.current.value)}`,
      );
  };
  const placeholder = t("searchPlaceHolder");
  return (
    <header
      className={cn(
        "sticky top-0 z-9 flex items-center justify-between gap-2.5 bg-(--primaryDarker-90) p-2.5 backdrop-blur-[5px]",
        className,
      )}
    >
      <SidebarTrigger className="grid place-items-center rounded-full border-0 bg-transparent outline-0 md:hidden" />

      <div className="relative h-10 aspect-[2.4/1] md:hidden">
        <Link href={`/${locale}`} className="grid place-items-center p-0">
          <Image src={wideLogo} alt={"wide logo"} fill />
        </Link>
      </div>
      <form className="ml-auto mb-0" onSubmit={onSubmit}>
        <input
          type={"search"}
          placeholder={placeholder}
          ref={searchRef}
          className="h-[45px] w-[150px] rounded border-0 bg-[var(--primaryDarker)] px-2 py-1 transition-all duration-500 focus:w-[250px] focus:outline-none max-md:placeholder-shown:w-[50px] max-md:placeholder-shown:cursor-pointer max-md:placeholder-shown:border-0 md:w-[250px]"
        />
      </form>
    </header>
  );
}
