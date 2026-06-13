import { useState } from 'react'
import SmoothScroll from './components/SmoothScroll'
import ScrollProgress from './components/ScrollProgress'
import BootIntro from './components/BootIntro'
import Hero from './sections/Hero'
import Marquee from './sections/Marquee'
import Stats from './components/Stats'
import About from './sections/About'
import Skills from './sections/Skills'
import CodingStats from './sections/CodingStats'
import Expertise from './sections/Expertise'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import ProjectsGrid from './sections/ProjectsGrid'
import AskKrish from './sections/AskKrish'
import Beyond from './sections/Beyond'
import Footer from './sections/Footer'

export default function App() {
  const [isBooted, setIsBooted] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('hasBooted') === 'true'
    }
    return false
  })

  if (!isBooted) {
    return (
      <BootIntro
        onComplete={() => {
          sessionStorage.setItem('hasBooted', 'true')
          setIsBooted(true)
        }}
      />
    )
  }

  return (
    <main className="bg-ink animate-fade-in" style={{ overflowX: 'clip' }}>
      <SmoothScroll />
      <ScrollProgress />
      <Hero />
      <Marquee />
      <Stats />
      <About />
      <Skills />
      <CodingStats />
      <Expertise />
      <Experience />
      <Projects />
      <ProjectsGrid />
      <AskKrish />
      <Beyond />
      <Footer />
    </main>
  )
}
