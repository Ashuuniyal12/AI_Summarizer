"use client";
import { copy, linkIcon, loader, tick, plane } from "@/assets";
import Image from "next/image";
import { useState, useEffect, FormEvent } from "react";
import {FaRegPaperPlane} from "react-icons/fa";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error ,setError] = useState<boolean>(false);
  const [allArticles, setAllArticles] = useState<{url:string, summary:string}[]>([]);
  const [copied, setCopied] = useState<boolean|string>();

   // Load data from localStorage on mount
   useEffect(() => {
    const articlesFromLocalStorage: any[] | null  = JSON.parse(
      localStorage.getItem("articles") || "null"
    );

    if (articlesFromLocalStorage !== null) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true); // Set loading to true when the request starts

    const existingArticle = allArticles.find(
      (item) => item.url === article.url
    );

    if (existingArticle) return setArticle(existingArticle);

    try {
      const url = `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${article.url}&length=3`;
     
      const data = await fetch(url, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API as string,
          "X-RapidAPI-Host": "article-extractor-and-summarizer.p.rapidapi.com",
        }
      });
     
      const response = await data.json();
      console.log(response)
      const newArticle = { ...article, summary: response.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      // update state and local storage
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    
    } catch (error) {
      // Handle error if necessary
      console.error(error);
      setError(true)
    } finally {
      setIsLoading(false); // Set loading to false when the request completes
    }
  }

  const handleCopy:any = (copyUrl:string) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleKeyDown = (e:any) => {
    if (e.keyCode === 13) {
      onSubmit(e);
    }
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* search bar */}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={onSubmit}
        >
          <Image
            src={linkIcon}
            alt="Link Icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            value={article.url}
            name="url"
            onKeyDown={handleKeyDown}
            placeholder="Enter a URL"
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 dark:text-white"
          >
            <FaRegPaperPlane/>
          </button>
        </form>
        {/* Browse URL History */}

        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticles.reverse().map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className='link_card'
            >
              <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                <Image
                  src={copied === item.url ? tick : copy}
                  alt={copied === item.url ? "tick_icon" : "copy_icon"}
                  className='w-[40%] h-[40%] object-contain'
                />
              </div>
              <p className='flex-1 font-satoshi text-blue-700 dark:text-blue-200 font-medium text-sm truncate'>
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Display Result */}

      <div className='my-10 max-w-full flex justify-center items-center'>
        {isLoading ? (
          <Image src={loader} alt='loader' className='w-20 h-20 object-contain' />
        ) : error ? (
          <p className='font-inter font-bold text-black text-center'>
            Well, that was not supposed to happen...
            <br />
          </p>
        ) : (
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 dark:text-gray-200 text-xl'>
                Article <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700 dark:text-gray-100'>
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>

    </section>
  );
};

export default Demo;
