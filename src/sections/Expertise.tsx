import FadeIn from '../components/FadeIn'
import { EXPERTISE } from '../config'

export default function Expertise() {
  return (
    <section
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn y={40}>
        <h2
          className="text-ink font-black uppercase text-center leading-none mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Expertise
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {EXPERTISE.map((item, i) => (
          <FadeIn key={item.name} delay={i * 0.1} y={30}>
            <div
              className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8 md:gap-12 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: i === 0 ? '1px solid rgba(12,12,12,0.15)' : undefined,
                borderBottom: '1px solid rgba(12,12,12,0.15)',
              }}
            >
              <span
                className="text-ink font-black leading-none shrink-0"
                style={{ fontSize: 'clamp(2.4rem, 9vw, 130px)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex flex-col gap-2 sm:gap-3 pt-1 sm:pt-2">
                <h3
                  className="text-ink font-medium uppercase leading-tight"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {item.name}
                </h3>
                <p
                  className="text-ink/60 font-light leading-relaxed max-w-2xl"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
