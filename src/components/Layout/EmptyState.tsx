import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { LucideIcon, SearchX } from "lucide-react";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  title: string;
  description?: string;
  icon?: LucideIcon;
};

export const EmptyState = ({
  title,
  description,
  icon: Icon = SearchX,
  children,
}: Props) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon className="text-muted-foreground/60" />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {children}
    </Empty>
  );
};
