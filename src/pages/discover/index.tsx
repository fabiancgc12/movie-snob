import { PosterGrid } from "@/components/poster/PosterGrid"
import { Section } from "@/components/Section/Section"
import {DynamicPosterList} from "@/components/poster/posterList";
import {useRouter} from "next/router";
import {MediaType} from "@/models/MediaType";
import {ChangeEvent} from "react";
import {MovieGenres, MovieGenresSpanish, TvGenres, TvGenresSpanish} from "@/utils/movieGenres";
import styles from "./discover.module.css"
import useTranslation from "next-translate/useTranslation";

export default function DiscoverPage(){
    const router = useRouter();
    const {t,lang} = useTranslation("discover");
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
    let genres = lang == "es" ? MovieGenres : MovieGenresSpanish
    let fallbackMessage = t("movieFallback")
    if (router.query.media == "tv"){
        apiRoute = "discoverTv"
        genres = lang == "es" ? TvGenres : TvGenresSpanish
        fallbackMessage = t("tvFallback")
    }
    const title = t("discoverPageTitle")
    const movieLabel = t("common:mediaMovie")
    const tvLabel = t("common:mediaTv")
    const allLabel = t("allOption")
    return (
        <>
            <form className={styles.form}>
                <select value={media} onChange={handleMediaChange} name={"media"}>
                    <option value={"movie"}>{movieLabel}</option>
                    <option value={"tv"}>{tvLabel}</option>
                </select>
                <select value={genre} onChange={handleGenreChange} name={"genre"}>
                    <option value={""}>{allLabel}</option>
                    {genres.map(g => <option value={g.id} key={`${media}-genre-${g.id}`}>{g.name}</option>)}
                </select>
            </form>
            <div data-theme="light" className={"full-h"}>
                <Section title={title}>
                    <PosterGrid>
                        <DynamicPosterList
                            mediaType={media}
                            api={apiRoute}
                            queryKey={[apiRoute, media, genre]}
                            parameters={{media: media, genre: genre}}
                            enabled={router.isReady}
                            fallbackMessage={fallbackMessage}
                        />
                    </PosterGrid>
                </Section>
            </div>
        </>
    )
}