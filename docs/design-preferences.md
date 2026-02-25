# Design Preferences

**Last Updated:** 2026-02-24

This document captures the design aesthetic, visual style, and UI preferences for alexrosenkranz.com. Reference this guide when making UI decisions, adding components, or redesigning layouts.

---

## Design Philosophy

**Aesthetic:** Minimal and content-first

- Clean and simple with stark, bold contrasts
- Focus on typography and readability
- Embrace raw HTML/CSS aesthetic where appropriate
- No unnecessary decoration or polish

**Guiding Principle:** Content-first design with generous spacing and monochrome simplicity.

---

## Inspiration Sites

- **[brianlovin.com](https://brianlovin.com/)** - Clean typography, generous spacing, semantic colors
- **[manuelmoreale.com](https://manuelmoreale.com/)** - Rhythm-based layout, literary feel, fluid typography

---

## Color Palette

**Monochrome Only**

- Black, white, and shades of gray
- No color accents (no blue, red, green, etc.)
- High contrast for readability
- Consistent across light and dark modes

**Semantic Colors:**

- **Background:** Pure white (light) / Near black (dark)
- **Foreground:** Near black (light) / Off white (dark)
- **Muted:** Light gray (light) / Dark gray (dark)
- **Borders:** Medium gray, stark and visible

**Why monochrome?**

- Timeless and elegant
- Lets content shine
- Reduces visual noise
- Easier to maintain consistency

---

## Typography

**Font Stack:** Sans-serif + Monospace

**Sans-serif (body text, headings, UI):**

- Modern, clean sans-serif from Google Fonts
- Candidates: Inter, Work Sans, DM Sans, Manrope
- Weights: 400 (regular), 500 (medium), 600 (semi-bold)

**Monospace (code, accents, labels):**

- Technical, distinctive monospace from Google Fonts
- Candidates: JetBrains Mono, IBM Plex Mono, Fira Code, Space Mono
- Weights: 400 (regular), 500 (medium)

**Typography Hierarchy:**

- Large, bold headings with generous letter-spacing
- Body text: `1rem` (fixed 16px base)
- **Perfect Fourth (1.333×) type scale** with `clamp()` for responsive sizing:
  - h1: `clamp(2rem, 6vw, 2.5rem)` — 32px→40px, weight 700
  - h2: `clamp(1.5rem, 4vw, 1.75rem)` — 24px→28px, weight 600
  - h3: `clamp(1.125rem, 3vw, 1.3125rem)` — 18px→21px, weight 600
  - Post display title: `clamp(2.5rem, 8vw, 3rem)` — larger display scale
- Mono font for: code blocks, timestamps, metadata, year labels
- **Section labels:** sans-serif, lowercase, `text-sm` — NOT mono (year labels are the exception)
- Strong hierarchy: h1 uses font-weight 700, other headings 600

**References:**

- Brian Lovin: Inter with semibold headings, 1.6 line-height
- Manuel Moreale: Fluid scaling (14-26px), 1.85 line-height

---

## Layout & Spacing

**Content Width:**

- **Narrow (prose-like):** ~650px (40-45rem)
- Best for reading long-form content
- Similar to Manuel's text column
- Articles, posts, about page all use narrow width

**Spacing System:**

- **Very generous vertical spacing**
- Large gaps between sections (4-6rem)
- Comfortable padding around containers (2-3rem)
- Rhythm-based layout using consistent units
- Inspiration: Manuel's 5rlh (relative line-height) spacing

**Layout Types:**

- **Spacious:** Wide margins, generous gaps, breathing room
- **Asymmetric:** Varied layouts per page type, different widths per section
- Mix both approaches across the site

**Grid System:**

- Simple, predictable grids
- 1-2 columns on mobile
- 2-3 columns on desktop for card layouts
- Generous gaps (2-3rem) between grid items

**Footer Positioning:**

- Footer always at bottom of viewport (not sticky)
- Use flexbox pattern: `min-h-screen flex flex-col` on body/wrapper
- Main content gets `flex-1` to push footer down
- On long pages, footer flows naturally with content

---

## Interactive Elements

**Style:** Flat

- No drop shadows
- No gradients
- Stark, visible borders
- No rounded corners (or minimal: 2-4px)
- Instant feedback, no animations

**Links:**

- **Dashed underline at rest** → **solid underline on hover** (1px dashed → 2px solid)
- `text-underline-offset: 4px` for breathing room
- Same color as surrounding text (monochrome, no accent color)
- UI/nav links that should NOT have dashed underline: use `no-underline` explicitly
- Prose links (post body) follow the same dashed→solid pattern via `.prose a` override

**Buttons:**

- Border with background fill
- Sharp corners or minimal rounding
- No shadows or elevation effects
- Clear, bold labels

**Cards:**

- Stark borders (1-2px)
- No hover shadows
- Optional: subtle background color change on hover
- Content-focused, minimal decoration

**Forms:**

- Visible borders on inputs
- No fancy styling
- Clear focus states (border change or outline)
- Monospace labels

---

## Navigation

**Approach:**

- Simple, text-based navigation
- **Two-row mobile layout:** logo on top row, nav links below (`flex-col gap-3` on mobile, `sm:flex-row` on desktop)
- No hamburger menus (show all links)
- **Active vs inactive contrast:** active = `text-foreground font-semibold underline`; inactive = `text-foreground-quaternary hover:text-foreground-secondary`
- Widens the perceptual gap using both lightness and font-weight simultaneously

---

## Dark Mode

**Support:** Yes, equal priority to light mode

- System preference detection with manual toggle
- Monochrome palette makes transitions smooth
- High contrast in both modes

---

## Responsive Design

**Breakpoints:**

- Mobile-first approach
- sm: 640px (tablets)
- md: 768px (small desktop)
- lg: 1024px (desktop)

**Priorities:**

- Readable on mobile (generous font sizes)
- Touch-friendly tap targets (min 44x44px)
- Horizontal scrolling avoided
- Fluid typography scales across breakpoints

---

## Components to Avoid

- Carousels/sliders
- Parallax effects
- Loading spinners with fancy animations
- Modal overlays (prefer in-page flows)
- Icon-only buttons (always include text labels)

---

## What NOT to Do

- ❌ Add color accents (stay monochrome)
- ❌ Use shadows or elevation effects
- ❌ Animate transitions (instant feedback only)
- ❌ Round corners excessively (sharp or minimal)
- ❌ Add decorative elements (focus on content)
- ❌ Use complex layouts (keep it simple)

---

## What TO Do

- ✅ Generous whitespace
- ✅ Bold, clear typography
- ✅ High contrast
- ✅ Stark borders
- ✅ Simple, predictable interactions
- ✅ Fast, instant feedback
- ✅ Content-first approach

---

## Reference Patterns

### Brian Lovin's Site

- Inter font with semibold headings
- Max-width containers (max-w-2xl)
- gap-16 spacing between sections
- Semantic color tokens
- Subtle hover effects (underlines, micro-animations)

### Manuel Moreale's Site

- Iowan Old Style serif (we're using sans instead)
- Fluid type scaling with clamp()
- Rhythm-based spacing (5rlh padding)
- Narrow text columns (~370px)
- Generous vertical breathing room
- Simple animated underlines (we're using instant underlines)

---

## Decision Log

Track design decisions made during implementation:

**2026-02-03:**

- Established design preferences document
- Chose monochrome palette (no color accents)
- Selected sans + mono font approach
- Decided on narrow prose width (~650px)
- Committed to flat interactive elements
- Set very generous vertical spacing as standard

**2026-02-24 — Typography & Contrast Pass:**

- Implemented fluid type scale with `clamp()` at every heading level
- h1 bumped to font-weight 700 (was 600) for stronger hierarchy
- Links: dashed underline at rest → solid on hover (replaces no-underline at rest)
- Nav: two-row mobile layout (logo top, links below); active state uses font-semibold
- Nav contrast widened: active = foreground + semibold, inactive = foreground-quaternary
- Section labels bumped from `text-foreground-quaternary` → `text-foreground-tertiary`

**2026-02-24 — Typography Refinement (Scale & Labels):**

- Upgraded to **Perfect Fourth (1.333×) type scale** — h1 now 32-40px (was 28-44px), h2 24-28px, h3 18-21px
- Body text fixed at 1rem (removed subtle clamp that was imperceptible)
- Removed hardcoded `text-2xl font-semibold` overrides on about/now/stream h1s so global CSS applies
- Section labels: dropped `font-mono`, standardized to sans-serif lowercase `text-sm`
- Year labels on `/stream` kept `font-mono` (numbers in mono is conventional) but reduced from `text-xl` to `text-base`
- "What I'm Up To" → "what i'm up to" (consistent lowercase)
- Post display title floor raised from 2rem to 2.5rem for stronger presence
- "see all" link on index dropped `font-mono` to match label treatment
- Year labels on stream page: quaternary → tertiary
- Color hierarchy tightened: secondary darker (30%→20% light / 75%→82% dark), tertiary shifted (50%→45% light / 55%→62% dark)
- Removed explicit `underline` overrides on inline links in about/now/index — global handles it

---

## Questions for Future Sessions

- Which sans-serif font from Google Fonts? (Inter, Work Sans, DM Sans, Manrope)
- Which monospace font? (JetBrains Mono, IBM Plex Mono, Fira Code, Space Mono)
- Should we have rounded corners at all? If yes, how minimal? (0px, 2px, 4px)
- Do we want a manual dark mode toggle, or system preference only?
- Should navigation be sticky, or static?
- How should we handle the footer? Minimal or detailed?

---

**For implementation guidance, see:**

- `component-patterns.md` - How to build components
- `content-authoring.md` - Content structure and frontmatter
- `git-processes.md` - Git workflows and commit conventions
