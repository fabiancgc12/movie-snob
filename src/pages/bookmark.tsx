import {Section} from "@/components/Section/Section";
import {PosterList} from "@/components/poster/posterList";
import {useEffect, useState} from "react";
import {ProductStore, StoreProductType} from "@/components/common/ActionButton/useCheckedButton";
import {bookmarkStoreKey} from "@/components/common/ActionButton/chechMarkButton";
import {PosterGrid} from "@/components/poster/PosterGrid";
import {SkeletonCard} from "@/components/poster/posterCard";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export const defaultPosters = [
    <SkeletonCard key={"default-card-1"}/>,
    <SkeletonCard key={"default-card-2"}/>,
    <SkeletonCard key={"default-card-3"}/>,
    <SkeletonCard key={"default-card-4"}/>
]

export default function BookMarkPage(){
    const [movies,setMovies] = useState<StoreProductType[]>([]);
    const [tv,setTv] = useState<StoreProductType[]>([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const store = localStorage.getItem(bookmarkStoreKey)
        if (store){
            const parsedStore = JSON.parse(store) as ProductStore;
            setMovies(Object.values(parsedStore.movie))
            setTv(Object.values(parsedStore.tv))
        }
        setReady(true)
    }, []);

    return (
        <div data-theme="light" className={"full-h"}>
            <Section title={"You Bookmarked this"}>
                <Tabs>
                    <TabList>
                        <Tab>Movie</Tab>
                        <Tab>Tv</Tab>
                    </TabList>
                    <TabPanel>
                        {ready
                            ? <PosterGrid><PosterList media={movies} mediaType={"movie"} fallbackMessage={"You dont have any movies bookmarked."}/></PosterGrid>
                            : <PosterGrid>{defaultPosters}</PosterGrid>
                        }
                    </TabPanel>
                    <TabPanel>
                        {ready
                            ? <PosterGrid><PosterList media={tv} mediaType={"tv"} fallbackMessage={"You dont have any tv shows bookmarked."}/></PosterGrid>
                            : <PosterGrid>{defaultPosters}</PosterGrid>
                        }
                    </TabPanel>
                </Tabs>
            </Section>
        </div>
    )
}