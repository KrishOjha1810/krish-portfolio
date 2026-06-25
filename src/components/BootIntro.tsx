import { useEffect, useState, useRef } from 'react'

interface BootIntroProps {
  onComplete: () => void
}

const BOOT_LOGS = [
  'booting krish_ojha portfolio…',
  '[ok] full-stack & web3 engineer · indore',
  '[ok] 20+ bridges · 95% contract coverage',
  '[ok] solidity · rust · typescript · python',
  'launching…',
]

export default function BootIntro({ onComplete }: BootIntroProps) {
  const [logs, setLogs] = useState<string[]>([])
  const [index, setIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Skip the intro entirely for reduced-motion users.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) onComplete()
  }, [onComplete])

  useEffect(() => {
    if (index < BOOT_LOGS.length) {
      const delay = index === 0 ? 150 : 130
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, BOOT_LOGS[index]])
        setIndex(index + 1)
      }, delay)
      return () => clearTimeout(timer)
    } else {
      const endTimer = setTimeout(onComplete, 350)
      return () => clearTimeout(endTimer)
    }
  }, [index, onComplete])

  // Scroll to bottom on new logs
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [logs])

  // Skip on ANY key press
  useEffect(() => {
    const handleKeyDown = () => onComplete()
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onComplete])

  return (
    <div
      onClick={onComplete}
      className="fixed inset-0 bg-ink z-[9999] flex flex-col justify-between font-mono p-6 sm:p-10 select-none text-emerald-400 cursor-pointer"
    >
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto max-w-3xl mx-auto w-full flex flex-col justify-start gap-2 pt-10 scrollbar-none"
      >
        <div className="text-xs sm:text-sm text-emerald-600/70 border-b border-emerald-950 pb-4 mb-4 uppercase tracking-wider flex justify-between items-center">
          <span>krish_ojha_os_v2.0.0</span>
          <span>Indore, India</span>
        </div>
        
        {logs.map((log, i) => {
          const isError = log.includes('[FAIL]')
          const isSystem = log.startsWith('booting') || log.startsWith('launching')
          const colorClass = isError 
            ? 'text-red-500' 
            : isSystem 
              ? 'text-fuchsia-400 font-bold' 
              : 'text-emerald-400'

          return (
            <div key={i} className={`text-sm sm:text-base md:text-lg leading-relaxed ${colorClass}`}>
              <span className="text-emerald-600 mr-2">&gt;</span>
              {log}
            </div>
          )
        })}
        {index < BOOT_LOGS.length && (
          <div className="text-sm sm:text-base md:text-lg animate-pulse flex items-center">
            <span className="text-emerald-600 mr-2">&gt;</span>
            <span className="w-2.5 h-5 bg-emerald-400 inline-block" />
          </div>
        )}
      </div>

      <div className="w-full max-w-3xl mx-auto flex justify-between items-center text-xs text-emerald-600/50 mt-4 border-t border-emerald-950/40 pt-4">
        <span>© 2026 Krish Ojha</span>
        <button
          onClick={onComplete}
          className="hover:text-emerald-400 transition-colors duration-200 uppercase tracking-widest border border-emerald-950/60 px-3 py-1 rounded hover:bg-emerald-950/20 active:scale-95"
        >
          Skip · click anywhere
        </button>
      </div>
    </div>
  )
}
