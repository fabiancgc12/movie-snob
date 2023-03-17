import {Section} from "@/components/Section/Section";
import {PosterList} from "@/components/poster/posterList";
import {useEffect, useState} from "react";
import {ProductStore, StoreProductType} from "@/components/common/ActionButton/useCheckedButton";
import {bookmarkStoreKey} from "@/components/common/ActionButton/chechMarkButton";
import {PosterGrid} from "@/components/poster/PosterGrid";
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

    return (
        <div data-theme="light">
            <Section title={"You Bookmarked this movies"}>
                <PosterGrid>
                    <PosterList media={movies} mediaType={"movie"}/>
                </PosterGrid>
            </Section>
            <Section title={"You Bookmarked this tv shows"}>
                <PosterGrid>
                    <PosterList media={tv} mediaType={"tv"}/>
                </PosterGrid>
            </Section>
        </div>
    )
}