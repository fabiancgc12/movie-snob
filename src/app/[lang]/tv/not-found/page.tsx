"use client";

import { ErrorPageComponent } from "@/components/notFound/ErrorPageComponent";
import { useTranslations } from "next-intl";

export default function TvNotFoundPage() {
  const t = useTranslations("movieortv");
  return <ErrorPageComponent title={t("tvNotFoundErrorMessage")} />;
}
