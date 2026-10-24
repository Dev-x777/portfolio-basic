# PLAN.md: phased, parallel build

## Phase 0: Foundation (ONE agent, do this first, then stop for review)
- Scaffold Next.js App Router + TypeScript + Tailwind + pnpm. ESLint, Prettier.
- Install: lenis, gsap, motion, split-type (or custom splitter). Log each in docs/DECISIONS.md.
- Fonts via next/font (Bricolage Grotesque variable with wght and wdth axes, Newsreader). Design tokens from DESIGN.md as CSS variables and Tailwind theme.
- `components/providers/SmoothScroll.tsx` (Lenis + GSAP ticker sync, reduced-motion safe).
- `lib/motion/tokens.ts` (easings, durations) and small primitives: Magnetic, SplitText, usePrefersReducedMotion.
- `data/` files: profile.ts, projects.ts, experience.ts, skills.ts, achievements.ts (typed, from CONTENT.md).
- `app/layout.tsx`, `app/globals.css`, `app/page.tsx` importing EMPTY placeholder components from the exact paths below, so workstreams never touch shared files.
- Route stubs: `/work/[slug]`.
- Gate: `pnpm lint && pnpm build` passes; dev server shows all placeholder sections with smooth scroll working.

## Phase 1: parallel workstreams (separate agents, separate branches, no shared-file edits)
| WS | Owns (only edit these) | Deliverable |
|---|---|---|
| A: Hero + Nav | `components/hero/**`, `components/nav/**` | Variable-type name moment (load sequence + cursor/scroll response), sticky nav that hides on scroll down, full-screen menu overlay |
| B: Work | `components/work/**`, `app/work/**`, `data/projects.ts` | Design/Engineering toggle with layout animation, pinned stacking scroll moment, card hover, case-study pages, shared-element transition |
| C: About, Skills, Experience, Achievements | `components/about/**`, `components/skills/**`, `components/experience/**`, `components/achievements/**` | Four sections, restrained motion, real timeline |
| D: Contact + Footer | `components/contact/**`, `components/footer/**`, `app/api/contact/**` | Big contact panel, validated form with animated states (Resend or Formspree via env), live Chennai time, back to top |
| E: AI layer + SEO | `components/ai/**`, `components/command/**`, `app/api/ask/**`, `public/llms.txt`, `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts`, OG image route | Ask Dev (streaming, grounded in data/*, rate-limited, key only on server via env), Cmd/Ctrl+K palette, llms.txt, JSON-LD, sitemap, OG |

Each agent: read AGENTS.md and DESIGN.md first, build only its paths, run lint and build, screenshot at 360/768/1440, write status to docs/PROGRESS.md under its own heading, and stop.

## Phase 2: Integration and polish (ONE agent)
- Merge branches, resolve conflicts, check consistent spacing, type scale and palette across sections.
- Motion audit: confirm only the planned moments animate; remove anything that fights the "one hero moment, one scroll moment" budget.
- Performance: Lighthouse mobile above 90, no CLS, lazy-load heavy libs, optimize images.
- Accessibility pass: keyboard, focus rings, contrast, reduced motion, screen-reader labels.
- Full browser run-through at 360, 768, 1440 and 2560 widths; fix jank.

## Phase 3: Ship
- `.env.example` documenting every key, README with setup and "how to edit content", deploy to Vercel, add custom domain notes.
- List remaining TODOs for Devjeet (LinkedIn, LeetCode, real screenshots, résumé PDF, repo links).
