"use client";

import { EmptyState } from "@/components/Layout/EmptyState";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("common");
  const title = t("errorPageLabel");
  return (
    <div className="flex flex-col items-center">
      <EmptyState title={title} showHomeButton={true} />
    </div>
  );
}
