import {Section} from "@/components/Section/Section";
import {PosterList} from "@/components/poster/posterList";
import {useEffect, useState} from "react";
import {ProductStore, StoreProductType} from "@/components/common/ActionButton/useCheckedButton";
import {bookmarkStoreKey} from "@/components/common/ActionButton/chechMarkButton";
import {Grid} from "@/components/Grid/Grid";
import {SkeletonCard} from "@/components/poster/posterCard";

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

    if (!onClient){
        return (
            <div data-theme="light">
                <Section title={"Your Bookmarked this movies"}>
                    <Grid>
                        {defaultPosters}
                    </Grid>
                </Section>
                <Section title={"Your Bookmarked this tv shows"}>
                    <Grid>
                        {defaultPosters}
                    </Grid>
                </Section>
            </div>
        )
    }

    return (
        <div data-theme="light">
            <Section title={"You Bookmarked this movies"}>
                <Grid>
                    <PosterList media={movies} mediaType={"movie"}/>
                </Grid>
            </Section>
            <Section title={"You Bookmarked this tv shows"}>
                <Grid>
                    <PosterList media={tv} mediaType={"tv"}/>
                </Grid>
            </Section>
        </div>
    )
}