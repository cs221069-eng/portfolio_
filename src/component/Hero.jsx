import { useEffect, useState } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

const fallbackHero = {
  status: 'Available for Work',
  description:
    'Computer Science Student & MERN Stack Developer. Passionate about building scalable, user-centric web applications with modern digital solutions.',
}

function Hero() {
  const [heroData, setHeroData] = useState(fallbackHero)

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/hero`)

        if (!response.ok) {
          return
        }

        const data = await response.json()

        setHeroData({
          status: data.hero?.status || fallbackHero.status,
          description: data.hero?.description || fallbackHero.description,
        })
      } catch (error) {
        console.error('Failed to fetch hero data:', error)
      }
    }

    fetchHeroData()
  }, [])

  return (
    <section className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-12 px-6 py-16 md:py-24 lg:flex-row lg:py-32">
      <div className="flex-1 space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
          {heroData.status}
        </div>
        <h1 className="text-4xl font-black leading-tight tracking-tighter md:text-6xl lg:text-7xl">
          Muhammad Moiz <span className="text-primary">Siddiqui</span>
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400 md:text-xl">
          {heroData.description}
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <a
            className="flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold text-background-dark transition-transform hover:scale-105"
            href="#projects"
          >
            View Projects
            <i className="fa-solid fa-arrow-right text-base" aria-hidden="true"></i>
          </a>
          <a
            className="rounded-xl border border-slate-300 px-8 py-4 font-bold transition-colors hover:border-primary dark:border-primary/30"
            href="#contact"
          >
            Contact Me
          </a>
        </div>
      </div>
      <div className="w-full max-w-md flex-1 lg:max-w-none">
        <div className="group relative">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-blue-500 blur opacity-25 transition duration-1000 group-hover:opacity-50"></div>
          <div
            className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-slate-200 shadow-2xl dark:bg-slate-800"
            data-alt="Modern abstract portrait placeholder with tech aesthetic"
          >
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 to-background-dark">
              <i className="fa-solid fa-code text-8xl text-primary/20" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
