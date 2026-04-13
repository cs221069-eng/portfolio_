import { useEffect, useState } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://portfolio-backend-eight-mu.vercel.app'

function About() {
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/about`)

        if (response.status === 204) {
          setDescription('')
          return
        }

        if (!response.ok) {
          return
        }

        const data = await response.json()
        setDescription(data.description || '')
      } catch (error) {
        console.error('Failed to fetch about data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAbout()
  }, [])

  return (
    <section id="about" className="bg-slate-50 py-20 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start gap-12 md:flex-row">
          <div className="w-full md:w-1/3">
            <h2 className="border-l-4 border-primary pl-4 text-3xl font-bold uppercase tracking-wider">About Me</h2>
          </div>
          <div className="w-full space-y-6 md:w-2/3">
            {isLoading ? (
              <div className="space-y-3">
                <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-10/12 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-8/12 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              </div>
            ) : description ? (
              <p className="text-xl leading-relaxed text-slate-700 dark:text-slate-300">
                {description}
              </p>
            ) : (
              <p className="text-base text-slate-500 dark:text-slate-400">
                About content abhi admin panel se add nahi hua.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
