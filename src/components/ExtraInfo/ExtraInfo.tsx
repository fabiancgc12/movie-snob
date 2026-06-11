"use client";

import { Section } from "@/components/Section/Section";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";

type props = {
  children: ReactNode;
};

export function ExtraInfo({ children }: props) {
  const t = useTranslations("movieortv");
  return (
    <Section title={t("moreLabel")}>
      <div className="grid max-md:grid-cols-[repeat(auto-fit,minmax(30%,1fr))] gap-2.5">
        {children}
      </div>
    </Section>
  );
}
