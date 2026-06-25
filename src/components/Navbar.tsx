import { useEffect, useState } from 'react'
import ResumeMenu from './ResumeMenu'

const LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Work', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('top')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['top', ...LINKS.map((l) => l.id)]
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ink/70 backdrop-blur-md border-b border-mist/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10">
        <a
          href="#top"
          className="text-mist font-semibold uppercase tracking-wider text-sm md:text-lg transition-opacity hover:opacity-70"
        >
          Krish<span className="hidden sm:inline">&nbsp;Ojha</span>
        </a>

        {/* Desktop links with scroll-spy */}
        <div className="hidden md:flex items-center gap-7 lg:gap-10">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`text-xs lg:text-sm uppercase tracking-wider transition-colors duration-200 ${
                active === l.id ? 'text-mist' : 'text-mist/45 hover:text-mist/80'
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
            aria-label="Open command menu"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-mist/20 text-mist/60 px-3 py-1.5 text-xs hover:text-mist hover:border-mist/40 transition-colors"
          >
            <span className="font-mono">⌘K</span>
          </button>
          {/* Mobile: command palette doubles as the menu */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
            aria-label="Open menu"
            className="sm:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-mist/20 text-mist/70"
          >
            <span className="text-lg leading-none">⌘</span>
          </button>
          <ResumeMenu variant="solid" align="right" />
        </div>
      </div>
    </nav>
  )
}
