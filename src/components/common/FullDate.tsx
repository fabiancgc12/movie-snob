"use client";

import { Calendar } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type props = {
  date: string;
  iconClassName?: string;
};
export function FullDate({ date, iconClassName }: props) {
  const t = useTranslations("common");
  const format = useFormatter();
  return (
    <span className={"flex text-[13px] items-center gap-1"}>
      <Calendar className={cn("size-5", iconClassName)} />
      {date?.length > 0
        ? format.dateTime(new Date(date), {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : t("notAvailable")}
    </span>
  );
}
