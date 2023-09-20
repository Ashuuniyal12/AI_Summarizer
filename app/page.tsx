import Hero from "@/components/Hero"
import Demo from "@/components/Demo"

export default function Home() {
  return (
    <main className="dark:bg-gray-900" >
     <div className="main dark:bg-gray-900" >
      <div className="gradient "/>
     </div>

     <div className="app dark:text-white dark:border-gray-800 dark:bg-gray-900 dark:shadow-lg dark:bg-opacity-75 ">
      <Hero />
      <Demo />
     </div>
    </main>
  )
}
