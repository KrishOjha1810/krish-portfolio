import { Boxes, Hexagon, Cpu, Database } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import AnimatedText from '../components/AnimatedText'
import { ContactButton } from '../components/Buttons'
import { ABOUT_TEXT } from '../config'

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-ink min-h-screen flex items-center justify-center px-6 sm:px-10 py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-dot-grid pointer-events-none" />
      {/* Decorative corner glyphs */}
      <FadeIn x={-80} y={0} delay={0.1} duration={0.9} className="absolute top-[5%] left-[2%] md:left-[5%] text-mist/10">
        <Hexagon className="w-[90px] sm:w-[130px] md:w-[170px] h-auto" strokeWidth={0.8} />
      </FadeIn>
      <FadeIn x={80} y={0} delay={0.15} duration={0.9} className="absolute top-[6%] right-[2%] md:right-[5%] text-mist/10">
        <Boxes className="w-[90px] sm:w-[130px] md:w-[170px] h-auto" strokeWidth={0.8} />
      </FadeIn>
      <FadeIn x={-80} y={0} delay={0.25} duration={0.9} className="absolute bottom-[8%] left-[3%] md:left-[8%] text-mist/10">
        <Cpu className="w-[80px] sm:w-[110px] md:w-[150px] h-auto" strokeWidth={0.8} />
      </FadeIn>
      <FadeIn x={80} y={0} delay={0.3} duration={0.9} className="absolute bottom-[8%] right-[3%] md:right-[8%] text-mist/10">
        <Database className="w-[80px] sm:w-[110px] md:w-[150px] h-auto" strokeWidth={0.8} />
      </FadeIn>

      <div className="relative w-full max-w-6xl mx-auto z-10 flex flex-col gap-12 sm:gap-16">
        <FadeIn y={30} className="text-center">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 10vw, 110px)' }}
          >
            About me
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left Column: Bio Text */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-10">
            <AnimatedText
              text={ABOUT_TEXT}
              className="text-mist font-normal leading-relaxed max-w-[620px]"
              style={{ fontSize: 'clamp(1rem, 1.8vw, 1.35rem)' }}
            />
            <FadeIn y={20}>
              <ContactButton href="#contact" />
            </FadeIn>
          </div>

          {/* Right Column: Framed Candid Photo */}
          <div className="flex justify-center items-center">
            <FadeIn delay={0.3} y={30} className="w-full max-w-[300px] sm:max-w-[320px] md:max-w-none">
              <div 
                className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-800/80 shadow-2xl select-none group"
                style={{
                  boxShadow: '0 30px 60px -15px rgba(118,33,176,0.25), inset 0 0 0 1px rgba(255,255,255,0.05)'
                }}
              >
                <img
                  src="/krish-about.jpg"
                  alt="Krish Ojha"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: '50% 25%' }}
                  draggable={false}
                />
                
                {/* Visual Blending Layers */}
                <div 
                  className="absolute inset-0 pointer-events-none" 
                  style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(12,12,12,0.85) 100%)' }} 
                />
                <div 
                  className="absolute inset-0 pointer-events-none mix-blend-soft-light" 
                  style={{ background: 'linear-gradient(150deg, rgba(182,0,168,0.12), transparent 50%, rgba(118,33,176,0.12))' }} 
                />

                {/* Subtitle Card Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-zinc-950/85 border border-zinc-800 px-3.5 py-2.5 rounded-xl backdrop-blur-md">
                  <div className="flex flex-col">
                    <span className="text-white font-semibold text-xs tracking-wider uppercase">Krish Ojha</span>
                    <span className="text-mist/40 text-[9px] font-mono tracking-widest uppercase mt-0.5">Indore, India</span>
                  </div>
                  <span className="text-[10px] text-violet-400 font-mono tracking-wider border border-violet-900/50 px-2 py-0.5 rounded bg-violet-950/20 uppercase">
                    Acropolis B.Tech
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
