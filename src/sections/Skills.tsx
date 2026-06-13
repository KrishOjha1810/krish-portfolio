import { lazy, Suspense } from 'react'
import FadeIn from '../components/FadeIn'
import { useEnable3D } from '../hooks/useEnable3D'
import { SKILLS } from '../config'

const FloatingObject = lazy(() => import('../components/three/FloatingObject'))

// A techy "filename" per skill group for the code-window header.
const FILES: Record<string, string> = {
  'Blockchain & Web3': 'contracts.sol',
  'Rust & Backend': 'services.rs',
  'Full-Stack': 'app.tsx',
  'Data & ML': 'pipeline.py',
  'Tooling': 'devops.sh',
}

export default function Skills() {
  const enable3D = useEnable3D()

  return (
    <section id="skills" className="relative bg-ink px-5 sm:px-8 md:px-10 py-24 sm:py-28 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid opacity-60 pointer-events-none" />

      {/* Floating 3D accent (top-right, subtle) */}
      {enable3D && (
        <div className="absolute -top-10 right-[-10%] w-[340px] h-[340px] md:w-[440px] md:h-[440px] opacity-60 pointer-events-none">
          <Suspense fallback={null}>
            <FloatingObject />
          </Suspense>
        </div>
      )}

      <div className="relative max-w-6xl mx-auto">
        <FadeIn y={40}>
          <p className="text-mist/50 font-light uppercase tracking-widest text-xs sm:text-sm mb-3">
            The toolkit
          </p>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight mb-14 sm:mb-20"
            style={{ fontSize: 'clamp(3rem, 12vw, 150px)' }}
          >
            Skills
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {SKILLS.map((cat, i) => (
            <FadeIn key={cat.group} delay={(i % 3) * 0.08} y={24}>
              <div className="group h-full rounded-2xl border border-mist/12 bg-[#0e1014]/90 backdrop-blur-sm overflow-hidden transition-colors duration-300 hover:border-fuchsia-500/30">
                {/* window bar */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-mist/10 bg-white/[0.02]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/70" />
                  <span className="ml-2 font-mono text-xs text-mist/40 lowercase">{FILES[cat.group] ?? 'stack.txt'}</span>
                </div>
                {/* body */}
                <div className="p-5">
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] mb-4" style={{ color: '#c95cd6' }}>
                    {String(i + 1).padStart(2, '0')} / {cat.group}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="font-mono text-xs sm:text-[13px] text-mist/70 rounded-md border border-mist/10 bg-white/[0.03] px-2.5 py-1 transition-colors duration-200 hover:text-mist hover:border-fuchsia-500/40 hover:bg-fuchsia-500/[0.06]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
