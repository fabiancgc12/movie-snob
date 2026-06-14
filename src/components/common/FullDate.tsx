"use client";

import { Calendar } from "lucide-react";
import { formatDate } from "@/utils/functions/formatDate";
import { useTranslations } from "next-intl";

type props = {
  date: string;
  lang?: string;
};
export function FullDate({ date, lang = "en-Us" }: props) {
  const t = useTranslations("common");
  const fallbackMessage = t("notAvailable");
  return (
    <small className={"flex items-center gap-5"}>
      <Calendar />
      {date?.length > 0 ? formatDate(date, lang) : fallbackMessage}
    </small>
  );
}
