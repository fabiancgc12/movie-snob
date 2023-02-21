import {useEffect, useState} from "react";
import {TvShowInterface} from "@/utils/models/tv/TvShow.interface";
import {MovieInterface} from "@/utils/models/Movies/Movie.interface";

type CheckedStore = Record<"movie" | "tv", Record<number, {
    vote_average:number,
    poster_path:string
}>>

const defaultValue:CheckedStore = {
    "movie":{},
    "tv":{}
}

export function useCheckedButton(key:string,media:"movie" | "tv",product:MovieInterface | TvShowInterface){
    const [checked,setChecked] = useState(false);
    const onClick = () => {
        const store = localStorage.getItem(key)
        if (store){
            const parsedStore = JSON.parse(store) as CheckedStore;
            const checked = parsedStore[media];
            const item = checked[product.id]
            if (item){
                delete checked[product.id]
                setChecked(false)
            } else {
                checked[product.id] = {
                    vote_average:product.vote_average,
                    poster_path:product.poster_path
                }
                setChecked(true)
            }
            parsedStore[media] = checked
            localStorage.setItem(key,JSON.stringify(parsedStore))
        }
    }

    useEffect(() => {
        return () => {
            const store = localStorage.getItem(key)
            if (store){
                const parsedStore = JSON.parse(store) as CheckedStore;
                const itemExist = parsedStore[media][product.id]
                setChecked(!!itemExist)
            } else {
                localStorage.setItem(key,JSON.stringify(defaultValue))
                setChecked(false)
            }
        };
    }, [product,media,key]);

    return [checked,onClick] as const
}