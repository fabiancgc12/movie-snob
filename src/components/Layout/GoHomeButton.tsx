"use client";
import { Link } from "@/i18n/navigation";
import { Button } from "../ui/button";
import { HomeIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export const GoHomeButton = () => {
  const t = useTranslations("common");
  return (
    <Button
      render={(props) => (
        <Link {...props} href="/">
          <HomeIcon />
          {t("homeButtonLabel")}
        </Link>
      )}
    />
  );
};
