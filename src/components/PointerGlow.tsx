import { useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * A radial highlight that follows the cursor across the element. Drop it as a
 * relative wrapper; the glow sits above the background but below content.
 */
export default function PointerGlow({
  children,
  className,
  color = 'rgba(182,0,168,0.18)',
  size = 380,
  style,
}: {
  children: ReactNode
  className?: string
  color?: string
  size?: number
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: -9999, y: -9999 })
  const [active, setActive] = useState(false)

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect()
        if (!r) return
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={cn('relative overflow-hidden', className)}
      style={style}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(${size}px circle at ${pos.x}px ${pos.y}px, ${color}, transparent 65%)`,
        }}
      />
      {children}
    </div>
  )
}
