import {TvShowInterface} from "@/utils/models/tv/TvShow.interface";
import {MovieInterface} from "@/utils/models/Movies/Movie.interface";
import {generateUrlPage} from "@/utils/functions/generateUrlPage";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";
import Head from "next/head";
import {CreditsDto} from "@/utils/models/dto/Credit.dto";

type props = {
    credits:CreditsDto
} & ({
        media: TvShowInterface,
        mediaType: "tv"
    } | {
        media: MovieInterface,
        mediaType: "movie"
    })


export function ProductHead({media,mediaType,credits}:props){
    const mediaTitle = mediaType == "movie" ? media.title : media.name;
    const type = mediaType == "movie" ? "video.movie" : "video.tv_show"
    const duration = mediaType == "movie" ? media.runtime.toString() : media.episode_run_time?.at(0)?.toString()
    const title = `${mediaTitle} - Popcorn Search`;
    const jsonDl = mediaType == "movie" ? movieJsonLd(media,credits) : {__html:""};
    return (
        <Head>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta property="og:description" content={media.overview} />
            <meta property="og:url" content={generateUrlPage(media,"tv")} />
            <meta property="og:image" content={generateImageUrl(media.backdrop_path,1280)} />
            <meta property="og:image:alt" content={`${mediaTitle} poster backdrop`} />
            <meta property="og:site_name" content="Popcorn Search" />
            <meta property="og:type" content={type} />
            <meta property="og:locale" content="en_US" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:description" content={media.overview} />
            <meta name="twitter:image" content={generateImageUrl(media.backdrop_path,1280)} />
            <meta name="twitter:image:alt" content={`${mediaTitle} poster backdrop`} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={jsonDl}
                key="item-jsonld"
            />
            {duration && <meta property="og:video:duration" content={duration} />}
        </Head>
    )
}

const movieJsonLd = (movie:MovieInterface,credits:CreditsDto) => {
    const cast = credits.cast || [];
    const directors = credits.crew?.filter((a) => a.role.toLowerCase() === "director") || []
    const productions = movie.production_companies || []
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Movie',
        name: movie.title,
        headline: movie.tagline,
        description: movie.overview,
        actor: cast.map(a => ({
            '@type': 'Person',
            name: a.name,
            jobTitle:a.role,
            image:generateImageUrl(a.profile_path)
        })),
        director:directors.map(d => ({
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