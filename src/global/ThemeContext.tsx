"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Themes = "dark" | "light";

const ThemeContext = createContext([] as unknown as [Themes, () => void]);

type props = {
  children: ReactNode;
};

export function ThemeProvider({ children }: props) {
  const [theme, setTheme] = useState<Themes>("dark");

  useEffect(() => {
    const localTheme = localStorage.getItem("theme") as Themes;
    if (localTheme) {
      setTheme(localTheme);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [theme]);

  const switchTheme = () => {
    const newTheme: Themes = theme == "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={[theme, switchTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
