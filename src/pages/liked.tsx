import {Section} from "@/components/Section/Section";
import {PosterList} from "@/components/poster/posterList";
import {useEffect, useState} from "react";
import {ProductStore, StoreProductType} from "@/components/common/ActionButton/useCheckedButton";
import {PosterGrid} from "@/components/poster/PosterGrid";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {defaultPosters} from "@/pages/bookmark";
import {likedStoreKey} from "@/components/common/ActionButton/LikeButton";

export default function LiedPage(){
    const [movies,setMovies] = useState<StoreProductType[]>([]);
    const [tv,setTv] = useState<StoreProductType[]>([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const store = localStorage.getItem(likedStoreKey)
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
                            ? movies.length > 0
                                ? <PosterGrid><PosterList media={movies} mediaType={"movie"}/></PosterGrid>
                                : <p>You don&#8216;t have movies that you liked.</p>
                            : <PosterGrid>{defaultPosters}</PosterGrid>
                        }
                    </TabPanel>
                    <TabPanel>
                        {ready
                            ? tv.length > 0
                                ? <PosterGrid><PosterList media={tv} mediaType={"tv"}/></PosterGrid>
                                : <p>You don&#8216;t have tv shows that you liked.</p>
                            : <PosterGrid>{defaultPosters}</PosterGrid>
                        }
                    </TabPanel>
                </Tabs>
            </Section>
        </div>
    )
}