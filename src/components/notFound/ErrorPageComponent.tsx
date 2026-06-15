import { Section } from "@/components/Section/Section";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "@/global/ThemeContext";

type props = {
  title: string;
};

export function ErrorPageComponent({ title }: props) {
  const t = useTranslations("common");
  const [theme] = useTheme();
  const locale = useLocale();
  const homeLabel = t("homeButtonLabel");
  const discoverLabel = t("discover");
  return (
    <div data-theme={theme} className={"h-full"}>
      <Section title={title}>
        <div className="p-2.5 [&>*]:text-xs [&>*]:py-3 [&>*]:px-4 [&>*:not(:first-child)]:ml-2.5">
          <Link href={`/${locale}`} role={"button"}>
            {homeLabel}
          </Link>
          <Link
            href={`/${locale}/discover`}
            role={"button"}
            className={"secondary"}
          >
            {discoverLabel}
          </Link>
        </div>
      </Section>
    </div>
  );
}
