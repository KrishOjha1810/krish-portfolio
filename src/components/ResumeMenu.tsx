import { useState, useRef, useEffect } from 'react'
import { FileText, ChevronDown } from 'lucide-react'
import { SITE } from '../config'

type Props = {
  variant?: 'ghost' | 'solid'
  align?: 'left' | 'right'
  direction?: 'up' | 'down'
}

/** Résumé button that opens a small menu of role-specific résumés. */
export default function ResumeMenu({ variant = 'ghost', align = 'right', direction = 'down' }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onEsc)
    }
  }, [])

  const trigger =
    variant === 'solid'
      ? 'inline-flex items-center gap-1.5 rounded-full bg-mist text-ink font-semibold uppercase tracking-wider px-4 py-1.5 text-[11px] sm:text-xs hover:bg-white transition-colors'
      : 'inline-flex items-center gap-2 rounded-full border-2 border-mist/40 text-mist font-medium uppercase tracking-widest px-7 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm transition-colors hover:bg-mist/10 hover:border-mist'

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={trigger}
      >
        <FileText className="w-4 h-4" /> Résumé
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="menu"
          className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} ${
            direction === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'
          } w-60 rounded-xl border border-mist/15 bg-[#0e1014] shadow-2xl p-1.5 z-[60]`}
        >
          <p className="px-3 py-2 text-[10px] uppercase tracking-widest text-mist/35">
            Résumé by role
          </p>
          {SITE.resumes.map((r) => (
            <a
              key={r.file}
              href={r.file}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-mist/75 hover:bg-white/10 hover:text-mist transition-colors"
            >
              <FileText className="w-4 h-4 text-mist/40" /> {r.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
