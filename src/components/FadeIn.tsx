import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type FadeInProps = {
  children: ReactNode
  delay?: number
  duration?: number
  x?: number
  y?: number
  blur?: number
  className?: string
  as?: 'div' | 'section' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'li' | 'nav'
}

const EASE = [0.25, 0.1, 0.25, 1] as const

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  blur = 8,
  className,
  as = 'div',
}: FadeInProps) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  )
}
