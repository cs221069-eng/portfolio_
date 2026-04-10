import Header from '../component/Header.jsx'
import Hero from '../component/Hero.jsx'
import About from '../component/About.jsx'
import Skills from '../component/Skills.jsx'
import Projects from '../component/Projects.jsx'
import Education from '../component/Education.jsx'
import Contact from '../component/Contact.jsx'
import Footer from '../component/Footer.jsx'

function Home() {
  return (
    <div className="bg-background-light text-slate-900 antialiased transition-colors duration-300 dark:bg-background-dark dark:text-slate-100">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Home
