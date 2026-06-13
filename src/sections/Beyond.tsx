import { Music4, Activity, Zap } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import PointerGlow from '../components/PointerGlow'
import TiltCard from '../components/TiltCard'
import { BEYOND } from '../config'

const ICONS = [Music4, Activity, Zap]

export default function Beyond() {
  return (
    <section className="relative bg-ink px-5 sm:px-8 md:px-10 py-24 sm:py-28 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid opacity-50 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
        <FadeIn y={40}>
          <p className="text-mist/50 font-light uppercase tracking-widest text-xs sm:text-sm mb-3">
            Off the keyboard
          </p>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.6rem, 11vw, 140px)' }}
          >
            Beyond the code
          </h2>
        </FadeIn>

        <FadeIn y={20} delay={0.1}>
          <p className="text-mist/65 font-light leading-relaxed max-w-2xl mb-14 sm:mb-20" style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)' }}>
            {BEYOND.philosophy}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {BEYOND.interests.map((it, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <FadeIn key={it.title} delay={i * 0.1} y={28}>
                <TiltCard max={5}>
                  <PointerGlow className="h-full rounded-[28px] border border-mist/15 bg-[#101316] p-7 sm:p-8 flex flex-col gap-4">
                    <span className="grid place-items-center w-12 h-12 rounded-2xl bg-white/[0.04] border border-mist/10 text-mist/70">
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </span>
                    <h3 className="text-mist font-medium uppercase tracking-wide text-xl sm:text-2xl">
                      {it.title}
                    </h3>
                    <p className="text-mist/60 font-light leading-relaxed text-sm sm:text-base">
                      {it.blurb}
                    </p>
                  </PointerGlow>
                </TiltCard>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
