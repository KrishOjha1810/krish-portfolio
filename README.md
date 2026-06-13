# Krish Ojha — Portfolio

A dark, animated single-page portfolio built with **React + TypeScript + Tailwind CSS + Framer Motion + Lucide**. Magnetic hero, scroll-driven tech marquee, character-reveal about text, and sticky-stacking project cards.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Make it yours — everything lives in `src/config.ts`

| What | Where |
|---|---|
| Email, GitHub, LinkedIn | `SITE.email` / `SITE.github` / `SITE.linkedin` |
| Hero name + tagline | `SITE.firstName`, `SITE.title`, `SITE.heroBlurb` |
| About paragraph | `ABOUT_TEXT` |
| Tech marquee chips | `MARQUEE_ROW_1`, `MARQUEE_ROW_2` |
| Expertise list | `EXPERTISE` |
| Experience + education | `EXPERIENCE`, `EDUCATION` |
| Project cards | `PROJECTS` |

### Add your photo

1. Drop your headshot into `public/` (e.g. `public/krish.jpg`).
2. Set `SITE.photo = '/krish.jpg'` in `src/config.ts`.

Until then, the hero shows a styled **KO** monogram fallback automatically.

> A portrait with a transparent background (PNG) sits best against the dark hero, like the reference design.

## Deploy

Vercel / Netlify: framework **Vite**, build `npm run build`, output `dist/`. No env vars needed.

## Structure

```
src/
  config.ts            ← all your content
  lib/utils.ts         cn() helper (shadcn / 21st.dev convention)
  components/
    ui/                21st.dev components (aurora-background, spotlight)
    FadeIn, Magnet, AnimatedText, Buttons, Navbar
    ScrollProgress, SmoothScroll, Stats, PointerGlow, TiltCard
  sections/            Hero, Marquee, About, Expertise, Experience, Projects, Footer
```

## Motion & 21st.dev

This project is wired for [21st.dev](https://21st.dev) / shadcn registry installs
(`components.json`, the `@/` alias, and `cn()` are all set up). Add any component with:

```bash
npx shadcn@latest add "https://21st.dev/r/<author>/<component>"
```

Already included from the registry: **aurora-background** and **spotlight** (Aceternity),
in `src/components/ui/`. Custom Framer Motion pieces:

| Component | Effect |
|---|---|
| `AuroraBackground` | animated aurora behind the hero & footer |
| `Spotlight` | sweeping light beam in the hero |
| `.bg-dot-grid` | masked dotted grid backdrop |
| `ScrollProgress` | gradient progress bar pinned to the top |
| `SmoothScroll` | Lenis momentum scrolling (respects reduced-motion) |
| `Stats` | count-up metrics band |
| `PointerGlow` | radial highlight that follows the cursor (cards, project panels) |
| `TiltCard` | subtle 3D tilt on the experience cards |
| `FadeIn` | blur-in + slide reveal on scroll (used everywhere) |

Tweak the aurora colours in `src/index.css` (`:root` `--blue-*` / `--violet-*` vars)
and the animation speeds in `tailwind.config.js` (`keyframes` / `animation`).
