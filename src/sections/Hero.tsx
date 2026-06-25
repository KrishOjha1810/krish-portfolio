import { useState, lazy, Suspense } from 'react'
import Magnet from '../components/Magnet'
import FadeIn from '../components/FadeIn'
import ResumeMenu from '../components/ResumeMenu'
import { ContactButton } from '../components/Buttons'
import { AuroraBackground } from '../components/ui/aurora-background'
import { Spotlight } from '../components/ui/spotlight'
import { useEnable3D } from '../hooks/useEnable3D'
import { SITE, HERO_METRICS } from '../config'

const HeroNetwork = lazy(() => import('../components/three/HeroNetwork'))

export default function Hero() {
  const enable3D = useEnable3D()

  return (
    <section
      id="top"
      className="relative h-screen flex flex-col overflow-hidden"
      style={{ overflowX: 'clip' }}
    >
      {/* Layered backgrounds (21st.dev aurora + spotlight + dot grid + WebGL net) */}
      <AuroraBackground className="absolute inset-0 -z-10 h-full" showRadialGradient />
      <div className="absolute inset-0 -z-10 bg-dot-grid" />
      {enable3D && (
        <div className="absolute inset-0 -z-[5]">
          <Suspense fallback={null}>
            <HeroNetwork />
          </Suspense>
        </div>
      )}
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-40"
        fill="#BBCCD7"
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:grid md:grid-cols-12 md:items-center px-6 md:px-16 lg:px-24 gap-8 py-20 md:py-10 z-10">
        {/* Left Column: value prop */}
        <div className="flex flex-col justify-center md:col-span-7 text-left order-1">
          {SITE.available && (
            <FadeIn delay={0.05} y={16}>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-[11px] sm:text-xs font-medium uppercase tracking-widest text-emerald-300 mb-5 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {SITE.availability} · {SITE.availabilityWhere}
              </span>
            </FadeIn>
          )}

          <FadeIn delay={0.15} y={30}>
            <h1 className="hero-heading font-black uppercase tracking-tight leading-[0.9] text-[12vw] sm:text-[10vw] md:text-[7vw] lg:text-[8vw]">
              Hi, I&apos;m <span className="block">{SITE.firstName}</span>
            </h1>
          </FadeIn>

          {/* Mobile-only avatar positioning: inside the flow! */}
          <div className="md:hidden my-6 flex justify-center">
            <FadeIn delay={0.3} y={20} className="w-[180px] sm:w-[220px]">
              <Portrait />
            </FadeIn>
          </div>

          <FadeIn delay={0.32} y={20} className="mt-3 md:mt-5">
            <p className="text-mist font-semibold uppercase tracking-wide text-base sm:text-lg md:text-xl lg:text-2xl">
              {SITE.title}
            </p>
          </FadeIn>

          <FadeIn delay={0.4} y={20} className="mt-3">
            <p
              className="text-mist/80 font-light leading-relaxed max-w-[300px] sm:max-w-[440px] md:max-w-[480px]"
              style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.2rem)' }}
            >
              {SITE.tagline}
            </p>
          </FadeIn>

          {/* Proof metrics */}
          <FadeIn delay={0.48} y={20} className="mt-7">
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {HERO_METRICS.map((m) => (
                <div key={m.label} className="flex flex-col">
                  <span className="hero-heading font-black leading-none text-2xl sm:text-3xl">{m.value}</span>
                  <span className="text-mist/50 text-[10px] sm:text-xs uppercase tracking-wider mt-1.5 max-w-[120px]">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* CTAs */}
          <FadeIn delay={0.56} y={20} className="mt-8 flex flex-wrap items-center gap-4">
            <ContactButton href="#projects">View Work</ContactButton>
            <ResumeMenu variant="ghost" align="left" direction="up" />
          </FadeIn>
        </div>

        {/* Right Column: Magnetic Portrait - Desktop only */}
        <div className="hidden md:flex items-center justify-center md:col-span-5 order-2">
          <FadeIn
            delay={0.6}
            y={30}
            className="w-[280px] md:w-[320px] lg:w-[360px]"
          >
            <Magnet padding={150} strength={3}>
              <Portrait />
            </Magnet>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

function Portrait() {
  const [failed, setFailed] = useState(false)

  // Premium Web3 Avatar with glassmorphism frame
  // @ts-ignore
  if (SITE.heroVisual === 'pro-avatar' && !failed) {
    return (
      <div
        className="relative w-full aspect-square rounded-[32px] overflow-hidden select-none group"
        style={{
          boxShadow: '0 20px 60px -15px rgba(118,33,176,0.5), inset 0 0 0 1px rgba(255,255,255,0.1)',
          background: 'radial-gradient(100% 100% at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 100%)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 z-10 pointer-events-none" />
        <img
          src={SITE.photo}
          alt={SITE.name}
          onError={() => setFailed(true)}
          className="w-full h-full object-cover relative z-0 transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ objectPosition: SITE.photoFocus }}
          draggable={false}
        />
        {/* Breathing glow effect */}
        <div className="absolute -inset-1 rounded-[32px] mix-blend-color-dodge opacity-50 z-20 pointer-events-none animate-pulse"
             style={{ boxShadow: 'inset 0 0 40px rgba(182,0,168,0.3)' }} />
      </div>
    )
  }

  // Pixel-art PFP card (DiceBear), crisp pixels, brand glow.
  if (SITE.heroVisual === 'avatar' && !failed) {
    return (
      <div
        className="relative w-full aspect-square rounded-[36px] overflow-hidden select-none"
        style={{
          imageRendering: 'pixelated',
          boxShadow:
            '0 30px 80px -20px rgba(118,33,176,0.55), inset 0 0 0 2px rgba(215,226,234,0.18)',
        }}
      >
        <img
          src={SITE.avatarUrl}
          alt={SITE.name}
          onError={() => setFailed(true)}
          className="w-full h-full object-cover"
          style={{ imageRendering: 'pixelated' }}
          draggable={false}
        />
        <div
          className="absolute inset-0 pointer-events-none mix-blend-soft-light"
          style={{ background: 'linear-gradient(150deg, rgba(182,0,168,0.25), transparent 50%, rgba(118,33,176,0.2))' }}
        />
      </div>
    )
  }

  if (SITE.heroVisual === 'monogram' || failed) {
    // Styled monogram fallback shown until a real photo is added to /public.
    return (
      <div
        className="w-full aspect-[3/4] rounded-[28px] flex items-center justify-center select-none"
        style={{
          background:
            'radial-gradient(120% 120% at 30% 20%, #2a2e33 0%, #14161a 55%, #0c0c0c 100%)',
          boxShadow: 'inset 0 0 0 1px rgba(215,226,234,0.08)',
        }}
      >
        <span className="hero-heading font-black text-[28vw] sm:text-[16rem] leading-none">
          KO
        </span>
      </div>
    )
  }

  // Floating transparent cut-out (PNG with no background).
  if (SITE.photoCutout) {
    return (
      <img
        src={SITE.photo}
        alt={SITE.name}
        onError={() => setFailed(true)}
        className="w-full h-auto object-contain pointer-events-none select-none drop-shadow-2xl"
        draggable={false}
      />
    )
  }

  // Framed photo card (default), works with any normal photo.
  return (
    <div
      className="relative w-full aspect-[3/4] rounded-[28px] overflow-hidden select-none"
      style={{
        boxShadow:
          '0 30px 80px -20px rgba(118,33,176,0.45), inset 0 0 0 1px rgba(215,226,234,0.12)',
      }}
    >
      <img
        src={SITE.photo}
        alt={SITE.name}
        onError={() => setFailed(true)}
        className="w-full h-full object-cover pointer-events-none"
        style={{ objectPosition: SITE.photoFocus }}
        draggable={false}
      />
      {/* blend the base into the dark page + subtle brand tint */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(12,12,12,0.55) 100%)' }} />
      <div className="absolute inset-0 pointer-events-none mix-blend-soft-light" style={{ background: 'linear-gradient(150deg, rgba(182,0,168,0.18), transparent 45%, rgba(118,33,176,0.16))' }} />
    </div>
  )
}
