import {Section} from "@/components/Section/Section";
import {PosterList} from "@/components/poster/posterList";
import {useEffect, useState} from "react";
import {ProductStore, StoreProductType} from "@/components/common/ActionButton/useCheckedButton";
import {PosterGrid} from "@/components/poster/PosterGrid";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {defaultPosters} from "@/pages/bookmark";
import {likedStoreKey} from "@/components/common/ActionButton/LikeButton";
import useTranslation from "next-translate/useTranslation";

export default function LiedPage(){
    const [movies,setMovies] = useState<StoreProductType[]>([]);
    const [tv,setTv] = useState<StoreProductType[]>([]);
    const [ready, setReady] = useState(false);
    const {t} = useTranslation("likedorbookmark")

    useEffect(() => {
        const store = localStorage.getItem(likedStoreKey)
        if (store){
            const parsedStore = JSON.parse(store) as ProductStore;
            setMovies(Object.values(parsedStore.movie))
            setTv(Object.values(parsedStore.tv))
        }
        setReady(true)
    }, []);

    const title = t("likedTitle")
    const movieFallback = t("fallbackMovieMessage")
    const tvFallback = t("fallbackTvMessage")

    return (
        <div data-theme="light" className={"full-h"}>
            <Section title={title}>
                <Tabs>
                    <TabList>
                        <Tab>Movie</Tab>
                        <Tab>Tv</Tab>
                    </TabList>
                    <TabPanel>
                        {ready
                            ? <PosterGrid><PosterList media={movies} mediaType={"movie"} fallbackMessage={movieFallback}/></PosterGrid>
                            : <PosterGrid>{defaultPosters}</PosterGrid>
                        }
                    </TabPanel>
                    <TabPanel>
                        {ready
                            ? <PosterGrid><PosterList media={tv} mediaType={"tv"} fallbackMessage={tvFallback}/></PosterGrid>
                            : <PosterGrid>{defaultPosters}</PosterGrid>
                        }
                    </TabPanel>
                </Tabs>
            </Section>
        </div>
    )
}