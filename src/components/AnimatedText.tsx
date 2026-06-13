import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

type AnimatedTextProps = {
  text: string
  className?: string
  style?: React.CSSProperties
}

/**
 * Character-by-character scroll reveal. Each character fades from 0.2 -> 1 as
 * the paragraph moves through the viewport.
 */
export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const words = text.split(' ')
  let charIndex = 0
  const total = text.length

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, wi) => {
        const chars = word.split('')
        const node = (
          <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {chars.map((char) => {
              const start = charIndex / total
              const end = (charIndex + 1) / total
              charIndex++
              return (
                <Char key={charIndex} progress={scrollYProgress} range={[start, end]}>
                  {char}
                </Char>
              )
            })}
          </span>
        )
        // account for the space between words
        charIndex++
        return (
          <span key={`w-${wi}`}>
            {node}
            {wi < words.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </p>
  )
}

function Char({
  children,
  progress,
  range,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ opacity: 0.2 }}>{children}</span>
      <motion.span style={{ position: 'absolute', inset: 0, opacity }}>
        {children}
      </motion.span>
    </span>
  )
}
