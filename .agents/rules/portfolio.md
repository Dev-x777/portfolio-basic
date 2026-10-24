# AGENTS.md: always-on rules for the Devjeet Saha portfolio

You are building the portfolio of DEVJEET SAHA (Dev), a product and backend engineer.
Before EVERY task, re-read: `docs/DESIGN.md`, `docs/CONTENT.md`, `docs/PLAN.md`.
These files are the source of truth. If this chat and the files disagree, the files win.

## Stack
Next.js (latest, App Router) + TypeScript + Tailwind CSS, pnpm.
Smooth scroll: Lenis. Scroll-driven timelines: GSAP + ScrollTrigger (synced to Lenis ticker).
Interaction and route transitions: Motion (framer-motion). Fonts: next/font.

## Hard rules
1. Content lives only in `data/*.ts`, copied from `docs/CONTENT.md`. Never invent facts, metrics or links. Unknown = `TODO` placeholder. No lorem ipsum.
2. Animate only `transform` and `opacity` (plus `clip-path`/variable-font axes where DESIGN.md says so). Never animate layout properties on scroll.
3. All motion goes through `lib/motion/*` (shared easings, durations, helpers). No ad-hoc magic numbers.
4. Respect `prefers-reduced-motion` (disable Lenis, pinning and scrubbing) and disable cursor effects on touch.
5. No new dependency without a one-line entry in `docs/DECISIONS.md`.
6. Before finishing any task: `pnpm lint && pnpm build` must pass, then check the result in the browser at 360px, 768px and 1440px and fix jank, layout shift and hydration errors.
7. Keep `docs/PROGRESS.md` updated: what was done, what is left, known issues.

## Do not
- Use Inter, Roboto, Arial or system-default fonts.
- Use the default Tailwind palette, identical rounded cards with the same soft shadow, or gradient washes as decoration.
- Add a fade-and-slide-up entrance to every section. Motion is spent on ONE hero moment, ONE scroll moment, and interactions the visitor triggers.
- Add tracked ALL-CAPS eyebrow labels, numbered markers on non-sequences, or `→` on every button.

## Parallel work
Each workstream in `docs/PLAN.md` owns specific folders. Edit only your own paths.
Shared files (`app/layout.tsx`, `app/globals.css`, `tailwind.config.*`, `lib/motion/*`, `app/page.tsx`) are touched only in Phase 0 or Phase 2.
Work on your own branch/worktree: `ws-a-hero`, `ws-b-work`, `ws-c-about`, `ws-d-contact`, `ws-e-ai`.
