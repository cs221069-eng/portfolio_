import { useEffect, useState } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'



function Education() {
  const [educationItems, setEducationItems] = useState([])

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/education/all`)

        if (!response.ok) {
          return
        }

        const data = await response.json()

        if (Array.isArray(data) && data.length > 0) {
          setEducationItems(data)
        }
      } catch (error) {
        console.error('Failed to fetch education data:', error)
      }
    }

    fetchEducation()
  }, [])

  return (
    <section id="education" className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-12 text-center text-3xl font-bold">Education</h2>
        <div className="relative mx-auto max-w-3xl border-l-2 border-primary/30 pl-8">
          {educationItems.map((item) => (
            <div key={item._id} className="relative mb-10 last:mb-0">
              <div className="absolute -left-[41px] top-0 size-5 rounded-full border-4 border-background-dark bg-primary"></div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 dark:border-primary/10 dark:bg-slate-900">
                <span className="text-sm font-bold uppercase tracking-widest text-primary">{item.period}</span>
                <h3 className="mt-2 text-2xl font-bold">{item.title}</h3>
                <p className="text-lg font-medium text-slate-700 dark:text-slate-300">{item.place}</p>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1">
                    <span className="material-symbols-outlined text-primary text-sm">stars</span>
                    <span className="text-sm font-bold">CGPA: {item.cgpa}</span>
                  </div>
                  <span className="text-sm text-slate-500">{item.detail}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
