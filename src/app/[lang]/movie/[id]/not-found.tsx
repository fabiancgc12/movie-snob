import { LinkButton } from "@/components/Layout/LinkButton";
import { useTranslations } from "next-intl";
import { Clapperboard } from "lucide-react";
import { EmptyState } from "@/components/Layout/EmptyState";

export default function MovieNotFound() {
  const t = useTranslations("common");
  return (
    <div className="flex flex-col items-center p-8">
      <EmptyState
        icon={Clapperboard}
        title={t("movieNotFound")}
        description={t("movieNotFoundDescription")}
      >
        <LinkButton href="/discover?media=movie">{t("discover")}</LinkButton>
      </EmptyState>
    </div>
  );
}
