import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";

const ShowsNavbarContext = createContext([] as unknown as [boolean, Dispatch<SetStateAction<boolean>>])

type props = {
    children:ReactNode
}

export function ShowNavBarProvider({children}:props){
    const [show,setShow] = useState(false);
    return (
        <ShowsNavbarContext.Provider value={[show,setShow]}>
            {children}
        </ShowsNavbarContext.Provider>)
}

export function useShowNavBarContext(){
    return useContext(ShowsNavbarContext);
}