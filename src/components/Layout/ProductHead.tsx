import {TvShowInterface} from "@/utils/models/tv/TvShow.interface";
import {MovieInterface} from "@/utils/models/Movies/Movie.interface";
import {generateUrlPage} from "@/utils/functions/generateUrlPage";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";
import Head from "next/head";

type props = {
        media: TvShowInterface,
        mediaType: "tv"
    } | {
        media: MovieInterface,
        mediaType: "movie"
    }


export function ProductHead({media,mediaType}:props){
    const mediaTitle = mediaType == "movie" ? media.title : media.name;
    const type = mediaType == "movie" ? "video.movie" : "video.tv_show"
    const duration = mediaType == "movie" ? media.runtime.toString() : undefined
    const title = `${mediaTitle} - Popcorn Search`;
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
            {duration && <meta property="og:video:duration" content={duration} />}
        </Head>
    )
}