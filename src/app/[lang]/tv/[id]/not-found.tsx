import { LinkButton } from "@/components/Layout/LinkButton";
import { useTranslations } from "next-intl";
import { Tv, TvIcon } from "lucide-react";
import { EmptyState } from "@/components/Layout/EmptyState";

export default function TvNotFound() {
  const t = useTranslations("common");
  return (
    <div className="flex flex-col items-center p-8">
      <EmptyState
        icon={TvIcon}
        title={t("tvNotFound")}
        description={t("tvNotFoundDescription")}
      >
        <LinkButton href="/discover?media=tv">{t("discover")}</LinkButton>
      </EmptyState>
    </div>
  );
}
