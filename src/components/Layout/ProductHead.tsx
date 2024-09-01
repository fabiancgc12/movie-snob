import {TvShowInterface} from "@/models/tv/TvShow.interface";
import {MovieInterface} from "@/models/Movies/Movie.interface";
import {generateUrlPage} from "@/utils/functions/generateUrlPage";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";
import {PeopleDto} from "@/models/dto/Credit.dto";
import {NextSeo} from "next-seo";
import React from "react";
import Script from "next/script";

type props = {
    cast:PeopleDto[],
    crew:PeopleDto[]
} & ({
        media: TvShowInterface,
        mediaType: "tv"
    } | {
        media: MovieInterface,
        mediaType: "movie"
    })


export function ProductHead({media,mediaType,cast,crew}:props){
    const mediaTitle = mediaType == "movie" ? media.title : media.name;
    const type = mediaType == "movie" ? "video.movie" : "video.tv_show"
    const duration = mediaType == "movie" ? media.runtime.toString() : media.episode_run_time?.at(0)?.toString()
    const title = `${mediaTitle} - Movie Snob`;
    const jsonDl = mediaType == "movie" ? movieJsonLd(media,cast,crew) : tvJsonLd(media,cast,crew);
    const releaseDate = mediaType == "movie" ? media.release_date : media.first_air_date
    const directors = crew.filter(crew => crew.role.toLowerCase() == 'director')
    const writers = crew.filter(crew => crew.role.toLowerCase() == 'screenplay')
    return (
        <>
            <NextSeo
                title={title}
                openGraph={{
                    title,
                    description:media.overview,
                    url:generateUrlPage(media,"tv"),
                    images:[{
                        url:generateImageUrl(media.backdrop_path, 1280),
                        alt:`${mediaTitle} poster backdrop`
                    }],
                    siteName:"Movie Snob",
                    type:type,
                    locale:"en_US",
                    video:{
                        releaseDate:releaseDate,
                        duration:duration ? Number(duration) : undefined,
                        actors: cast.map(actor => ({
                            profile: actor.name,
                            role: actor.role
                        })),
                        directors: directors.map(director => director.name),
                        writers: writers.map(writer => writer.name),
                    },
                }}
                twitter={{
                    cardType:"summary_large_image",
                }}
            />
            <Script
                id="jsonDl"
                type="application/ld+json"
                dangerouslySetInnerHTML={jsonDl}
                key="item-jsonld"
            />
        </>
    )
}

function tvJsonLd(show:TvShowInterface,cast:PeopleDto[],crew:PeopleDto[]){
    const productions = show.production_companies || []
    const [castInfo,itemListElement] = handleCastList(cast)
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'TVSeries',
        name: show.name,
        headline: show.tagline,
        description: show.overview,
        itemListElement: itemListElement,
        actor: castInfo,
        author: crew.map(a => ({
            '@type': 'Person',
            name: a.name,
            jobTitle:a.role,
            image:generateImageUrl(a.profile_path)
        })),
        productionCompany:productions.map(p => ({
            '@type':'Organization',
            legalName:p.name,
            logo:generateImageUrl(p.logo_path)
        })),
        image: generateImageUrl(show.poster_path,1080),
        timeRequired:show.episode_run_time?.at(0),
        datePublished:show.first_air_date
    };

    return {
        __html: JSON.stringify(structuredData)
    }
}

function movieJsonLd(movie:MovieInterface,cast:PeopleDto[],crew:PeopleDto[]){
    const directors = crew.filter((a) => a.role.toLowerCase() === "director")
    const productions = movie.production_companies || []
    const [castInfo,itemListElement] = handleCastList(cast)
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Movie',
        name: movie.title,
        headline: movie.tagline,
        description: movie.overview,
        itemListElement: itemListElement,
        actor: castInfo,
        director:directors.map(d => ({
            '@type': 'Person',
            name: d.name,
            jobTitle:d.role,
            image:generateImageUrl(d.profile_path)
        })),
        author:directors.map(d => ({
            '@type': 'Person',
            name: d.name,
            jobTitle:d.role,
            image:generateImageUrl(d.profile_path)
        })),
        productionCompany:productions.map(p => ({
            '@type':'Organization',
            legalName:p.name,
            logo:generateImageUrl(p.logo_path)
        })),
        image: generateImageUrl(movie.poster_path,1080),
        duration:movie.runtime,
        datePublished:movie.release_date
    };
    return {
        __html: JSON.stringify(structuredData)
    }
}

function handleCastList(cast: PeopleDto[]){
    const castInfo = cast.map(a => ({
        '@type': 'Person',
        name: a.name,
        jobTitle:a.role,
        image:generateImageUrl(a.profile_path)
    }))
    const itemList = castInfo.map((cast, index) => ({
        "@type": "ListItem",
        position: (index + 1).toString(),
        item: cast
    }))

    return [castInfo, itemList]
}