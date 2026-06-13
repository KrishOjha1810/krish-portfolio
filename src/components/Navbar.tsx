import FadeIn from './FadeIn'

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  return (
    <FadeIn as="nav" y={-20} delay={0}>
      <div className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8">
        <a
          href="#top"
          className="text-mist font-semibold uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70"
        >
          Krish<span className="hidden sm:inline">&nbsp;Ojha</span>
        </a>
        <div className="flex items-center gap-3 sm:gap-7 md:gap-12">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-mist font-medium uppercase tracking-wider text-[11px] sm:text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </FadeIn>
  )
}
