import { PosterGrid } from "@/components/poster/PosterGrid"
import { Section } from "@/components/Section/Section"
import {DynamicPosterList} from "@/components/poster/posterList";
import {useRouter} from "next/router";
import {MediaType} from "@/models/MediaType";
import {ChangeEvent} from "react";
import {MovieGenres, TvGenres} from "@/utils/movieGenres";
import styles from "./discover.module.css"

export default function DiscoverPage(){
    const router = useRouter();

    // if there is no 'media' on the query then fetch movies by default
    const media = router.query.media as MediaType ?? "movie";
    const genre = router.query.genre as string;

    const handleMediaChange = (e:ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as MediaType
        let genres = value == "movie" ? MovieGenres : TvGenres;
        if (genres.findIndex(g => g.id.toString() == genre) < 0){
            router.replace({query: {
                    ...router.query,
                    media:value,
                    genre:"",
                }})
        } else {
            router.replace({query: {
                    ...router.query,
                    media:value,
                }})
        }
    }

    const handleGenreChange = (e:ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        router.replace({query: {
                ...router.query,
                genre:value
            }})
    }

    let apiRoute = "discoverMovies"
    let genres = MovieGenres
    if (router.query.media == "tv"){
        apiRoute = "discoverTv"
        genres = TvGenres
    }

    return (
        <>
            <form className={styles.form}>
                <select value={media} onChange={handleMediaChange} name={"media"}>
                    <option value={"movie"}>Movie</option>
                    <option value={"tv"}>Tv</option>
                </select>
                <select value={genre} onChange={handleGenreChange} name={"genre"}>
                    <option value={""}>All</option>
                    {genres.map(g => <option value={g.id} key={`${media}-genre-${g.id}`}>{g.name}</option>)}
                </select>
            </form>
            <div data-theme="light" className={"full-h"}>
                <Section title={"Discover what to watch"}>
                    <PosterGrid>
                        <DynamicPosterList
                            mediaType={media}
                            api={apiRoute}
                            queryKey={[apiRoute, media, genre]}
                            parameters={{media: media, genre: genre}}
                            enabled={router.isReady}
                        />
                    </PosterGrid>
                </Section>
            </div>
        </>
    )
}