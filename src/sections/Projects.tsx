import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Github } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import PointerGlow from '../components/PointerGlow'
import { GhostButton } from '../components/Buttons'
import { PROJECTS, type Project } from '../config'

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      id="projects"
      className="relative z-20 bg-ink rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-32"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-10 sm:mb-14 md:mb-20"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Projects
        </h2>
      </FadeIn>

      <div ref={containerRef} className="max-w-6xl mx-auto">
        {PROJECTS.map((project, i) => {
          const targetScale = 1 - (PROJECTS.length - 1 - i) * 0.03
          const range: [number, number] = [i / PROJECTS.length, 1]
          return (
            <Card
              key={project.num}
              project={project}
              index={i}
              progress={scrollYProgress}
              range={range}
              targetScale={targetScale}
            />
          )
        })}
      </div>
    </section>
  )
}

function Card({
  project,
  index,
  progress,
  range,
  targetScale,
}: {
  project: Project
  index: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  range: [number, number]
  targetScale: number
}) {
  const scale = useTransform(progress, range, [1, targetScale])
  const [imgError, setImgError] = useState(false)
  const showImage = Boolean(project.image) && !imgError

  return (
    <div className="h-[85vh] flex items-start justify-center sticky top-24 md:top-32">
      <motion.div
        style={{ scale, top: `${index * 28}px` }}
        className="relative w-full rounded-[32px] sm:rounded-[44px] md:rounded-[56px] border-2 border-mist bg-ink p-4 sm:p-6 md:p-8 origin-top"
      >
        {/* Top row */}
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4 mb-4 sm:mb-6 md:mb-8">
          <div className="flex items-start gap-4 sm:gap-6">
            <span
              className="text-mist font-black leading-none"
              style={{ fontSize: 'clamp(2.6rem, 8vw, 120px)' }}
            >
              {project.num}
            </span>
            <div className="flex flex-col gap-1 pt-1 sm:pt-3">
              <span className="text-mist/50 font-medium uppercase tracking-widest text-xs sm:text-sm">
                {project.category}
              </span>
              <h3 className="text-mist font-medium uppercase leading-tight text-2xl sm:text-3xl md:text-4xl">
                {project.name}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            {project.liveUrl && <GhostButton href={project.liveUrl}>Live</GhostButton>}
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-mist text-mist font-medium uppercase tracking-widest px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm transition-colors duration-200 hover:bg-mist/10"
            >
              <Github className="w-4 h-4" /> Source
            </a>
          </div>
        </div>

        {/* Bottom row: blurb + visual panel */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6">
          {/* Left: copy */}
          <div className="md:col-span-2 flex flex-col gap-5 sm:gap-6 justify-between">
            <p className="text-mist/75 font-light leading-relaxed text-sm sm:text-base md:text-lg">
              {project.blurb}
            </p>
            <ul className="flex flex-col gap-2.5">
              {project.highlights.map((h, hi) => (
                <li
                  key={hi}
                  className="flex gap-2.5 text-mist/65 font-light text-xs sm:text-sm leading-snug"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-mist/40 shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-mist/20 text-mist/70 px-3 py-1 text-[11px] sm:text-xs uppercase tracking-wide"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Right: accent visual */}
          <PointerGlow
            color="rgba(255,255,255,0.18)"
            size={300}
            className="md:col-span-3 rounded-[28px] sm:rounded-[36px] md:rounded-[44px] min-h-[220px] sm:min-h-[280px] md:min-h-[360px] border border-mist/10"
            style={{ background: project.accent }}
          >
            {showImage ? (
              <>
                <img
                  src={project.image}
                  alt={`${project.name} preview`}
                  loading="lazy"
                  decoding="async"
                  onError={() => setImgError(true)}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, rgba(12,12,12,0) 55%, rgba(12,12,12,0.5) 100%)' }}
                />
              </>
            ) : (
              <>
                <div
                  className="absolute inset-0 opacity-30 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.5), transparent 45%), radial-gradient(circle at 15% 85%, rgba(0,0,0,0.5), transparent 50%)',
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/90 font-black uppercase tracking-tight leading-none text-center px-6 text-4xl sm:text-6xl md:text-7xl drop-shadow-lg">
                    {project.name}
                  </span>
                </div>
              </>
            )}
          </PointerGlow>
        </div>
      </motion.div>
    </div>
  )
}
