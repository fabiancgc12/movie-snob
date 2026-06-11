import { FaBookmark } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import {
  MdLocalMovies,
  MdLanguage,
  MdModeNight,
  MdSunny,
} from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import logo from "@public/logo.png";
import { useShowNavBarContext } from "@/global/ShowNavbarContext";
import useClickOutside from "@/hooks/useClickOutside";
import { ReactNode, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useTheme } from "@/global/ThemeContext";
import { cn } from "@/lib/utils";

type props = {
  className?: string;
};

type NavItemType = {
  icon: ReactNode;
  label: string;
  url: string;
  switchLanguage?: boolean;
};

const navItems = [
  {
    icon: <FaBookmark />,
    label: "marked",
    url: "/bookmark",
    switchLanguage: false,
  },
  {
    icon: <AiFillHeart />,
    label: "liked",
    url: "/liked",
    switchLanguage: false,
  },
  {
    icon: <MdLocalMovies />,
    label: "discover",
    url: "/discover",
    switchLanguage: false,
  },
  {
    icon: <MdLanguage />,
    label: "language",
    url: "/",
    switchLanguage: true,
  },
] as const satisfies NavItemType[];

export function NavBar({ className = "" }: props) {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const [show, setShow] = useShowNavBarContext();
  const ref = useRef<HTMLElement>(null);
  useClickOutside(ref, () => {
    if (show) setShow(false);
  });

  const nextLocale: string = locale === "es" ? "en-US" : "es";
  return (
    <aside
      ref={ref}
      className={cn(
        "fixed top-0 left-0 z-10 h-screen w-[var(--navBarWidth)] bg-[var(--primaryDark)] p-2.5 transition-transform duration-300 max-md:text-[21px]",
        show ? "translate-x-0" : "max-md:-translate-x-full",
        className,
      )}
    >
      <nav className="flex h-full flex-col items-stretch justify-evenly gap-5">
        <div className="relative border-b border-white/50 pb-1.5">
          <Link href={`/${locale}`} className="grid place-items-center p-0">
            <Image src={logo} alt={"logo"} />
          </Link>
        </div>
        {navItems.map((item) => {
          const label = t(item.label);
          const itemPath = `/${locale}${item.url}`;
          const isActive =
            pathname === itemPath || pathname.startsWith(itemPath + "/");
          return (
            <div
              key={`nav-item-${item.label}`}
              className={cn(
                "rounded-[0.5em] p-1.5 transition-colors hover:bg-white hover:text-[var(--primaryDark)]",
                isActive && !item.switchLanguage && "bg-white text-[var(--primaryDark)]",
              )}
            >
              {item.switchLanguage ? (
                <Link
                  href={pathname}
                  className="grid place-items-center p-0 flex-grow-0 flex-shrink-0 text-inherit"
                  locale={nextLocale}
                >
                  {item.icon}
                  <p className="text-sm capitalize">{label}</p>
                </Link>
              ) : (
                <Link
                  href={itemPath}
                  className="grid place-items-center p-0 flex-grow-0 flex-shrink-0 text-inherit"
                >
                  {item.icon}
                  <p className="text-sm capitalize">{label}</p>
                </Link>
              )}
            </div>
          );
        })}
        <SwitchThemeButton />
      </nav>
    </aside>
  );
}

function SwitchThemeButton() {
  const [theme, setTheme] = useTheme();
  const t = useTranslations("common");
  const themeLabel = t("theme");
  return (
    <div className="mt-auto">
      <div
        onClick={setTheme}
        className="grid place-items-center cursor-pointer p-0 flex-grow-0 flex-shrink-0 text-inherit"
      >
        <div className="grid grid-cols-[100%_100%] overflow-hidden">
          <div
            className={cn(
              "w-full transition-transform duration-300",
              theme === "dark" ? "-translate-x-full" : "translate-x-0",
            )}
          >
            <MdModeNight />
          </div>
          <div
            className={cn(
              "w-full transition-transform duration-300",
              theme === "dark" ? "-translate-x-full" : "translate-x-0",
            )}
          >
            <MdSunny />
          </div>
        </div>
        <p className="text-sm capitalize">{themeLabel}</p>
      </div>
    </div>
  );
}
