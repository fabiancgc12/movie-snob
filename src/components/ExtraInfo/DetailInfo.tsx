"use client";

import { Section } from "@/components/Section/Section";
import React, { PropsWithChildren, ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Calendar, LucideIcon } from "lucide-react";
import { FullDate } from "@/components/common/FullDate";

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
};

export const DetailInfoItem = ({
  title,
  icon: Icon,
  children,
}: DetailInfoItemProps) => {
  return (
    <div className="flex items-start gap-3 px-4 py-3.5">
      <Icon className={"size-4 text-muted-foreground"} />
      <div>
        <p className="capitalize text-sm text-muted-foreground">{title}</p>
        <div className={"font-medium"}>{children}</div>
      </div>
    </div>
  );
};
