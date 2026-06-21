import { Link } from "@/i18n/navigation";
import { buttonVariants } from "../ui/button";
import { ComponentProps } from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

type Props = VariantProps<typeof buttonVariants> & ComponentProps<typeof Link>;

export const LinkButton = ({ variant, size, className, ...props }: Props) => {
  return (
    <Link
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};
