import {Section} from "@/components/Section/Section";
import {PosterGrid} from "@/components/poster/PosterGrid";
import {DynamicPosterList} from "@/components/poster/posterList";
import {useRouter} from "next/router";
import useTranslation from "next-translate/useTranslation";
import {useTheme} from "@/global/ThemeContext";

export default function FindPage(){
    const {t,lang} = useTranslation("common")
    const [theme] = useTheme();
    const router = useRouter()
    const title = router.query.title as string;
    return (
        <div data-theme={theme} className={"full-h"}>
            <Section title={t("find")}>
                <PosterGrid>
                    <DynamicPosterList
                        mediaType={"movie"}
                        api={"search"}
                        queryKey={["search", title,lang]}
                        parameters={{title}}
                        enabled={router.isReady}
                        fallbackMessage={t("notFoundMovieOrTvMessage")}
                    />
                </PosterGrid>
            </Section>
        </div>
    )
}