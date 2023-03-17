import {Section} from "@/components/Section/Section";
import {PosterList} from "@/components/poster/posterList";
import {useEffect, useState} from "react";
import {ProductStore, StoreProductType} from "@/components/common/ActionButton/useCheckedButton";
import {bookmarkStoreKey} from "@/components/common/ActionButton/chechMarkButton";
import {PosterGrid} from "@/components/poster/PosterGrid";
import {SkeletonCard} from "@/components/poster/posterCard";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const defaultPosters = [
    <SkeletonCard key={"default-card-1"}/>,
    <SkeletonCard key={"default-card-2"}/>,
    <SkeletonCard key={"default-card-3"}/>,
    <SkeletonCard key={"default-card-4"}/>
]

export default function BookMarkPage(){
    const [movies,setMovies] = useState<StoreProductType[]>([]);
    const [tv,setTv] = useState<StoreProductType[]>([]);
    const [onClient, setOnClient] = useState(false);

    useEffect(() => {
        const store = localStorage.getItem(bookmarkStoreKey)
        if (store){
            const parsedStore = JSON.parse(store) as ProductStore;
            setMovies(Object.values(parsedStore.movie))
            setTv(Object.values(parsedStore.tv))
            setOnClient(true)
        }
    }, []);

    if (!onClient) return <Loading/>

    return (
        <div data-theme="light">
            <Section title={"You Bookmarked this"}>
                <Tabs>
                    <TabList>
                        <Tab>Movie</Tab>
                        <Tab>Tv</Tab>
                    </TabList>

                    <TabPanel>
                        <PosterGrid>
                            <PosterList media={movies} mediaType={"movie"}/>
                        </PosterGrid>
                    </TabPanel>
                    <TabPanel>
                        <PosterGrid>
                            <PosterList media={tv} mediaType={"tv"}/>
                        </PosterGrid>
                    </TabPanel>
                </Tabs>
            </Section>
        </div>
    )
}


function Loading(){
    return (
        <div data-theme="light">
            <Section title={"Your Bookmarked this movies"}>
                <PosterGrid>
                    {defaultPosters}
                </PosterGrid>
            </Section>

            <Section title={"Your Bookmarked this tv shows"}>
                <PosterGrid>
                    {defaultPosters}
                </PosterGrid>
            </Section>
        </div>
    )
}