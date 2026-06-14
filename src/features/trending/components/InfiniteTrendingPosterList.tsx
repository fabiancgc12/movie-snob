import { SliderSection } from "@/components/Slider/SliderSection";
import { useLocale, useTranslations } from "next-intl";
import { InfinitePosterList } from "@/components/poster/infinitePosterListProps";

export const InfiniteTrendingPosterList = () => {
  const t = useTranslations("home");
  const trendingLabel = t("trendingLabel");
  const locale = useLocale();
  return (
    <SliderSection title={trendingLabel} speed={450}>
      <InfinitePosterList
        mediaType={"movie"}
        enabled={false}
        api={"trending"}
        queryKey={["trending", locale]}
        fallbackMessage={"There are not trending movies."}
      />
    </SliderSection>
  );
};
