"use client";

import { EmptyState } from "@/components/Layout/EmptyState";
import { useTranslations } from "next-intl";

export default function Error() {
  const t = useTranslations("common");
  const title = t("serverErrorTitle");
  return <EmptyState title={title} />;
}
