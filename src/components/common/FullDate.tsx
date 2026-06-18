"use client";

import { Calendar } from "lucide-react";
import { formatDate } from "@/utils/functions/formatDate";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type props = {
  date: string;
  lang?: string;
  iconClassName?: string;
};
export function FullDate({ date, lang = "en-Us", iconClassName }: props) {
  const t = useTranslations("common");
  return (
    <span className={"flex text-[13px] items-center gap-1"}>
      <Calendar className={cn("size-5", iconClassName)} />
      {date?.length > 0 ? formatDate(date, lang) : t("notAvailable")}
    </span>
  );
}
