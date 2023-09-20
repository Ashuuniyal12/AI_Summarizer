"use client";

import { logo } from "@/assets";
import Image from "next/image";
import ThemeSwitcher from "./ThemeSwitcher";
import { AiFillGithub } from "react-icons/ai";
const Hero = () => {
  return (
    <>
      <div className="w-full top-5 absolute sm:px-20 px-5">
      <nav className="flex justify-between items-center w-full mb-10">
        <Image src={logo} alt="sumz_logo" className="w-28 object-contain" />
        <div className="flex gap-3">
          <button
            className="black_btn flex items-center justify-center gap-1"
            type="button"
            onClick={() =>
              window.open("https://github.com/Ashuuniyal12/AI_Summarizer")
            }
          >
            GitHub <AiFillGithub />
          </button>
          <ThemeSwitcher />
        </div>
      </nav>
      </div>

      <header className="w-full flex justify-center items-center flex-col mt-0 top-0 ">
        <h1 className="head_text">
          Summarize Articles With <br className="max-md:hidden" />
          <span className="orange_gradient">OpenAI GPT-4</span>
        </h1>
        <h2 className="desc">
          Simplify your reading with Summize , an open-source article summarizer
          that transfrom lengthy articles into clear & consise summaries
        </h2>
      </header>
    </>
  );
};

export default Hero;
