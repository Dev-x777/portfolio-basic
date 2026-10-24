# DECISIONS.md: Architectural & Dependency Decisions

This file tracks every dependency and major architectural decision with rationale.

## Dependencies

- `next` (v16 App Router): Core React framework for SSR, App Router routing, and metadata.
- `react`, `react-dom` (v19): Modern React primitives and server/client components.
- `tailwindcss` (v4): Utility-first CSS configured with custom color tokens and font variables.
- `lenis` (v1): Smooth scrolling engine configured with lerp ~0.1, integrated with GSAP ticker, disabled for prefers-reduced-motion.
- `gsap`: Scroll-driven timelines and ScrollTrigger for the pinned stacking work section.
- `motion`: Modern framer-motion successor for interaction motion, route transitions, and layout animations.
- `split-type`: Text split utility for the hero name assembly and typography animations.
- `@hugeicons/react`, `@hugeicons/core-free-icons`: Icons for the React Bits <ReflectiveCard /> component.
- `prettier`: Code formatting and consistency.
