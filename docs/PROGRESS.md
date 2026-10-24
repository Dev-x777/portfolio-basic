# PROGRESS.md

## Grainient Background Integration (React Bits)
- **Status**: Fixed, Resilient & Fully Verified
- **Components**:
  - [`components/ui/Grainient.tsx`](file:///Users/dev/Desktop/portfolio/components/ui/Grainient.tsx) and [`components/ui/Grainient.css`](file:///Users/dev/Desktop/portfolio/components/ui/Grainient.css).
  - [`components/ui/BackgroundGrainient.tsx`](file:///Users/dev/Desktop/portfolio/components/ui/BackgroundGrainient.tsx) for theme-aware background mounting.
  - Mounted directly in [`app/layout.tsx`](file:///Users/dev/Desktop/portfolio/app/layout.tsx) behind the architectural dotted grid and page content.
- **Root Cause Fixes Applied**:
  1. **GLSL ES 3.00 Strict Type Compliance**: Fixed vector/scalar arithmetic violations (`q += vec3(dot(...))`, `color += vec3(...)`, `encode` vec3 subtraction, and vector-scalar offsets) that caused WebGL2 shader compilation failures on macOS ANGLE and WebGL2 drivers.
  2. **WebGL Context Preservation (Fix for Error 37442 / CONTEXT_LOST_WEBGL)**: Removed `gl.getExtension('WEBGL_lose_context')?.loseContext()` from `useEffect` cleanup. In Next.js React 19 development mode (Strict Mode double-mount), `loseContext()` was forcibly killing the canvas WebGL context, causing error code `37442` (`gl.CONTEXT_LOST_WEBGL`) and empty info logs on subsequent renders.
  3. **Hero Opacity Layering**: Replaced hardcoded opaque `bg-[var(--background)]` on the Hero `<section>` with `bg-transparent` so the canvas background is immediately visible.
  4. **Hydration Mount Fix**: Removed stalled `useSyncExternalStore` mounted lock in `BackgroundGrainient.tsx` that was keeping the component returned as `null` after SSR.
  5. **Resilient CSS Mesh Fallback**: Added an animated radial mesh gradient fallback if WebGL2 context is lost or unsupported on the client device.
  6. **Visual Presence**: Increased background opacity (`0.85` in dark mode, `0.7` in light mode) with `w-full h-full` container layout and global CSS class definitions in `app/globals.css`.
- **Verification**:
  - `pnpm lint`: Passed (0 errors, 0 warnings).
  - `pnpm build`: Passed (all 13 static routes generated cleanly).
  - Dev server active at `http://localhost:3000` (HTTP 200).

---

## GooeyNav Integration (React Bits)
- **Status**: Completed & Verified
- **Component**: Built and integrated [`GooeyNav.tsx`](file:///Users/dev/Desktop/portfolio/components/ui/GooeyNav.tsx) and [`GooeyNav.css`](file:///Users/dev/Desktop/portfolio/components/ui/GooeyNav.css) into the main [`Navbar.tsx`](file:///Users/dev/Desktop/portfolio/components/nav/Navbar.tsx).
- **Features**:
  - WebGL2 droplet physics shader with smooth blend field and droplet scattering animations.
  - Custom droplet palette configured with signature portfolio brand colors: Cobalt (`#2230F5`), Silk Pink (`#EC4899`), and Electric Indigo (`#6366F1`).
  - Synced to active scroll section (`Work`, `Skills`, `Experience`, `About`, `Contact`).
  - Dynamic light/dark theme adaptation using `useSyncExternalStore`.
  - Accessible fallback pill for environments without WebGL2.
  - Strict compliance with React 19 / `react-hooks/refs` conventions.
- **Verification**:
  - `pnpm lint`: Passed (0 errors, 0 warnings).
  - `pnpm build`: Passed (all 13 static routes generated cleanly).
  - Dev server active at `http://localhost:3000`.

---

## Customization for Devjeet Saha (Dev) — Product & Backend Focus
- **Status**: Completed & Verified
- **Identity & Positioning**:
  - Rephrased headline and branding away from "only iOS" to **`Product & Backend.`**.
  - Hero availability pill: `"Available for Product & Backend Engineering roles"` with location `"Kolkata & Chennai, India"`.
  - Lead: `"I am Devjeet Saha and I build"`.
  - Display name `"Dev"` adopted across navbar logo (`[dev.]`), copyright footer (`© 2026 Dev`), and AI assistant modal (`Ask Dev (AI)`).
  - Descriptor: `"Architecting resilient distributed backends, low-latency microservices, and high-impact products."`
- **GitHub Repositories Fetched & Categorized (Backend & Product Tracks)**:
  - Fetched all repositories directly from `https://api.github.com/users/Dev-x777/repos`:
    - **Backend Track**:
      - `RateGuard – Distributed Rate Limiting Service` (`Rate_Limiter_As_A_Service`): Token Bucket & Sliding Window algorithms with atomic Redis Lua scripts across 3 instances, sub-5ms latency, 0 race conditions across 10K+ load tests.
      - `Distributed Job Scheduler & Queue Engine` (`Distributed-Job-Scheduler`): Master-worker orchestration, worker heartbeat health checks, exponential backoff retries.
      - `High-Throughput Message Caching System` (`message-cache-system`): In-memory caching with LRU memory eviction and atomic concurrent reads.
      - `Lakeflow Databricks Data Pipeline` (`lakeflow-databricks-pipeline`): Automated cloud ETL ingestion and medallion Delta Lake architecture.
    - **Product Track**:
      - `AutiSense – Autism Screening Platform` (`AutiSense`): Pre-autism screening for children aged 2–6, CNN vision model with clinician web & mobile dashboards.
      - `TripSync – Collaborative Travel Platform` (`TripSync`): Real-time collaborative itinerary sync, multi-user co-planning, and shared budget tracking.
      - `ReHearse – Sheet Music to Playable Audio` (`re-hearse-v1`): Live App Store app converting scanned sheet music to playable audio via Python + Docker on Azure.
      - `ReplyMate – Intelligent Response Assistant` (`ReplyMate`): AI productivity tool with 16 GitHub stars generating context-aware message drafts.
      - `Fleet Management System (FMS)` (`FMS`): Enterprise fleet management module handling service scheduling for 100+ vehicles.
- **Horizontal Project Showcase**:
  - Transformed the projects section into a responsive, smooth horizontal scrolling gallery.
  - Interactive previous/next slider buttons (`←` and `→`) for quick navigation.
  - Native trackpad, mouse wheel, and touch horizontal scrolling (`scroll-smooth snap-x snap-mandatory`).
  - Dynamic horizontal scroll progress indicator bar tracking position across all repositories.
  - Category filter tabs (`all`, `backend`, `product`) with animated layout transitions.
- **Ask Dev AI Assistant**:
  - Persona and knowledge base updated to emphasize product engineering and distributed systems.
  - Prompt chips: "RateGuard Backend", "Distributed Scheduler", "TripSync App", "Tech Stack".

---

## Aesthetic Redesign & Enhancements (marban.is-a.dev inspired)
- **Status**: Completed & Verified
- **Light & Dark Mode**: Instant, reactive `ThemeToggle` using `useSyncExternalStore`.
- **Rich Project Card Hover Animations**: Spring physics lift (`whileHover={{ y: -8, scale: 1.012 }}`), ambient glow, star sparkle.
- **Signature Vibrant Pink Button (`.btn-silk`)**: Restored across Hero Contact, Navbar "Ask Dev", and ContactSection.
- **Architectural Boundary Frame with Abstract Geometry**: Precision technical corner brackets and orbital SVG geometry.
- **Continuous Architectural Dotted Grid Background**: Full-page continuous dotted grid (`.dotted-bg`, 24px x 24px).
- **React Bits `<ReflectiveCard />` Integration for Selected Work**:
  - Implemented WebGL2 metallic reflective cards (`components/ui/ReflectiveCard.tsx`, `components/ui/ReflectiveCard.css`) with real-time procedural specular reflection, 3D cursor tilt, and ambient lighting.
  - Refined into **Minimal Architectural Smoked Obsidian Glass**:
    - Eliminated colorful gradient washes in favor of pure smoked obsidian (`#0E0E10`) for dark mode and studio porcelain white (`#FFFFFF`) for light mode.
    - Neutral monochromatic specular reflection (`grayscale={1}`, `tint="#ffffff"`, `metalness={0.25}`) acting like polished smoked glass rather than chrome metal.
    - Zero planar ripple warping (`warp={0}`) and hairline 1.5px bevel chamfer for precision Swiss architectural geometry.
    - Redesigned internal metric callouts to minimal editorial rows with hairline dividers instead of boxy tiles.
  - Verified across 1440px, 768px, and 360px viewports with `pnpm lint` and `pnpm build` passing cleanly.
  - **Custom Palette Integration**:
    - Card base (glass): `rgba(20, 18, 42, 0.68) → rgba(12, 11, 26, 0.52)` with `backdrop-filter: blur(16px)` and synced WebGL2 shader vertical alpha ramp.
    - Card border: `rgba(255, 255, 255, 0.10)`.
    - Top-edge highlight: `rgba(255, 255, 255, 0.08)`.
    - Title / result values: `#F4F1EA`.
    - Description: `#B4B2C8`.
    - Labels (Result 01, counter): `#7C7A94`.
    - Divider lines: `rgba(255, 255, 255, 0.07)`.
    - Badge text / fill: `#6F8CFF / rgba(59, 91, 255, 0.16)`.
    - Chip text / fill: `#C9C7DA / rgba(255, 255, 255, 0.05)`.
    - Button: `#F4F1EA` bg, `#14122A` text.
    - Hover glow: `rgba(236, 72, 153, 0.20)`.

---

## MagicUI Smooth Cursor Integration
- **Status**: Completed & Verified
- **Component**: [`components/ui/smooth-cursor.tsx`](file:///Users/dev/Desktop/portfolio/components/ui/smooth-cursor.tsx) (and re-export at [`components/cursor/SmoothCursor.tsx`](file:///Users/dev/Desktop/portfolio/components/cursor/SmoothCursor.tsx)).
- **Mounted**: Mounted globally in [`app/layout.tsx`](file:///Users/dev/Desktop/portfolio/app/layout.tsx).
- **Features & Implementation**:
  - Physics-based spring cursor animations using `motion/react` springs (`damping: 45, stiffness: 400`).
  - Dynamic aerodynamic rotation based on movement direction (`Math.atan2` velocity tracking with angle unwrapping to prevent 360-degree flip jumps).
  - Velocity-based scale compression (`scale.set(0.95)`) that springs back to rest (`1.0`) when stopping.
  - Native cursor suppression in CSS via `@media (any-hover: hover) and (any-pointer: fine)` while preserving native text I-beam for `input`, `textarea`, and `select`.
  - Input hover detection that fades the custom cursor out over text inputs so the user sees the crisp native I-beam.
  - Viewport boundary detection (`mouseleave` / `mouseenter`) to prevent frozen edge cursor ghosting.
  - Pure React 19 hook initialization (zero impure calls in render pass).
  - **Butter-Smooth Physics (Restored)**:
    - Restored the signature MagicUI physics configuration: `springConfig` (`damping: 45, stiffness: 400, mass: 1, restDelta: 0.001`), rotation spring (`damping: 60, stiffness: 300`), and dynamic compression scale (`stiffness: 500, damping: 35`).
    - Fluid aerodynamic angle tracking (`Math.atan2`) with phase unwrapping to prevent 360° flip jumps.
    - Centered `translateX: '-50%', translateY: '-50%'` with clean RAF synchronization (`latestEvent`) ensuring zero frame dropping.
    - Mounted with `z-index: 99999` at the root layout level so it glides smoothly across the navbar and all page layers.
  - Accessibility: Full compliance with `prefers-reduced-motion` via `usePrefersReducedMotion` (disables custom cursor and restores default system cursor) and automatic suppression on touch/coarse devices.
- **Verification**:
  - `pnpm lint`: Passed (0 errors, 0 warnings).
  - `pnpm build`: Passed (13/13 static routes generated cleanly).
  - Headless Chrome testing at 1440px, 768px, and 360px with live movement simulation and DOM style validation.

---

## Circular Burst View Transition Theme Toggle
- **Status**: Completed & Verified
- **Components**: [`components/ui/ThemeToggle.tsx`](file:///Users/dev/Desktop/portfolio/components/ui/ThemeToggle.tsx), [`app/layout.tsx`](file:///Users/dev/Desktop/portfolio/app/layout.tsx), and [`app/globals.css`](file:///Users/dev/Desktop/portfolio/app/globals.css).
- **Features & Implementation**:
  - **Default Theme & Zero FOUC**: Dark mode is strictly the default on first visit (regardless of OS color preference). Synchronous inline script in `<head>` checks `localStorage` and sets `class="dark"` / `data-theme="dark"` or `"light"` before first paint.
  - **View Transitions API Circular Burst**:
    - Calculates toggle button center `(x, y)` via `getBoundingClientRect()`.
    - Computes `endRadius = Math.ceil(Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)))`.
    - Inside `document.startViewTransition`, synchronously commits state via React `flushSync` and updates `localStorage`.
    - Animates `::view-transition-new(root)` using `clip-path: circle(0px at x y) -> circle(endRadius at x y)` over 700ms with cubic-bezier easing.
    - Bidirectional: Smooth circular burst works identically for both Dark -> Light and Light -> Dark originating directly from the button.
  - **Fallback**: Gracefully falls back to instantaneous theme switch if `document.startViewTransition` is unsupported or if `prefers-reduced-motion` is active.
  - **Extra Polish**:
    - Tactile button press physics (`whileTap={{ scale: 0.90 }}` and `whileHover={{ scale: 1.08 }}`).
    - AnimatePresence icon swap: Sun and Moon smoothly rotate and scale between transitions.
    - `html.theme-transitioning` disables competing CSS transitions on background-color/color during the View Transition snapshot.
    - Added CSS variable aliases (`--bg`, `--text`, `--accent`, `--border`) across both dark and light modes.
- **Verification**:
  - `pnpm lint`: Passed (0 errors, 0 warnings).
  - `pnpm build`: Passed (13/13 static routes generated cleanly).
  - Tested multiple toggles, reload persistence, and zero FOUC in headless Chrome.

---

## Skills Section Sticky Sidebar & Constant Changing Metrics
- **Status**: Completed & Verified
- **Components**: [`components/skills/SkillsSection.tsx`](file:///Users/dev/Desktop/portfolio/components/skills/SkillsSection.tsx) and [`app/globals.css`](file:///Users/dev/Desktop/portfolio/app/globals.css).
- **Problem Solved**:
  - Previously, `overflow-x: hidden` on `html` and `body` broke browser `position: sticky` on window scrolling, causing the left sidebar to scroll off-screen and leave the entire left half of the viewport blank/empty while skills scrolled on the right.
  - Additionally, `min-h-[78vh] justify-between` created an awkward void between the category text and metrics, and metrics did not transition when categories changed.
- **Implementation & Features**:
  1. **Fixed Sticky Pinning**:
     - Removed `overflow-x` from `html` and `body` in `app/globals.css`, restoring native `position: sticky` behavior across the window scroll.
     - Added `overflow-x-clip` to the right scrolling column so sliding skills items don't cause horizontal overflow while keeping parent sticky context unhindered.
     - Anchored left sidebar with `md:sticky md:top-28 lg:top-32 self-start w-full md:w-[44%] lg:w-[42%]`.
  2. **Constant Changing Metrics Glass Card**:
     - Embedded a dedicated **Impact & Benchmarks** card directly within the left sticky column so it is CONSTANTLY visible throughout the entire scroll of the section.
     - Live pulse dot with category focus badge (`Systems & Algorithms`, `Microservices & Full-Stack`, `Distributed Concurrency`, `Vision & Medical AI`).
     - Real-time animated transitions: As the user scrolls through the skill groups on the right, the metric counters (`10+ / 8.84` -> `20+ / 1,000+` -> `10K+ / <5ms` -> `5,000+ / 86%+`) smoothly flip and update via `AnimatePresence`.
  3. **Category Tabs & Scroll Synchronization**:
     - Quick-jump category pills (`Languages`, `Frameworks & Backend`, `Systems & Tools`, `Machine Learning`) with smooth scroll-to-category triggers.
     - High-performance, zero-deadzone focal-line scroll observer (`requestAnimationFrame`) tracking active category accurately without gaps.
  4. **Responsive Mobile Integration**:
     - On mobile (< 768px), category headers and benchmark metrics cards are rendered inline above each skill group with zero layout shift.
- **Verification**:
  - `pnpm lint`: Passed (0 errors, 0 warnings).
  - `pnpm build`: Passed (13/13 static routes compiled cleanly).
  - Browser verification at 1440px desktop across all 4 categories (Languages, Frameworks, Systems, ML) confirming the sidebar stays pinned and metrics dynamically update at every position.
  - Mobile verification at 360px confirming clean inline metrics cards.

---

## GPA Update (9.01/10 at SRMIST)
- **Status**: Completed & Verified
- **Files Updated**:
  - [`data/profile.ts`](file:///Users/dev/Desktop/portfolio/data/profile.ts) (`CGPA 9.01/10`)
  - [`data/achievements.ts`](file:///Users/dev/Desktop/portfolio/data/achievements.ts) (`B.Tech Big Data Specialization — CGPA 9.01/10`)
  - [`components/hero/Hero.tsx`](file:///Users/dev/Desktop/portfolio/components/hero/Hero.tsx) (`SRM Institute of Science and Technology · CGPA 9.01`)
  - [`components/skills/SkillsSection.tsx`](file:///Users/dev/Desktop/portfolio/components/skills/SkillsSection.tsx) (`{ label: 'CGPA at SRMIST', value: '9.01' }`)
  - [`components/ai/AskDev.tsx`](file:///Users/dev/Desktop/portfolio/components/ai/AskDev.tsx) (`CGPA of 9.01/10`)
  - [`docs/CONTENT.md`](file:///Users/dev/Desktop/portfolio/docs/CONTENT.md)
- **Verification**: Verified DOM renders CGPA 9.01 in both Hero metadata and Skills Section live metrics panel.

---

## Dynamic GitHub Repository Syncing
- **Status**: Completed & Verified
- **Components & Architecture**:
  - [`lib/github.ts`](file:///Users/dev/Desktop/portfolio/lib/github.ts): Core integration engine fetching from GitHub API (`https://api.github.com/users/Dev-x777/repos?sort=pushed&per_page=100`).
  - [`app/api/projects/route.ts`](file:///Users/dev/Desktop/portfolio/app/api/projects/route.ts): Route handler with 60-second SWR caching (`s-maxage=60, stale-while-revalidate=300`), returning all 38+ repositories with live metadata.
  - [`components/work/WorkSection.tsx`](file:///Users/dev/Desktop/portfolio/components/work/WorkSection.tsx): Hydrates instantly from static curated list (zero layout shift / FOUC), then syncs live repositories from GitHub on mount. Displays live badge: `Live Synced with GitHub` with green indicator dot and total project counter.
  - [`app/work/[slug]/page.tsx`](file:///Users/dev/Desktop/portfolio/app/work/[slug]/page.tsx): Dynamic Partial Prerendering enabling on-demand case study generation for any new GitHub repository added in the future.
  - [`components/command/CommandPalette.tsx`](file:///Users/dev/Desktop/portfolio/components/command/CommandPalette.tsx): Synced to search all GitHub repositories via `Cmd+K`.
- **Automatic Ingestion Features**:
  - Automatically filters out user config/profile README repo (`Dev-x777/Dev-x777`).
  - Preserves flagship curated case studies with rich architectural writeups while merging live GitHub stats (stars, latest commit push dates, live demo links).
  - Automatically maps any new repository to Title Case, infers track (`backend` vs `product`), extracts stack tags from language & topics, and generates structured case study sections (`problem`, `process`, `outcome`).
  - Deterministic date parsing avoiding hydration/prerender discrepancies.
- **Verification**:
  - `pnpm lint`: Passed (0 errors, 0 warnings).
  - `pnpm build`: Passed (43/43 static pages compiled cleanly).
  - Tested `/api/projects` returning 38 projects with HTTP 200.
  - Tested `/work/adventofcode25` on-demand case study route rendering with HTTP 200.
  - Verified across 1440px desktop, 768px tablet, and 360px mobile viewports.

---

## WebGL Context Virtualization & Shader Type Compliance (Fix for 6 `[browser] [ReflectiveCard] null` errors)
- **Status**: Completed & Verified
- **Problem**:
  - With 38 dynamic projects rendered in the carousel, mounting 38 WebGL2 canvases exceeded browser simultaneous WebGL context limits (16 max in Chrome/macOS ANGLE).
  - WebGL context loss caused shader compilation failures where `gl.getShaderInfoLog(shader)` returned `null`, logging exactly 6 `console.error('[ReflectiveCard]', null)` errors in the browser terminal.
  - Also, strict GLSL ES 3.00 scalar/vector addition (`p3.yzx + 33.33`) and scalar vector arguments (`vec2(0.5)`) violated shader type rules.
- **Fixes Applied in [`components/ui/ReflectiveCard.tsx`](file:///Users/dev/Desktop/portfolio/components/ui/ReflectiveCard.tsx)**:
  1. **Intersection-Based Context Virtualization**: WebGL renderer is now created lazily when a card enters the viewport (`IntersectionObserver` with `rootMargin: '120px 0px'`) and disposed when it scrolls out. Only 2–3 active WebGL contexts exist at any time.
  2. **GLSL ES 3.00 Strict Compliance**:
     - `vec2(0.5)` updated to `vec2(0.5, 0.5)` in `CAPTURE`.
     - `p3.yzx + 33.33` updated to `p3.yzx + vec3(33.33)` in `hash` and `hash2`.
     - `vec2(uBlur / VIEW)` updated to `vec2(uBlur / VIEW, uBlur / VIEW)` in `PLATE`.
     - Vector division explicit typing in color highlight calculation.
  3. **Context Safety**: Added `gl.isContextLost()` guards and eliminated empty/null log output in `compile` and `link`.
- **Verification**:
  - 0 errors in browser console or dev server logs.
  - `pnpm lint && pnpm build` passed (0 errors, 43/43 routes generated).

---

## Fix: Background Vanishing & Navbar Corruption on Deep Project Scroll
- **Status**: Completed & Verified
- **Issue Reported**: "when i am scrolling the projects far enough the bg is vanishing and navbar is getting fucked fix this bugs"
- **Root Causes**:
  1. **WebGL Context Eviction**: Chromium/Safari/macOS ANGLE enforces a strict limit of 16 simultaneous WebGL contexts per page. With 38 GitHub projects, scrolling horizontally across cards mounted WebGL canvases that exceeded 16 contexts. The browser forcibly evicted the oldest contexts: Context #1 (Background `Grainient.tsx`) and Context #2 (Navbar `GooeyNav.tsx`), causing the background to vanish and the navbar canvas to go black/freeze.
  2. **Missing Context Loss Handlers**: Neither `Grainient.tsx` nor `GooeyNav.tsx` had `webglcontextlost` listeners with `event.preventDefault()`, leaving them dead upon any driver context eviction.
  3. **Viewport Chaining on Overscroll**: Scrolling far horizontally without `overscroll-x-contain` and `overflow-x: clip` propagated momentum gestures to the document window, shifting fixed header positioning.
- **Fixes Applied**:
  1. [`components/ui/ReflectiveCard.tsx`](file:///Users/dev/Desktop/portfolio/components/ui/ReflectiveCard.tsx):
     - Added conditional WebGL activation: `const useWebGL = Boolean(videoSrc || webcam);`.
     - Standard cards without video/webcam do NOT mount `<canvas>`, do NOT mount `<video>`, and do NOT initialize WebGL.
     - Preserved full 3D interactive physics tilt (`rotateX`, `rotateY`, `presence`, `lift`) and added hardware-accelerated CSS specular glare sheen (`.reflective-card__glare` with dynamic `--rc-glare-x`, `--rc-glare-y`, `--rc-glare-opacity`).
     - Card WebGL contexts dropped from **38 to 0**, reducing total page WebGL contexts to exactly **2** (Background + Navbar), completely eliminating context eviction risk.
  2. [`components/ui/Grainient.tsx`](file:///Users/dev/Desktop/portfolio/components/ui/Grainient.tsx):
     - Added `gl.isContextLost()` guard in `draw()`.
     - Added `webglcontextlost` (`e.preventDefault()`, cancel RAF, seamless CSS radial mesh gradient fallback) and `webglcontextrestored` event handlers.
  3. [`components/ui/GooeyNav.tsx`](file:///Users/dev/Desktop/portfolio/components/ui/GooeyNav.tsx):
     - Added `gl.isContextLost()` guard in `render()`.
     - Added `webglcontextlost` (`e.preventDefault()`, cancel RAF, immediate display of fallback SVG pill) and `webglcontextrestored` event handlers.
  4. [`components/work/WorkSection.tsx`](file:///Users/dev/Desktop/portfolio/components/work/WorkSection.tsx):
     - Added `overscroll-x-contain` to horizontal project card scrolling container.
  5. [`app/globals.css`](file:///Users/dev/Desktop/portfolio/app/globals.css):
     - Added `overflow-x: clip;` to `html` and `body` to guarantee zero window horizontal drift.
- **Verification**:
  - Scrolled through all 38 cards across 18,749px of scroll track using headless Chrome.
  - Confirmed background canvas stays active (`bgCanvasPresent: true, bgCanvasVisible: true, display: block`).
  - Confirmed navbar stays active (`navCanvasDisplay: block, navFallbackDisplay: none`, 0 blackouts or shifts).
  - 0 console errors or warnings recorded.
  - Tested and confirmed across 1440px desktop, 768px tablet, and 360px mobile viewports.
  - `pnpm lint` passed with 0 errors.
  - `pnpm build` passed with 0 errors (43/43 routes generated).


