"use client";

import { useTheme } from "@/context/theme-context";
import { BsMoon, BsSun } from "react-icons/bs";

const ThemeSwitcher = () => {

    const {theme, toggleTheme} = useTheme()
  return (
    <button
      className=" bg-white dark:bg-slate-950 dark:text-white w-[2.5rem] h-[2.5rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-125 active:scale-105 transition-all"
      onClick={toggleTheme}
    >
      {theme === "light" ? <BsSun /> : <BsMoon />}
    </button>
  )
}

export default ThemeSwitcher