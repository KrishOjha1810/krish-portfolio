import { ArrowUpRight, GraduationCap } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import TiltCard from '../components/TiltCard'
import PointerGlow from '../components/PointerGlow'
import { EXPERIENCE, EDUCATION } from '../config'

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative z-10 bg-ink rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-10"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-14 sm:mb-20 md:mb-24"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Experience
        </h2>
      </FadeIn>

      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* Role card */}
        <FadeIn y={30}>
          <TiltCard max={4}>
            <PointerGlow className="rounded-[28px] md:rounded-[40px] border border-mist/15 bg-[#101316] p-6 sm:p-8 md:p-10">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 mb-1">
                <h3 className="text-mist font-semibold uppercase tracking-wide text-2xl sm:text-3xl md:text-4xl">
                  {EXPERIENCE.company}
                </h3>
                <span className="text-mist/50 font-light uppercase tracking-widest text-xs sm:text-sm">
                  {EXPERIENCE.period}
                </span>
              </div>
              <p className="text-mist/70 font-light uppercase tracking-wide text-sm sm:text-base mb-6 md:mb-8">
                {EXPERIENCE.role} · {EXPERIENCE.place}
              </p>
              <ul className="flex flex-col gap-3 sm:gap-4">
                {EXPERIENCE.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-mist/80 font-light leading-relaxed text-sm sm:text-base md:text-lg"
                  >
                    <ArrowUpRight className="w-5 h-5 mt-0.5 shrink-0 text-mist/40" strokeWidth={1.5} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </PointerGlow>
          </TiltCard>
        </FadeIn>

        {/* Education card */}
        <FadeIn y={30} delay={0.1}>
          <TiltCard max={4}>
            <PointerGlow
              color="rgba(125,181,255,0.16)"
              className="rounded-[28px] md:rounded-[40px] border border-mist/15 bg-[#101316] p-6 sm:p-8 md:p-10 flex items-start gap-4 sm:gap-6"
            >
              <GraduationCap className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 text-mist/50" strokeWidth={1.3} />
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-mist font-medium text-lg sm:text-xl md:text-2xl">
                    {EDUCATION.degree}
                  </h3>
                  <span className="text-mist/50 font-light uppercase tracking-widest text-xs sm:text-sm">
                    {EDUCATION.period}
                  </span>
                </div>
                <p className="text-mist/70 font-light text-sm sm:text-base">
                  {EDUCATION.school} · {EDUCATION.place} · {EDUCATION.score}
                </p>
              </div>
            </PointerGlow>
          </TiltCard>
        </FadeIn>
      </div>
    </section>
  )
}
