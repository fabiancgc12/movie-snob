import styles from "@/components/movieCard/cardList.module.css";
import {MovieCard} from "@/components/movieCard/movieCard";
import poster from "@/pages/poster.jpg";

type props = {
    title:string
}

const list = [
    {
        title:"the last of us",
        poster:poster,
        vote_average:8.432,
        popularity:95.992
    },
    {
        title:"the last of us the last of us the last of us the last of us the last of us",
        poster:poster,
        vote_average:8.432,
        popularity:95.992
    },
    {
        title:"the last of us",
        poster:poster,
        vote_average:8.432,
        popularity:95.992
    },
    {
        title:"the last of us",
        poster:poster,
        vote_average:8.432,
        popularity:95.992
    },
    {
        title:"the last of us",
        poster:poster,
        vote_average:8.432,
        popularity:95.992
    },
    {
        title:"the last of us",
        poster:poster,
        vote_average:8.432,
        popularity:95.992
    },
    {
        title:"the last of us",
        poster:poster,
        vote_average:8.432,
        popularity:95.992
    },
    {
        title:"the last of us",
        poster:poster,
        vote_average:8.432,
        popularity:95.992
    },
    {
        title:"the last of us",
        poster:poster,
        vote_average:8.432,
        popularity:95.992
    },
    {
        title:"the last of us",
        poster:poster,
        vote_average:8.432,
        popularity:95.992
    },
    {
        title:"the last of us",
        poster:poster,
        vote_average:8.432,
        popularity:95.992
    },
    {
        title:"the last of us",
        poster:poster,
        vote_average:8.432,
        popularity:95.992
    },
    {
        title:"the last of us",
        poster:poster,
        vote_average:8.432,
        popularity:95.992
    },
    {
        title:"the last of us",
        poster:poster,
        vote_average:8.432,
        popularity:95.992
    },
    {
        title:"the last of us",
        poster:poster,
        vote_average:8.432,
        popularity:95.992
    },
]

export function CardList({title}:props){
    return (
        <section className={styles.section}>
            <h4>{title}</h4>
            <figure className={styles.cardList}>
                {list.map((e,i) => <MovieCard data={e} key={`card-${i}`}/>)}
            </figure>
        </section>

    )
}