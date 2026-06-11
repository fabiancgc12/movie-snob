"use client";

import { MemberCard } from "@/components/CrewMember/CrewMemberCard";
import { Section } from "@/components/Section/Section";
import { Slider } from "@/components/Slider/Slider";
import { ReactNode } from "react";
import { PeopleDto } from "@/models/dto/Credit.dto";
import { useTranslations } from "next-intl";

type props = {
  children: ReactNode;
};
export function Cast({ children }: props) {
  const t = useTranslations("movieortv");
  const castTitle = t("castLabel");
  return (
    <Section title={castTitle}>
      <Slider className="md:hidden" speed={250}>
        {children}
      </Slider>
      <div className="hidden md:grid md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] md:gap-2 md:p-4">
        {children}
      </div>
    </Section>
  );
}

type movieProps = {
  cast?: PeopleDto[] | null;
};

export function CastSection({ cast }: movieProps) {
  const t = useTranslations("movieortv");
  const castTitle = t("castLabel");
  const castFallbackMessage = t("castFallbackMessage");
  if (!cast || cast.length == 0) {
    return (
      <Section title={castTitle}>
        <p>{castFallbackMessage}</p>
      </Section>
    );
  }
  return (
    <Cast>
      {cast.slice(0, 12).map((c) => (
        <MemberCard size={"md"} people={c} key={`cast-${c.id}`} />
      ))}
    </Cast>
  );
}
