import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { ContactButton } from '../components/Buttons'
import { AuroraBackground } from '../components/ui/aurora-background'
import { SITE } from '../config'

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-30 bg-ink px-5 sm:px-8 md:px-10 pt-24 sm:pt-28 md:pt-32 pb-10 overflow-hidden"
    >
      <AuroraBackground className="absolute inset-0 -z-10 h-full" showRadialGradient={false} />
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-10 sm:gap-14">
        <FadeIn y={40}>
          <p className="text-mist/50 font-light uppercase tracking-widest text-xs sm:text-sm mb-5">
            Let&apos;s build something
          </p>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.6rem, 11vw, 150px)' }}
          >
            Get in touch
          </h2>
        </FadeIn>

        <FadeIn y={20} delay={0.15}>
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center gap-2 text-mist font-light hover:opacity-70 transition-opacity"
            style={{ fontSize: 'clamp(1.1rem, 3vw, 2rem)' }}
          >
            {SITE.email}
            <ArrowUpRight className="w-6 h-6" strokeWidth={1.5} />
          </a>
        </FadeIn>

        <FadeIn y={20} delay={0.25}>
          <div className="flex items-center gap-4 sm:gap-5">
            <Social href={SITE.github} label="GitHub">
              <Github className="w-5 h-5" />
            </Social>
            <Social href={SITE.linkedin} label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </Social>
            <Social href={`mailto:${SITE.email}`} label="Email">
              <Mail className="w-5 h-5" />
            </Social>
          </div>
        </FadeIn>

        <FadeIn y={20} delay={0.35}>
          <ContactButton href={`mailto:${SITE.email}`} />
        </FadeIn>
      </div>

      <div className="max-w-5xl mx-auto mt-20 sm:mt-28 pt-6 border-t border-mist/10 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="text-mist/40 text-xs uppercase tracking-widest">
          © {SITE.name} · {SITE.location}
        </span>
        <span className="text-mist/40 text-xs uppercase tracking-widest">
          {SITE.title}
        </span>
      </div>
    </footer>
  )
}

function Social({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid place-items-center w-12 h-12 rounded-full border border-mist/25 text-mist transition-colors duration-200 hover:bg-mist hover:text-ink"
    >
      {children}
    </a>
  )
}
