# DESIGN.md

## Concept
Shruti is a designer who ships code and engineers data systems. The site should feel like a designer's studio that is also a working build: confident, bold type, precise grid, and everything runs smoothly.
Audience: recruiters, hiring managers, design/engineering teams. Primary job: get them to open a project and then contact her.

**The one memorable thing:** her name set in huge variable type whose weight and width respond to the cursor and to scroll. Everything else stays quiet and disciplined.

## Palette (named tokens, define as CSS variables)
| Token | Hex | Use |
|---|---|---|
| cobalt | #2230F5 | hero and contact panels, key interactions |
| ink | #0D0F1A | text on light panels, dark sections |
| paper | #F4F5F9 | main light background |
| silk | #FFB3D1 | secondary accent (nod to Bhagalpur Silk), tags, hover fills |
| sun | #FFD84A | focus rings and small highlights only |

Sections alternate between full-bleed cobalt, paper and ink panels. Check AA contrast on every pairing.

## Type
- Display: **Bricolage Grotesque** (variable, use wght and wdth axes). Weights 700 to 800, tight tracking (-0.03em), line-height 0.9 for giant text.
- Body: **Newsreader** (serif), 18 to 20px, line-height 1.6, max 68ch. Clearly distinct from the display face.
- Hero name: clamp(5rem, 18vw, 22rem). Section headings: clamp(2.5rem, 7vw, 8rem).
- Sentence case everywhere. No monospace data labels unless showing real code or tech names.

## Layout
- 12-column grid, left-aligned, generous margins (6 to 8vw), big asymmetric whitespace.
- Hero: name fills the width, one line of descriptor beneath, no stats row.
- Selected Work: two tracks (Design / Engineering) with a toggle. Large full-width project rows with big image area; the list reflows with a layout animation when toggled.
- Case study pages: full-bleed hero image, a short result sentence, then problem, process, outcome, stack. Numbers shown big and static (no counters).
- Experience: a real timeline (this one IS a sequence, dates are meaningful).
- Skills: grouped large type lists, not logo grids.

```
HERO            WORK (design | engineering)       ABOUT
+-------------+ +-------------------------------+ +-------------------+
| SHRUTI      | | Project title      [image]    | | short bio   photo |
| RAJ         | | one-line result               | |                   |
| descriptor  | | ---------------------------   | +-------------------+
+-------------+ | Project title      [image]    |
                +-------------------------------+
```

## Motion budget (spend sparingly)
1. **Global:** Lenis smooth scroll (lerp ~0.1), synced with GSAP ticker. This is the base "buttery" feel.
2. **Hero moment (one orchestrated load sequence):** the name assembles letter by letter from a thin, narrow state and settles to heavy; after that the weight and width follow the cursor (desktop) or scroll progress (mobile). No separate preloader.
3. **Scroll moment (one):** Selected Work section pins and cards stack or slide over each other with scrubbed transforms.
4. **Interaction motion (visitor-triggered, welcome everywhere):** magnetic CTA buttons only, project card hover (image scale and clip-path), Design/Engineering toggle layout animation, nav overlay open/close, Ask Shruti chat open, form states, shared-element transition from project card image to case-study hero.
Easings: `expo.out` and cubic-bezier(0.76, 0, 0.24, 1) for in/out. Durations 0.4 to 1.0s. Defined once in `lib/motion/tokens.ts`.
Do NOT add scroll-triggered reveals to every heading or card.

## AI-first features
- **Ask Shruti:** a chat panel that answers questions about her work, grounded only in `data/*` (see CONTENT.md). Streams responses, politely declines off-topic questions, and links to the relevant project.
- **Command palette (Cmd/Ctrl+K):** jump to projects, sections, copy email, open GitHub, open the chat.
- **Machine-readable site:** `public/llms.txt`, JSON-LD (Person, CreativeWork per project), clean semantic HTML, sitemap, OG images, so AI tools and recruiters' search tools read it correctly.

## Quality floor
Responsive 360px to 4K. Visible keyboard focus (sun ring). AA contrast. Alt text on all images. Lighthouse mobile above 90. No layout shift. Reduced motion respected.

## Voice
Plain, specific, first person, active voice. Say what she did and what changed ("Cut bounce rate by 25%"). No buzzwords. Buttons say exactly what happens ("See the case study", "Send message", "Download résumé").
