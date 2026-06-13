import { useEffect, useRef, useState } from 'react'
import { MARQUEE_ROW_1, MARQUEE_ROW_2 } from '../config'

export default function Marquee() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY
      const raw = (window.scrollY - top + window.innerHeight) * 0.3
      setOffset(raw)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Triple the arrays for a seamless band.
  const row1 = [...MARQUEE_ROW_1, ...MARQUEE_ROW_1, ...MARQUEE_ROW_1]
  const row2 = [...MARQUEE_ROW_2, ...MARQUEE_ROW_2, ...MARQUEE_ROW_2]

  return (
    <div
      ref={sectionRef}
      className="bg-ink pt-24 sm:pt-32 md:pt-40 pb-10 flex flex-col gap-3 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]"
    >
      <Row
        items={row1}
        transform={`translateX(${offset - 200}px)`}
        variant="solid"
      />
      <Row
        items={row2}
        transform={`translateX(${-(offset - 200)}px)`}
        variant="outline"
      />
    </div>
  )
}

function Row({
  items,
  transform,
  variant,
}: {
  items: string[]
  transform: string
  variant: 'solid' | 'outline'
}) {
  return (
    <div
      className="flex gap-3 whitespace-nowrap"
      style={{ transform, willChange: 'transform' }}
    >
      {items.map((label, i) => (
        <Tile key={`${label}-${i}`} label={label} variant={variant} />
      ))}
    </div>
  )
}

function Tile({ label, variant }: { label: string; variant: 'solid' | 'outline' }) {
  return (
    <div
      className={
        'shrink-0 grid place-items-center rounded-2xl px-8 md:px-12 h-20 md:h-28 ' +
        (variant === 'solid'
          ? 'text-ink'
          : 'text-mist border border-mist/25')
      }
      style={
        variant === 'solid'
          ? { background: 'linear-gradient(180deg, #BBCCD7 0%, #8c97a0 100%)' }
          : { background: '#101316' }
      }
    >
      <span className="font-semibold uppercase tracking-wide text-lg md:text-2xl">
        {label}
      </span>
    </div>
  )
}
