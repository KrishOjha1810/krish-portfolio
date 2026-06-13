import type { ReactNode } from 'react'

type AnchorProps = {
  href: string
  children?: ReactNode
  className?: string
}

/**
 * Primary gradient pill - the signature "Contact Me" button.
 */
export function ContactButton({ href, children = 'Contact Me', className = '' }: AnchorProps) {
  return (
    <a
      href={href}
      className={
        'inline-block rounded-full text-white font-medium uppercase tracking-widest ' +
        'px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base ' +
        'transition-all duration-300 hover:scale-[1.03] active:scale-95 ' +
        'hover:shadow-[0_0_25px_rgba(182,0,168,0.6)] hover:brightness-110 ' +
        className
      }
      style={{
        background:
          'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow:
          '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid rgba(255,255,255,0.7)',
        outlineOffset: '-3px',
      }}
    >
      {children}
    </a>
  )
}

/**
 * Ghost / outline pill - "Live Project", "Source", etc.
 */
export function GhostButton({ href, children = 'Live Project', className = '' }: AnchorProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        'inline-block rounded-full border-2 border-mist text-mist font-medium uppercase tracking-widest ' +
        'px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm ' +
        'transition-colors duration-200 hover:bg-mist/10 ' +
        className
      }
    >
      {children}
    </a>
  )
}
