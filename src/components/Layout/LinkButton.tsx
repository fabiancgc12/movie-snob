"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "../ui/button";
import { ButtonProps } from "@base-ui/react";

type Props = ButtonProps & {
  href: string;
};

export const LinkButton = ({ href, children, ...props }: Props) => {
  return (
    <Button
      {...props}
  render={(props) => (
    <Link {...props} href={href}>
      {children}
    </Link>
  )}
    />
  );
};
