import {createContext, ReactNode, useContext, useEffect, useState} from "react";

type Themes = "dark" | "light"

const ThemeContext = createContext([] as unknown as [Themes, () => void])

type props = {
    children:ReactNode
}

export function ThemeProvider({children}:props){
    // const [theme,setTheme] = useState<Themes>("light");
    const [theme,setTheme] = useState<Themes>("light");

    useEffect(() => {
        const localTheme = localStorage.getItem("theme") as Themes;
        if (localTheme)
            setTheme(localTheme)
    }, []);

    const switchTheme = () => {
        const newTheme:Themes = theme == "light" ? "dark" : "light"
        setTheme(newTheme)
        localStorage.setItem("theme",newTheme)
    }

    return (
        <ThemeContext.Provider value={[theme,switchTheme]}>
            {children}
        </ThemeContext.Provider>)
}

export function useTheme(){
    return useContext(ThemeContext);
}