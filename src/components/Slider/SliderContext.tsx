import {createContext, ReactNode, useContext} from "react";

type SliderContextType = {
    isEndVisible:boolean
}

const SliderContext = createContext(undefined as unknown as SliderContextType)

type props = {
    children:ReactNode,
    value:SliderContextType
}

export function SliderProvider({children,value}:props){
    return (
        <SliderContext.Provider value={value}>
            {children}
        </SliderContext.Provider>
    )
}

export function useSliderContext(){
    const context = useContext(SliderContext);
    if (!context)
        throw Error("Slider context has not been provided")
    return context
}