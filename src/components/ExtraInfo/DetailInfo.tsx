"use client";

import { Section } from "@/components/Section/Section";
import React, { PropsWithChildren, ReactNode } from "react";
import { useTranslations } from "next-intl";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type props = {
  children: ReactNode;
};

export const DetailInfo = ({ children }: props) => {
  const t = useTranslations("movieortv");
  return (
    <Section title={t("moreLabel")}>
      <div className="grid max-md:grid-cols-[repeat(auto-fit,minmax(30%,1fr))] rounded-xl bg-card border border-border/40 divide-y-border-border/40 divide-y-1 overflow-hidden mt-1">
        {children}
      </div>
    </Section>
  );
};

type DetailInfoItemProps = PropsWithChildren & {
  title: string;
  icon: LucideIcon;
  fullWidth?: boolean;
};

export const DetailInfoItem = ({
  title,
  icon: Icon,
  fullWidth = false,
  children,
}: DetailInfoItemProps) => {
  return (
    <div className={cn("px-4 py-3.5", fullWidth && "grid grid-cols-1")}>
      <div className="grid grid-cols-[auto_1fr] gap-x-3">
        <Icon className="size-4 text-muted-foreground mt-0.5" />
        <p className="capitalize text-sm text-muted-foreground">{title}</p>
      </div>
      <div className={cn(!fullWidth && "ml-7")}>{children}</div>
    </div>
  );
};
