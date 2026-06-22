"use client";

import {
  Bookmark,
  Compass,
  Heart,
  Sun,
  Globe,
  Moon,
  Monitor,
} from "lucide-react";
import { Suspense } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/i18n/navigation";
import { Locale, useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import logo from "@public/logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NavItem = {
  icon: LucideIcon;
  label: string;
  url: string;
};

const NAV_ITEMS = [
  { icon: Compass, label: "discover", url: "/discover" },
  // { icon: Film, label: "Movies", url: "/movies" },
  // { icon: Tv, label: "TV Shows", url: "/tv" },
  // { icon: Star, label: "Top Rated", url: "/toprated" },
  // { icon: Users, label: "Cast & Crew", url: "/actors" },
  { icon: Bookmark, label: "watchlist", url: "/bookmark" },
  { icon: Heart, label: "favorites", url: "/liked" },
] as const satisfies NavItem[];

export const AppSidebar = () => {
  const pathname = usePathname();
  const t = useTranslations("common");
  return (
    <Sidebar collapsible={"icon"} variant="sidebar">
      <SidebarHeader>
        <div className="w-15 h-15 rounded-xl flex items-center justify-center mx-auto">
          <Link href={`/`} className="grid place-items-center p-0">
            <Image src={logo} alt={"logo"} />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent className={"p-1 px-2"}>
        {NAV_ITEMS.map(({ icon: Icon, label, url }) => (
          <SidebarMenuItem key={url}>
            <AppSidebarMenuButton
              isActive={pathname === url}
              render={(props) => {
                return (
                  <Link {...props} href={url} title={label}>
                    <AppSidebarContent icon={Icon} text={t(label)} />
                    {pathname === url && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-primary rounded-r-full" />
                    )}
                  </Link>
                );
              }}
            />
          </SidebarMenuItem>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuItem>
          <Suspense
            fallback={
              <AppSidebarMenuButton disabled={true}>
                <AppSidebarContent icon={Globe} text={t("language")} />
              </AppSidebarMenuButton>
            }
          >
            <SwitchLanguage />
          </Suspense>
        </SidebarMenuItem>
        {/*<SidebarMenuItem>*/}
        {/*  <SwitchThemeButton />*/}
        {/*</SidebarMenuItem>*/}
      </SidebarFooter>
    </Sidebar>
  );
};

const AppSidebarMenuButton: typeof SidebarMenuButton = (props) => {
  return (
    <SidebarMenuButton
      {...props}
      className={cn(
        "h-auto group relative flex flex-col items-center justify-center w-full py-2.5 rounded-lg transition-all duration-200 gap-1",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-muted-foreground cursor-pointer data-active:text-primary data-active:bg-primary/15",
        props.className,
      )}
    />
  );
};

type AppSidebarContentProps = {
  icon: LucideIcon;
  text: string;
};

const AppSidebarContent = ({ icon: Icon, text }: AppSidebarContentProps) => {
  return (
    <>
      <Icon className={"w-6! h-6!"} />
      <span className="text-xs font-medium tracking-wide leading-none first-letter:capitalize">
        {text}
      </span>
    </>
  );
};

const SwitchLanguage = () => {
  const t = useTranslations("common");
  const locale = useLocale();
  const nextLocale = locale == "es" ? "en" : "es";
  const pathname = usePathname();
  const params = useSearchParams();
  return (
    <AppSidebarMenuButton
      render={(props) => (
        <Link
          {...props}
          href={`${pathname}?${params.toString()}`}
          locale={nextLocale}
          title={t("language")}
        >
          <AppSidebarContent icon={Globe} text={t("language")} />
        </Link>
      )}
    />
  );
};

const SwitchThemeButton = () => {
  const { setTheme } = useTheme();
  const t = useTranslations("common");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={(props) => (
          <AppSidebarMenuButton {...props} title={t("theme")}>
            <AppSidebarContent icon={Sun} text={t("theme")} />
          </AppSidebarMenuButton>
        )}
      ></DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="size-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="size-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Monitor className="size-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
