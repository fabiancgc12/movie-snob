import { Banner } from "@/components/banner/Banner";
import { Inter } from '@next/font/google'
import mainShowImg from "./main_show.jpg"
import {CardList} from "@/components/movieCard/cardList";

const inter = Inter({ subsets: ['latin'] })

const show = {
    image:mainShowImg,
    title:"Peaky blinders",
    description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. A t e Lorem ipsum dolor sit amet, consectetur" +
     "adipisicing elit. A accusamus adipisci ducimus facere illo optio praesentium quae qu" +
    "rerum? Aliquam commodi deserunt eaque hic iusto, maiores pariatur saepe? Consequatur, nesciunt!"
}

export default function Home() {
  return (
    <main>
        <Banner data={show}/>
        <CardList title={"Currently watching"}/>
    </main>
  )
}
