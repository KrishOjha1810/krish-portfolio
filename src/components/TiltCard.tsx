import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Subtle pointer-driven 3D tilt. Honours prefers-reduced-motion by simply not
 * reacting (springs stay at rest).
 */
export default function TiltCard({
  children,
  className,
  max = 6,
}: {
  children: ReactNode
  className?: string
  max?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  const rx = useSpring(useTransform(my, [0, 1], [max, -max]), {
    stiffness: 150,
    damping: 18,
  })
  const ry = useSpring(useTransform(mx, [0, 1], [-max, max]), {
    stiffness: 150,
    damping: 18,
  })

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect()
        if (!r) return
        mx.set((e.clientX - r.left) / r.width)
        my.set((e.clientY - r.top) / r.height)
      }}
      onMouseLeave={() => {
        mx.set(0.5)
        my.set(0.5)
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={cn('will-change-transform', className)}
    >
      {children}
    </motion.div>
  )
}
