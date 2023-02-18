import {useEffect, useState} from "react";

type CheckedStore = Record<"movie" | "tv", number[]>

export function useCheckedButton(key:string,media:"movie" | "tv",id:number){
    const [checked,setChecked] = useState(false);
    const onClick = () => {
        const store = localStorage.getItem(key)
        if (store){
            const parsedStore = JSON.parse(store) as CheckedStore;
            const list = parsedStore[media];
            const index = list.indexOf(id)
            if (index >= 0){
                list.splice(index,1)
            } else {
                list.push(id)
            }
            localStorage.setItem(key,JSON.stringify(parsedStore))
            setChecked(parsedStore[media].includes(id))
        }
    }

    useEffect(() => {
        return () => {
            const store = localStorage.getItem(key)
            if (store){
                const parsedStore = JSON.parse(store) as CheckedStore;
                setChecked(parsedStore[media].includes(id))
            } else {
                localStorage.setItem(key,JSON.stringify({
                    "movie":[],
                    "tv":[]
                }))
                setChecked(false)
            }
        };
    }, [id,media,key]);

    return [checked,onClick] as const
}