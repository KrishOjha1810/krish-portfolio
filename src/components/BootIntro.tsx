import { useEffect, useState, useRef } from 'react'

interface BootIntroProps {
  onComplete: () => void
}

const BOOT_LOGS = [
  'SYSTEM BOOT PROTOCOL INITIATED...',
  '[OK] ACQUIRING CORE IDENTITY: KRISH OJHA',
  '[OK] DETECTING LOCALE: INDORE, INDIA',
  '[OK] CONFIRMING DEGREE: B.TECH CS & DATA SCIENCE',
  '[OK] PARSING WORK PROFILE: ANCILAR BACKEND DEV',
  '[OK] SOLVING LEETCODE SUBROUTINES: 213 SUB-PROBLEMS COMPLETED',
  '[OK] BOOTING SMART CONTRACT INTERFACES (SOLIDITY/FOUNDRY)',
  '[OK] CONNECTING CROSS-CHAIN MONITOR: 20+ ACTIVE BRIDGES INDEXED',
  '[OK] DEPLOYING RUST AXUM MICROSERVICES',
  '[OK] ACTIVATING PROMPTGUARD LOCAL SEC-LAYER',
  'SYSTEM READY. LAUNCHING PORTFOLIO...',
]

export default function BootIntro({ onComplete }: BootIntroProps) {
  const [logs, setLogs] = useState<string[]>([])
  const [index, setIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (index < BOOT_LOGS.length) {
      const delay = index === 0 ? 300 : index === BOOT_LOGS.length - 1 ? 500 : Math.random() * 150 + 50
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, BOOT_LOGS[index]])
        setIndex(index + 1)
      }, delay)
      return () => clearTimeout(timer)
    } else {
      const endTimer = setTimeout(() => {
        onComplete()
      }, 600)
      return () => clearTimeout(endTimer)
    }
  }, [index, onComplete])

  // Scroll to bottom on new logs
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [logs])

  // Keypress listener for Escape key to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onComplete()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-ink z-[9999] flex flex-col justify-between font-mono p-6 sm:p-10 select-none text-emerald-400">
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
          const isSystem = log.startsWith('SYSTEM')
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
          Skip Intro [Esc]
        </button>
      </div>
    </div>
  )
}
