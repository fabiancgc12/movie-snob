import { Average } from "@/components/common/Average";
import {GetStaticPaths, GetStaticProps} from "next";
import Image from "next/image";
import styles from "./id.module.css";

const dummyData = {"adult":true,"backdrop_path":"/hZkgoQYus5vegHoetLkCJzb17zJ.jpg","belongs_to_collection":null,"budget":63000000,"genres":[{"id":18,"name":"Drama"},{"id":53,"name":"Thriller"},{"id":35,"name":"Comedy"}],"homepage":"http://www.foxmovies.com/movies/fight-club","id":550,"imdb_id":"tt0137523","original_language":"en","original_title":"Fight Club","overview":"A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.","popularity":72.65,
    "poster_path":"/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    "production_companies":[{"id":25,"logo_path":"/qZCc1lty5FzX30aOCVRBLzaVmcp.png","name":"20th Century Fox","origin_country":"US"},{"id":508,"logo_path":"/7cxRWzi4LsVm4Utfpr1hfARNurT.png","name":"Regency Enterprises","origin_country":"US"},{"id":711,"logo_path":"/tEiIH5QesdheJmDAqQwvtN60727.png","name":"Fox 2000 Pictures","origin_country":"US"},{"id":4700,"logo_path":"/A32wmjrs9Psf4zw0uaixF0GXfxq.png","name":"The Linson Company","origin_country":"US"},{"id":20555,"logo_path":"/hD8yEGUBlHOcfHYbujp71vD8gZp.png","name":"Taurus Film","origin_country":"DE"},{"id":54051,"logo_path":null,"name":"Atman Entertainment","origin_country":""},{"id":54052,"logo_path":null,"name":"Knickerbocker Films","origin_country":"US"}],"production_countries":[{"iso_3166_1":"US","name":"United States of America"}],"release_date":"1999-10-15","revenue":100853753,"runtime":139,"spoken_languages":[{"english_name":"English","iso_639_1":"en","name":"English"}],"status":"Released","tagline":"Mischief. Mayhem. Soap.","title":"Fight Club","video":false,"vote_average":8.432,"vote_count":25734}

type props = {
    data:typeof dummyData
}

function generateImageUrl(path:string) {
    return `https://image.tmdb.org/t/p/w500${path}`
}

function calculateRunTime(runtime:number){
    const date = new Date(0,0,0,0,runtime)
    // const date = new Date(runtime*1000)
    return `${date.getHours()}H ${date.getMinutes()}M`
}

export default function Movie({data}:props){
    const posterPath = generateImageUrl(data.poster_path)
    const backgroundPath = generateImageUrl(data.backdrop_path)
    return (
        <main>
            <div className={styles.banner}>
                <Image src={backgroundPath} alt={`${data.title} backdrop`} className={styles.backdrop} fill/>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.poster}>
                    <Image
                        src={posterPath}
                        alt={`${data.title} poster`}
                        priority
                        width={200}
                        height={350}
                    />
                </div>
                <h1 className={styles.title}>{data.title}</h1>
                <div className={styles.extraInfo}>
                    <div className={styles.genres}>
                        {data.genres.slice(0,3).map(g => <span className={"badge"} key={`genre-${g.id}`}>{g.name}</span>)}
                    </div>
                    <div>{calculateRunTime(data.runtime)}</div>
                </div>
                <div className={styles.extraInfo}>
                    <Average value={data.vote_average}/>
                    <small>{data.release_date.slice(0,4)}</small>
                    <small>share</small>
                    <small>checkmark</small>
                </div>
                <div>
                    <h2>Plot</h2>
                    <p>{data.overview}</p>
                </div>
            </div>
        </main>
    )
}

export const getStaticPaths:GetStaticPaths = () => {
    return {
        paths: [],
        fallback: "blocking",
    }
}

export const getStaticProps:GetStaticProps = () => {
    return {
        props: {
            data:dummyData
        }
    }
}