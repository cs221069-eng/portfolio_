import { useEffect, useState } from 'react'
import axios from 'axios'

function Skills() {
  const [skills, setSkills] = useState([])

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/skill/all`)
        setSkills(response.data)
      } catch (error) {
        console.error('Error fetching skills:', error)
      }
    }

    fetchSkills()
  }, [])

  return (
    <section id="skills" className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold">Technical Expertise</h2>
          <div className="mx-auto h-1 w-20 bg-primary"></div>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="skill-card group flex flex-col items-center gap-4 rounded-2xl border border-slate-200 p-8 transition-all dark:border-primary/10"
            >
              <i className={`${skill.icon} text-3xl group-hover:text-primary`} aria-hidden="true"></i>
              <span className="text-sm font-bold uppercase tracking-widest">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
