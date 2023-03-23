import {Section} from "@/components/Section/Section";
import {PosterGrid} from "@/components/poster/PosterGrid";
import {DynamicPosterList} from "@/components/poster/posterList";
import {useRouter} from "next/router";

export default function FindPage(){
    const router = useRouter()
    const title = router.query.title as string;
    return (
        <div data-theme="light" className={"full-h"}>
            <Section title={"Find"}>
                <PosterGrid>
                    <DynamicPosterList
                        mediaType={"movie"}
                        api={"search"}
                        queryKey={["search", title]}
                        parameters={{title}}
                        enabled={router.isReady}
                        fallbackMessage={"There are not movies or tv shows with that title."}
                    />
                </PosterGrid>
            </Section>
        </div>
    )
}