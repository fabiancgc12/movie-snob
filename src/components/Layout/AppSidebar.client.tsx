"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Bookmark, Compass, Globe, Heart, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

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

export const AppSidebarContent = () => {
  const pathname = usePathname();
  const t = useTranslations("common");
  return (
    <>
      {NAV_ITEMS.map(({ icon: Icon, label, url }) => (
        <SidebarMenuItem key={url}>
          <AppSidebarMenuButton
            isActive={pathname === url}
            render={(props) => {
              return (
                <Link {...props} href={url} title={label}>
                  <AppSidebarButtonContent icon={Icon} text={t(label)} />
                  {pathname === url && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-primary rounded-r-full" />
                  )}
                </Link>
              );
            }}
          />
        </SidebarMenuItem>
      ))}
    </>
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

const AppSidebarButtonContent = ({
  icon: Icon,
  text,
}: AppSidebarContentProps) => {
  return (
    <>
      <Icon className={"w-6! h-6!"} />
      <span className="text-xs font-medium tracking-wide leading-none first-letter:capitalize">
        {text}
      </span>
    </>
  );
};

const SwitchLanguageInner = () => {
  const t = useTranslations("common");
  const locale = useLocale();
  const nextLocale = locale == "es" ? "en" : "es";
  const pathname = usePathname();
  return (
    <AppSidebarMenuButton
      render={(props) => (
        <Link
          {...props}
          href={pathname}
          locale={nextLocale}
          title={t("language")}
        >
          <AppSidebarButtonContent icon={Globe} text={t("language")} />
        </Link>
      )}
    />
  );
};

export const SwitchLanguage = () => {
  return (
    <Suspense
      fallback={
        <AppSidebarMenuButton disabled={true}>
          <AppSidebarButtonContent icon={Globe} text={""} />
        </AppSidebarMenuButton>
      }
    >
      <SwitchLanguageInner />
    </Suspense>
  );
};
