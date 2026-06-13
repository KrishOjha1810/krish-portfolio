import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import FadeIn from './FadeIn'

const STATS = [
  { value: 20, suffix: '+', label: 'Bridges integrated' },
  { value: 95, suffix: '%', label: 'Contract test coverage' },
  { value: 200, suffix: 'K+', label: 'On-chain rows processed' },
  { value: 6, suffix: '+', label: 'Protocol specs studied' },
]

export default function Stats() {
  return (
    <section className="bg-ink px-5 sm:px-8 md:px-10 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6">
        {STATS.map((s, i) => (
          <FadeIn key={s.label} delay={i * 0.08} y={24}>
            <div className="flex flex-col items-center text-center">
              <Counter value={s.value} suffix={s.suffix} />
              <span className="mt-2 text-mist/50 font-light uppercase tracking-widest text-[11px] sm:text-xs md:text-sm max-w-[140px]">
                {s.label}
              </span>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span
      ref={ref}
      className="hero-heading font-black leading-none tabular-nums"
      style={{ fontSize: 'clamp(2.6rem, 7vw, 5.5rem)' }}
    >
      {display}
      {suffix}
    </span>
  )
}
