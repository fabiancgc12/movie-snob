"use client";

import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import { LinkButton } from "@/components/Layout/LinkButton";
import { useTranslations } from "next-intl";
import { AlertTriangle } from "lucide-react";

export default function Error() {
  const t = useTranslations("common");
  return (
    <div className="flex flex-col items-center p-8">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertTriangle className="text-destructive/60" />
          </EmptyMedia>
          <EmptyTitle>{t("serverErrorTitle")}</EmptyTitle>
        </EmptyHeader>
        <EmptyDescription>{t("serverErrorDescription")}</EmptyDescription>
        <LinkButton href="/">{t("homeButtonLabel")}</LinkButton>
      </Empty>
    </div>
  );
}
