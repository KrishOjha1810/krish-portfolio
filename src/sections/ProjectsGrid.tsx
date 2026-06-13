import { Github, ArrowUpRight } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import PointerGlow from '../components/PointerGlow'
import { MORE_PROJECTS } from '../config'

export default function ProjectsGrid() {
  return (
    <section className="relative z-20 bg-ink px-5 sm:px-8 md:px-10 pb-28 pt-4">
      <div className="max-w-6xl mx-auto">
        <FadeIn y={30}>
          <p className="text-mist/50 font-light uppercase tracking-widest text-xs sm:text-sm mb-10 text-center">
            More from the workshop
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {MORE_PROJECTS.map((p, i) => (
            <FadeIn key={p.name} delay={(i % 3) * 0.06} y={24}>
              <PointerGlow className="group h-full rounded-3xl border border-mist/12 bg-[#101316] p-6 flex flex-col gap-4 transition-colors duration-300 hover:border-mist/30">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-mist font-medium text-lg sm:text-xl">{p.name}</h3>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.name} source`}
                      className="text-mist/40 hover:text-mist transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${p.name} live`}
                        className="text-mist/40 hover:text-mist transition-colors"
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-mist/60 font-light text-sm leading-relaxed flex-1">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-mist/15 text-mist/55 px-2.5 py-0.5 text-[11px] uppercase tracking-wide"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </PointerGlow>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
