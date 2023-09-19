"use client"

import { logo } from "@/assets"
import Image from 'next/image'

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col ">
      <nav className="flex justify-between items-center w-full pt-3 mb-10">
        <Image src={logo} alt="sumz_logo" className="w-28 object-contain" />
        <button className="black_btn" type="button" onClick={()=> window.open("https://github.com/Ashuuniyal12/AI_Summarizer")}>GitHub</button>
      </nav>

      <h1 className="head_text">Summarize Articles With <br className="max-md:hidden" />
      <span className="orange_gradient">OpenAI GPT-4</span></h1>
      <h2 className="desc">Simplify your reading with Summize , an open-source article summarizer that transfrom lengthy articles into clear & consise summaries</h2>
    </header>
  )
}

export default Hero