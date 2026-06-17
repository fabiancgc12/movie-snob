import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

type Props = {
  title: string;
  onRetry: () => void;
};

export const ErrorComponent = ({ title, onRetry }: Props) => {
  const t = useTranslations("common");
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <AlertCircle className="text-destructive/60" />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
      </EmptyHeader>
      <EmptyContent>
        <Button variant={"secondary"} onClick={onRetry}>
          <RefreshCw className="size-4" />
          {t("retry")}
        </Button>
      </EmptyContent>
    </Empty>
  );
};
