import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { HomeIcon, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { GoHomeButton } from "@/components/Layout/GoHomeButton";

type Props = {
  title: string;
  showHomeButton?: boolean;
};

export const EmptyState = ({ title, showHomeButton }: Props) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchX className="text-muted-foreground/60" />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
      </EmptyHeader>
      {showHomeButton && (
        <EmptyContent>{showHomeButton && <GoHomeButton />}</EmptyContent>
      )}
    </Empty>
  );
};
