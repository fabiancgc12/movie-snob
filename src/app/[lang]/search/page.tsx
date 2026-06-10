"use client"

import {Section} from "@/components/Section/Section";
import {PosterGrid} from "@/components/poster/PosterGrid";
import {DynamicPosterList} from "@/components/poster/posterList";
import useTranslation from "next-translate/useTranslation";
import {useTheme} from "@/global/ThemeContext";
import {useSearchParams} from "next/navigation";

export default function FindPage() {
    const {t, lang} = useTranslation("common")
    const [theme] = useTheme();
    const searchParams = useSearchParams()
    const title = searchParams.get("title") ?? undefined

    return (
        <div data-theme={theme} className={"full-h"}>
            <Section title={t("find")}>
                <PosterGrid>
                    <DynamicPosterList
                        mediaType={"movie"}
                        api={"search"}
                        queryKey={["search", title, lang]}
                        parameters={{title}}
                        enabled={!!title}
                        fallbackMessage={t("notFoundMovieOrTvMessage")}
                    />
                </PosterGrid>
            </Section>
        </div>
    )
}
