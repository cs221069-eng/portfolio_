function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-background-light py-10 dark:border-primary/10 dark:bg-background-dark">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="text-sm text-slate-500">© 2024 Muhammad Moiz Siddiqui. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <a className="flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-primary" href="#">
            LinkedIn
          </a>
          <a className="flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-primary" href="#">
            GitHub
          </a>
          <a className="flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-primary" href="#">
            Twitter
          </a>
        </div>
        <button
          className="flex size-10 items-center justify-center rounded-full border border-slate-200 transition-all hover:bg-primary hover:text-background-dark dark:border-primary/20"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          <i className="fa-solid fa-arrow-up text-sm" aria-hidden="true"></i>
        </button>
      </div>
    </footer>
  )
}

export default Footer
