import { useEffect, useState } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

const fallbackDescription =
  'I am an 8th-semester Computer Science student at DHA Suffa University with a dedicated focus on software engineering and web technologies. Maintaining a CGPA of 3.54, I have balanced academic excellence with practical application. I specialize in the MERN stack and am dedicated to creating efficient, user-centric digital solutions that solve real-world problems.'

function About() {
  const [description, setDescription] = useState(fallbackDescription)

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/about`)

        if (!response.ok) {
          return
        }

        const data = await response.json()
        setDescription(data.description || fallbackDescription)
      } catch (error) {
        console.error('Failed to fetch about data:', error)
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
            <p className="text-xl leading-relaxed text-slate-700 dark:text-slate-300">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
