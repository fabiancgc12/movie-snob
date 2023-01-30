import styles from "@/components/movieCard/cardList.module.css";
import {MovieCard} from "@/components/movieCard/movieCard";
import poster from "@/pages/poster.jpg";

type props = {

}

const list = [
    {
        title:"the last of us",
        poster:poster
    },
    {
        title:"the last of us",
        poster:poster
    },
    {
        title:"the last of us",
        poster:poster
    },
    {
        title:"the last of us",
        poster:poster
    },
    {
        title:"the last of us",
        poster:poster
    },
    {
        title:"the last of us",
        poster:poster
    },
    {
        title:"the last of us",
        poster:poster
    },
    {
        title:"the last of us",
        poster:poster
    },
    {
        title:"the last of us",
        poster:poster
    },
    {
        title:"the last of us",
        poster:poster
    },
    {
        title:"the last of us",
        poster:poster
    },
    {
        title:"the last of us",
        poster:poster
    },
    {
        title:"the last of us",
        poster:poster
    },
    {
        title:"the last of us",
        poster:poster
    },
    {
        title:"the last of us",
        poster:poster
    },
]

export function CardList({}:props){
    return (
        <figure className={styles.cardList}>
            {list.map((e,i) => <MovieCard data={e} key={`card-${i}`}/>)}
        </figure>
    )
}