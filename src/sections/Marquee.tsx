import { MARQUEE_ROW_1, MARQUEE_ROW_2 } from '../config'

export default function Marquee() {
  return (
    <div className="bg-ink pt-24 sm:pt-32 md:pt-40 pb-10 flex flex-col gap-3 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]">
      <Row items={MARQUEE_ROW_1} direction="left" variant="solid" />
      <Row items={MARQUEE_ROW_2} direction="right" variant="outline" />
    </div>
  )
}

function Row({
  items,
  direction,
  variant,
}: {
  items: string[]
  direction: 'left' | 'right'
  variant: 'solid' | 'outline'
}) {
  // Duplicate the list once so a -50% / 0 translate loops seamlessly.
  const doubled = [...items, ...items]
  return (
    <div className="group flex overflow-hidden">
      <div
        className={
          'flex gap-3 pr-3 w-max ' +
          (direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right') +
          ' group-hover:[animation-play-state:paused] will-change-transform'
        }
      >
        {doubled.map((label, i) => (
          <Tile key={`${label}-${i}`} label={label} variant={variant} />
        ))}
      </div>
    </div>
  )
}

function Tile({ label, variant }: { label: string; variant: 'solid' | 'outline' }) {
  return (
    <div
      className={
        'shrink-0 grid place-items-center rounded-2xl px-8 md:px-12 h-20 md:h-28 ' +
        (variant === 'solid' ? 'text-ink' : 'text-mist border border-mist/25')
      }
      style={
        variant === 'solid'
          ? { background: 'linear-gradient(180deg, #BBCCD7 0%, #8c97a0 100%)' }
          : { background: '#101316' }
      }
    >
      <span className="font-semibold uppercase tracking-wide text-lg md:text-2xl">{label}</span>
    </div>
  )
}
