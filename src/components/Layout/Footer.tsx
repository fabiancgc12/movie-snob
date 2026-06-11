"use client";

import imdbLogo from "../../../public/tmdb.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type props = {
  className?: string;
};

export function Footer({ className = "" }: props) {
  const t = useTranslations("common");
  const developedBy = t("developedby");
  const madeUsing = t("madeusing");
  return (
    <footer
      className={cn(
        "grid grid-cols-2 justify-between justify-items-center bg-[var(--primaryDarker)] p-4 md:justify-start",
        className,
      )}
    >
      <div className="flex flex-col gap-1.5">
        <p>{developedBy}</p>
        <a
          href="https://github.com/fabiancgc12"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fabian Graterol
        </a>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        {madeUsing}
        <Image
          src={imdbLogo}
          alt={"The movie Database logo"}
          width={100}
          height={100}
        />
      </div>
    </footer>
  );
}
