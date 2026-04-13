import { useEffect, useMemo, useRef, useState } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://portfolio-backend-eight-mu.vercel.app'

const fallbackProjects = [
  {
    _id: 'fallback-project',
    title: 'FYP-Management System',
    shortDescription:
      'A comprehensive portal for managing Final Year Projects, streamlining communication between students, supervisors, and coordinators.',
    details:
      'This project centralizes project allocation, milestone tracking, and communication for students, supervisors, and coordinators in one academic platform.',
    tags: ['MERN Stack', 'Academic'],
    technology: 'MERN Stack',
    liveUrl: '',
    codeUrl: '',
    screenshot: '',
    iconClass: 'fa-solid fa-clipboard-list',
  },
]

function normalizeProjectUrl(url) {
  if (!url) {
    return ''
  }

  if (/^https?:\/\//i.test(url)) {
    return url
  }

  return `https://${url}`
}

function resolveAssetUrl(url) {
  if (!url) {
    return ''
  }

  if (/^https?:\/\//i.test(url)) {
    return url
  }

  if (url.startsWith('/')) {
    return `${API_BASE_URL}${url}`
  }

  return url
}

function Projects() {
  const [projects, setProjects] = useState(fallbackProjects)
  const [selectedProjectId, setSelectedProjectId] = useState('')
  const sliderRef = useRef(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/project/all`)

        if (!response.ok) {
          return
        }

        const data = await response.json()

        if (Array.isArray(data) && data.length > 0) {
          setProjects(data)
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error)
      }
    }

    fetchProjects()
  }, [])

  useEffect(() => {
    const { body } = document
    const previousOverflow = body.style.overflow

    if (selectedProjectId) {
      body.style.overflow = 'hidden'
    }

    return () => {
      body.style.overflow = previousOverflow
    }
  }, [selectedProjectId])

  const selectedProject = useMemo(
    () => projects.find((project) => project._id === selectedProjectId) || null,
    [projects, selectedProjectId]
  )

  const scrollProjects = (direction) => {
    if (!sliderRef.current) {
      return
    }

    const scrollAmount = Math.max(sliderRef.current.clientWidth * 0.85, 320)
    sliderRef.current.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <section id="projects" className="bg-slate-50 py-20 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="mb-2 text-3xl font-bold">Featured Projects</h2>
            <p className="text-slate-500 dark:text-slate-400">Some of my recent work</p>
          </div>
          <a className="flex items-center gap-2 font-semibold text-primary hover:underline" href="#projects">
            View All <i className="fa-solid fa-arrow-up-right-from-square text-sm" aria-hidden="true"></i>
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="hidden size-11 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition-colors hover:border-primary hover:text-primary md:flex dark:border-primary/20 dark:bg-slate-900 dark:text-slate-200"
            onClick={() => scrollProjects(-1)}
            aria-label="Scroll projects left"
          >
            <i className="fa-solid fa-chevron-left" aria-hidden="true"></i>
          </button>

          <div
            ref={sliderRef}
            className="hide-scrollbar flex snap-x snap-mandatory gap-8 overflow-x-auto pb-2"
          >
          {projects.map((project) => (
            <div
              key={project._id}
              className="group min-w-full snap-start overflow-hidden rounded-2xl border border-slate-200 bg-background-light shadow-xl md:min-w-[calc(50%-1rem)] dark:border-primary/10 dark:bg-background-dark"
            >
              <div
                className="relative aspect-video overflow-hidden bg-slate-200 dark:bg-slate-800"
                data-alt={`${project.title} project preview`}
              >
                <div className="absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    type="button"
                    className="rounded-full bg-primary px-6 py-2 font-bold text-background-dark"
                    onClick={() => setSelectedProjectId(project._id)}
                  >
                    Details
                  </button>
                </div>
                {project.screenshot ? (
                  <img
                    src={resolveAssetUrl(project.screenshot)}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <i className={`${project.iconClass || 'fa-solid fa-clipboard-list'} text-5xl text-slate-500`} aria-hidden="true"></i>
                  </div>
                )}
              </div>
              <div className="p-8">
                <div className="mb-4 flex gap-2">
                  {(project.tags || []).map((tag) => (
                    <span
                      key={`${project._id}-${tag}`}
                      className="rounded bg-primary/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mb-3 text-2xl font-bold">{project.title}</h3>
                <p className="mb-6 line-clamp-2 text-slate-600 dark:text-slate-400">{project.shortDescription}</p>
                {project.technology ? (
                  <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary">{project.technology}</p>
                ) : null}
                <div className="flex items-center gap-6">
                  {project.liveUrl ? (
                    <a
                      className="flex items-center gap-2 text-sm font-bold transition-colors hover:text-primary"
                      href={normalizeProjectUrl(project.liveUrl)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa-solid fa-link text-sm" aria-hidden="true"></i>
                      Live Demo
                    </a>
                  ) : null}
                  {project.codeUrl ? (
                    <a
                      className="flex items-center gap-2 text-sm font-bold transition-colors hover:text-primary"
                      href={normalizeProjectUrl(project.codeUrl)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa-solid fa-code text-sm" aria-hidden="true"></i>
                      Code
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          ))}

          {projects.length < 2 ? (
            <div className="flex min-w-full snap-start flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-background-light/70 p-8 opacity-60 md:min-w-[calc(50%-1rem)] dark:border-primary/10 dark:bg-background-dark/50">
              <i className="fa-solid fa-ellipsis text-4xl" aria-hidden="true"></i>
              <p className="font-bold">More Projects Coming Soon</p>
            </div>
          ) : null}
          </div>

          <button
            type="button"
            className="hidden size-11 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition-colors hover:border-primary hover:text-primary md:flex dark:border-primary/20 dark:bg-slate-900 dark:text-slate-200"
            onClick={() => scrollProjects(1)}
            aria-label="Scroll projects right"
          >
            <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      {selectedProject ? (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 px-4 py-6 sm:px-6 sm:py-10"
          onClick={() => setSelectedProjectId('')}
        >
          <div
            className="mx-auto flex min-h-full w-full max-w-3xl items-center justify-center"
          >
            <div
              className="hide-scrollbar w-full max-h-[calc(100vh-3rem)] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-primary/10 dark:bg-slate-900 sm:p-8"
              onClick={(event) => event.stopPropagation()}
            >
            <div className="mb-6 flex items-start justify-between gap-6">
              <div>
                <div className="mb-4 flex flex-wrap gap-2">
                  {(selectedProject.tags || []).map((tag) => (
                    <span
                      key={`${selectedProject._id}-modal-${tag}`}
                      className="rounded bg-primary/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-3xl font-bold">{selectedProject.title}</h3>
              </div>

              <button
                type="button"
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold transition-colors hover:border-primary dark:border-primary/20"
                onClick={() => setSelectedProjectId('')}
              >
                Close
              </button>
            </div>

            <p className="mb-4 text-lg text-slate-700 dark:text-slate-300">{selectedProject.shortDescription}</p>
            {selectedProject.technology ? (
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">{selectedProject.technology}</p>
            ) : null}
              {selectedProject.screenshot ? (
                <img
                  src={resolveAssetUrl(selectedProject.screenshot)}
                  alt={selectedProject.title}
                  className="mb-6 max-h-[24rem] w-full rounded-2xl object-cover"
                />
            ) : null}
            <p className="mb-8 leading-8 text-slate-600 dark:text-slate-400">{selectedProject.details}</p>

            <div className="flex flex-wrap items-center gap-6">
              {selectedProject.liveUrl ? (
                <a
                  className="flex items-center gap-2 text-sm font-bold transition-colors hover:text-primary"
                  href={normalizeProjectUrl(selectedProject.liveUrl)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa-solid fa-link text-sm" aria-hidden="true"></i>
                  Live Demo
                </a>
              ) : null}
              {selectedProject.codeUrl ? (
                <a
                  className="flex items-center gap-2 text-sm font-bold transition-colors hover:text-primary"
                  href={normalizeProjectUrl(selectedProject.codeUrl)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa-solid fa-code text-sm" aria-hidden="true"></i>
                  Code
                </a>
              ) : null}
            </div>
          </div>
        </div>
        </div>
      ) : null}
    </section>
  )
}

export default Projects
