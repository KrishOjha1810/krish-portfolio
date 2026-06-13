import { useEffect, useState } from 'react'
import { Github, ExternalLink, Star, GitFork, Code2 } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import PointerGlow from '../components/PointerGlow'
import { SITE } from '../config'

// ---- types ------------------------------------------------------------------
type Day = { date: string; count: number; level: number }
type GhStats = { repos: number; stars: number; followers: number; langs: { name: string; pct: number }[] }
type LcStats = { total: number; easy: number; medium: number; hard: number }

const LEVEL_COLORS = [
  'rgba(215,226,234,0.06)',
  '#3a2350',
  '#6b258c',
  '#9d28a0',
  '#d12bb0',
]

export default function CodingStats() {
  const [days, setDays] = useState<Day[] | null>(null)
  const [totalContrib, setTotalContrib] = useState<number | null>(null)
  const [gh, setGh] = useState<GhStats | null>(null)
  const [lc, setLc] = useState<LcStats | null>(null)

  useEffect(() => {
    const ac = new AbortController()

    // 1) GitHub contribution calendar
    fetch(`https://github-contributions-api.jogruber.de/v4/${SITE.githubUser}?y=last`, { signal: ac.signal })
      .then((r) => r.json())
      .then((d: { total: Record<string, number>; contributions: Day[] }) => {
        setDays(d.contributions ?? [])
        const t = d.total?.lastYear ?? Object.values(d.total ?? {})[0]
        if (typeof t === 'number') setTotalContrib(t)
      })
      .catch(() => setDays([]))

    // 2) GitHub profile + repos → stars, langs
    Promise.all([
      fetch(`https://api.github.com/users/${SITE.githubUser}`, { signal: ac.signal }).then((r) => r.json()),
      fetch(`https://api.github.com/users/${SITE.githubUser}/repos?per_page=100&sort=updated`, { signal: ac.signal }).then((r) => r.json()),
    ])
      .then(([user, repos]) => {
        if (!Array.isArray(repos)) throw new Error('no repos')
        const stars = repos.reduce((s: number, r: { stargazers_count?: number }) => s + (r.stargazers_count ?? 0), 0)
        const langCount: Record<string, number> = {}
        repos.forEach((r: { language?: string | null }) => {
          if (r.language) langCount[r.language] = (langCount[r.language] ?? 0) + 1
        })
        const totalLang = Object.values(langCount).reduce((a, b) => a + b, 0) || 1
        const langs = Object.entries(langCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, n]) => ({ name, pct: Math.round((n / totalLang) * 100) }))
        setGh({ repos: user.public_repos ?? repos.length, stars, followers: user.followers ?? 0, langs })
      })
      .catch(() => setGh(null))

    // 3) LeetCode solved: try a primary API, fall back to a second, then to a link.
    const parseLc = (d: { totalSolved?: number; solvedProblem?: number; easySolved?: number; mediumSolved?: number; hardSolved?: number }) => {
      const total = d.totalSolved ?? d.solvedProblem
      if (typeof total === 'number') {
        setLc({ total, easy: d.easySolved ?? 0, medium: d.mediumSolved ?? 0, hard: d.hardSolved ?? 0 })
        return true
      }
      return false
    }
    fetch(`https://leetcode-api-faisalshohag.vercel.app/${SITE.leetcodeUser}`, { signal: ac.signal })
      .then((r) => r.json())
      .then((d) => {
        if (!parseLc(d)) throw new Error('shape')
      })
      .catch(() =>
        fetch(`https://alfa-leetcode-api.onrender.com/${SITE.leetcodeUser}/solved`, { signal: ac.signal })
          .then((r) => r.json())
          .then((d) => parseLc(d))
          .catch(() => setLc(null)),
      )

    return () => ac.abort()
  }, [])

  return (
    <section id="stats-detail" className="relative bg-ink px-5 sm:px-8 md:px-10 py-24 sm:py-28 md:py-32">
      <div className="max-w-6xl mx-auto">
        <FadeIn y={40}>
          <p className="text-mist/50 font-light uppercase tracking-widest text-xs sm:text-sm mb-3">
            By the numbers
          </p>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight mb-14 sm:mb-20"
            style={{ fontSize: 'clamp(3rem, 12vw, 150px)' }}
          >
            Activity
          </h2>
        </FadeIn>

        {/* Contribution heatmap */}
        <FadeIn y={30}>
          <PointerGlow className="rounded-[28px] border border-mist/15 bg-[#101316] p-5 sm:p-7 md:p-9 mb-6">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5 text-mist/60" />
                <span className="text-mist/80 font-medium">
                  {totalContrib !== null ? `${totalContrib.toLocaleString()} contributions` : 'GitHub contributions'} in the last year
                </span>
              </div>
              <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-mist/50 hover:text-mist text-sm transition-colors">
                @{SITE.githubUser} <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <Heatmap days={days} />
          </PointerGlow>
        </FadeIn>

        {/* Bottom row: GitHub summary + languages + LeetCode */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <FadeIn y={30} delay={0.05}>
            <PointerGlow className="h-full rounded-[28px] border border-mist/15 bg-[#101316] p-7">
              <h3 className="text-mist/50 uppercase tracking-widest text-xs mb-6">GitHub</h3>
              <div className="grid grid-cols-3 gap-4">
                <Metric icon={<Code2 className="w-4 h-4" />} value={gh?.repos} label="Repos" />
                <Metric icon={<Star className="w-4 h-4" />} value={gh?.stars} label="Stars" />
                <Metric icon={<GitFork className="w-4 h-4" />} value={gh?.followers} label="Followers" />
              </div>
            </PointerGlow>
          </FadeIn>

          <FadeIn y={30} delay={0.1}>
            <PointerGlow className="h-full rounded-[28px] border border-mist/15 bg-[#101316] p-7">
              <h3 className="text-mist/50 uppercase tracking-widest text-xs mb-6">Top languages</h3>
              {gh?.langs?.length ? (
                <div className="flex flex-col gap-3">
                  {gh.langs.map((l) => (
                    <div key={l.name}>
                      <div className="flex justify-between text-sm text-mist/70 mb-1">
                        <span>{l.name}</span>
                        <span className="text-mist/40">{l.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${l.pct}%`, background: 'linear-gradient(90deg,#7621B0,#B600A8)' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Skeleton lines={4} />
              )}
            </PointerGlow>
          </FadeIn>

          <FadeIn y={30} delay={0.15}>
            <PointerGlow color="rgba(255,161,22,0.16)" className="h-full rounded-[28px] border border-mist/15 bg-[#101316] p-7">
              <h3 className="text-mist/50 uppercase tracking-widest text-xs mb-6">LeetCode</h3>
              {lc ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-end gap-2">
                    <span className="hero-heading font-black text-5xl leading-none">{lc.total}</span>
                    <span className="text-mist/40 text-sm mb-1">solved</span>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <Tag color="#1cbaba">{lc.easy} Easy</Tag>
                    <Tag color="#ffb800">{lc.medium} Med</Tag>
                    <Tag color="#ff375f">{lc.hard} Hard</Tag>
                  </div>
                </div>
              ) : (
                <a href={SITE.leetcode} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-mist/70 hover:text-mist transition-colors">
                  View LeetCode profile <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </PointerGlow>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

function Heatmap({ days }: { days: Day[] | null }) {
  if (days === null) return <Skeleton lines={3} />
  if (days.length === 0) {
    return <p className="text-mist/40 text-sm">Contribution data unavailable right now.</p>
  }

  const lead = new Date(days[0].date).getDay() // empty cells before first day
  const cells = [...Array(lead).fill(null), ...days]

  return (
    <div className="overflow-x-auto pb-1">
      <div
        className="grid grid-flow-col gap-[3px] min-w-[680px]"
        style={{ gridTemplateRows: 'repeat(7, 11px)' }}
      >
        {cells.map((d, i) =>
          d === null ? (
            <div key={`e-${i}`} className="w-[11px] h-[11px]" />
          ) : (
            <div
              key={d.date}
              title={`${d.count} on ${d.date}`}
              className="w-[11px] h-[11px] rounded-[2px]"
              style={{ background: LEVEL_COLORS[d.level] ?? LEVEL_COLORS[0] }}
            />
          ),
        )}
      </div>
    </div>
  )
}

function Metric({ icon, value, label }: { icon: React.ReactNode; value?: number; label: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-1">
      <span className="text-mist/40">{icon}</span>
      <span className="hero-heading font-black text-3xl sm:text-4xl leading-none">
        {value !== undefined ? value : '·'}
      </span>
      <span className="text-mist/40 text-xs uppercase tracking-wider">{label}</span>
    </div>
  )
}

function Tag({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span className="rounded-full px-2.5 py-1 font-medium" style={{ color, background: `${color}1a` }}>
      {children}
    </span>
  )
}

function Skeleton({ lines }: { lines: number }) {
  return (
    <div className="flex flex-col gap-2.5 animate-pulse">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-3 rounded bg-white/5" style={{ width: `${90 - i * 12}%` }} />
      ))}
    </div>
  )
}
