"use client";

import { SliderProps, Slider } from "@/components/Slider/Slider";
import { Section } from "../Section/Section";

type props = SliderProps & {
  title: string;
  url?: string;
};

export function SliderSection({ title, url, children, ...sliderProps }: props) {
  return (
    <Section title={title} url={url}>
      <Slider {...sliderProps}>{children}</Slider>
    </Section>
  );
}
