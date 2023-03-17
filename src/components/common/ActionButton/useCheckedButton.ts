import {useEffect, useState} from "react";

export type ProductStore = Record<"movie" | "tv", Record<number, {
    id:number,
    vote_average:number,
    poster_path:string,
    title?:string,
    name?:string
}>>

const defaultValue:ProductStore = {
    "movie":{},
    "tv":{}
}

export type StoreProductType = {
    id:number,
    vote_average:number,
    poster_path:string,
    name?:string,
    title?:string,
}

export function useCheckedButton(key:string,media:"movie" | "tv",product:StoreProductType){
    const [checked,setChecked] = useState(false);
    const onClick = () => {
        const store = localStorage.getItem(key)
        if (store){
            const parsedStore = JSON.parse(store) as ProductStore;
            const checked = parsedStore[media];
            const item = checked[product.id]
            if (item){
                delete checked[product.id]
                setChecked(false)
            } else {
                checked[product.id] = {
                    id:product.id,
                    vote_average:product.vote_average,
                    poster_path:product.poster_path,
                    title:product.title,
                    name:product.name
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
                const parsedStore = JSON.parse(store) as ProductStore;
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