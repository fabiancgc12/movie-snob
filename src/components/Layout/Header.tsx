import { useShowNavBarContext } from "@/global/ShowNavbarContext";
import { CiMenuBurger } from "react-icons/ci";
import { FormEvent, useRef } from "react";
import Image from "next/image";
import wideLogo from "@public/logo-wide.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";

type props = {
  className?: string;
};

export function Header({ className = "" }: props) {
  const t = useTranslations("common");
  const locale = useLocale();
  const [showNavBar, setShowNavBar] = useShowNavBarContext();
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
        "sticky top-0 z-[9] flex items-center justify-between gap-2.5 bg-[var(--primaryDarker-90)] p-2.5 backdrop-blur-[5px]",
        className,
      )}
    >
      <button
        onClick={() => setShowNavBar(!showNavBar)}
        className="grid place-items-center rounded-full border-0 bg-transparent p-3 outline-0 md:hidden"
      >
        <CiMenuBurger size={20} />
      </button>
      <div className="relative h-full aspect-[2.4/1] max-md:hidden">
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
