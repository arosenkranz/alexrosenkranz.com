# Design Preferences

**Last Updated:** 2026-02-03

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
- Body text: 1rem (16px) with 1.75-1.85 line-height
- Fluid type scaling with `clamp()` for responsive sizing
- Mono font for: code blocks, tags/labels, timestamps, metadata

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

- Simple underline on hover
- Instant appearance (no transitions)
- High contrast text color

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
- Clear active state (bold or underlined)
- Sticky header optional
- No hamburger menus (show all links)

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
