import { useState } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

function Header() {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = () => {
    try {
      setIsDownloading(true)
      const link = document.createElement('a')
      link.href = `${API_BASE_URL}/api/resume/download`
      link.setAttribute('download', '')
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Failed to download resume:', error)
    } finally {
      window.setTimeout(() => setIsDownloading(false), 800)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-background-light/80 backdrop-blur-md dark:border-primary/20 dark:bg-background-dark/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <i className="fa-solid fa-terminal text-xl" aria-hidden="true"></i>
          </span>
          <span className="text-xl font-bold tracking-tight">
            Moiz<span className="text-primary">.dev</span>
          </span>
        </div>
        <nav className="hidden items-center gap-8 md:flex">
          <a className="text-sm font-medium transition-colors hover:text-primary" href="#about">
            About
          </a>
          <a className="text-sm font-medium transition-colors hover:text-primary" href="#skills">
            Skills
          </a>
          <a className="text-sm font-medium transition-colors hover:text-primary" href="#projects">
            Projects
          </a>
          <a className="text-sm font-medium transition-colors hover:text-primary" href="#education">
            Education
          </a>
          <a className="text-sm font-medium transition-colors hover:text-primary" href="#contact">
            Contact
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-bold text-background-dark transition-all hover:bg-primary/90"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            <i className="fa-solid fa-download text-sm" aria-hidden="true"></i>
            {isDownloading ? 'Downloading...' : 'CV'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
