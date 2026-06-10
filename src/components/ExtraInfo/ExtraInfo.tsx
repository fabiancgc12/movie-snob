"use client";

import { Section } from "@/components/Section/Section";
import styles from "./ExtraInfo.module.css";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";

type props = {
  children: ReactNode;
};

export function ExtraInfo({ children }: props) {
  const t = useTranslations("movieortv");
  return (
    <Section title={t("moreLabel")}>
      <div className={styles.wrapper}>{children}</div>
    </Section>
  );
}
