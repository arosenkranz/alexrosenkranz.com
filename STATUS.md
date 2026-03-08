# Project Status

**Last Updated:** 2026-03-05
**Current Phase:** Phase 2 - SEO Polish ✅ (v1.4.0)
**Git Commit:** 4c27e33 (feat(seo): structured data, sitemap, robots.txt, improved OG tags)

---

## Current State

### What's Working ✅

- Personal website MVP built with Astro 5 + TypeScript + Tailwind CSS 4
- **UI Redesign** (PR #2 merged):
  - Monochrome palette with stark borders and clean typography
  - 4-level color hierarchy with refined typography (sans + monospace)
  - `/alex` personal identity mark with monospace accents
  - System color scheme detection with real-time theme response
  - Redesigned header, footer, and PostListItem components
  - All pages redesigned with refined minimalism and warmer voice
- **Pages Live:**
  - `/` (homepage/stream) - Shows all posts
  - `/stream` - Dedicated stream page with tag filter UI
  - `/about` - Personal bio page
  - `/now` - "Now page" (nownownow.com style)
  - `/posts/[slug]` - Individual post detail pages (clickable cards, PR #1)
- **Content:** Real posts with multi-link schema and media embed support
- **Build Status:** Passes typecheck, builds successfully
- **Deployment:** Live on Cloudflare Workers with GitHub integration
- **Git Tooling:**
  - Git-guardian agent for commit validation and branching guidance
  - `commit-check`, `pr-ready`, `branch-decide`, `pre-commit-review` skills
  - AI attribution blocking enforced at multiple checkpoints
- **Documentation:**
  - Git processes and workflows documented (`docs/git-processes.md`)
  - Session notes system in place (`docs/sessions/`)
  - Component patterns guide (`docs/component-patterns.md`)
  - Content authoring guide (`docs/content-authoring.md`)
  - README with project overview
- **Favicon & OG Image** (v1.1.0):
  - SVG favicon (`/a` mark) with dark mode via `prefers-color-scheme`
  - PNG fallbacks (32x32, 16x16) and apple-touch-icon (180x180)
  - OG image (1200x630) with `/alex` branding for social sharing
  - Full `og:image` and `twitter:image` meta tags in BaseLayout
  - Per-page `image` prop for future article-specific OG images
- **Session Management:** Session continuity with STATUS.md and `catchup` skill
- **Typography** (v1.2.0, PR #5):
  - Perfect Fourth (1.333x) type scale for deliberate heading hierarchy
  - Section labels: sans-serif lowercase with font-medium weight
  - Dashed underline links (rest) → solid (hover)
  - Two-row mobile nav with widened active/inactive contrast
- **Multi-Link Posts** (PR #4):
  - `alternateLinks` schema field for posts with multiple related URLs
  - `MediaEmbed` component for YouTube/Spotify/SoundCloud embeds
  - `AlternateLinks` component for displaying related links on post detail

- **RSS Feed** (PR #6):
  - `/rss.xml` endpoint via `@astrojs/rss`
  - All non-draft posts, sorted by date descending
  - External link posts use their `url` field; others link to `/posts/[slug]`
  - Fixes the broken RSS link in the footer
- **Tag Filtering** (PR #7):
  - `TagFilter.astro` component with anchor links (`?tag=X`)
  - Client-side JS shows/hides posts and year sections based on URL param
  - Works with browser back/forward navigation
  - Active tag highlighted, all/clear links back to `/stream`
- **Spotify Now Playing** (PR #8):
  - Astro API route at `/api/spotify/now-playing` (server-rendered, `prerender = false`)
  - Exchanges refresh token → access token → currently-playing track
  - `NowPlaying.tsx` React component polls every 30s, shown in footer
  - `spotify.click` Datadog RUM event on track link click
  - Helper script `scripts/get-spotify-token.mjs` for one-time OAuth setup
- **Datadog RUM Events** (PR #9):
  - `post.view` on post detail page load
  - `post.external_link` on "View original" link click
  - `tag.filter` on `/stream` when a tag param is active

- **SEO Polish** (PR #12, v1.4.0):
  - `SITE_CONFIG` constant centralizing all site metadata
  - JSON-LD structured data on all pages (WebSite, Person, BlogPosting, BreadcrumbList)
  - `@astrojs/sitemap` integration generating `sitemap-index.xml`
  - `public/robots.txt` pointing crawlers to sitemap
  - `BaseLayout` expanded with `type` and `publishedAt` props
  - `og:type="article"` + `article:published_time` + `article:author` on post pages
  - `og:locale` added to all pages
  - Optional `description` field in post schema; RSS uses `description ?? title`
- **Datadog Synthetics** (PR #11)

### What's Coming Soon 🚧

- Digests content collection (monthly rollups)
- Articles content collection (long-form posts)

---

## What We Just Completed

### Recent Accomplishments (Feb 2026 — Phase 2)

- [x] **RSS Feed** (Feb 25 session, PR #6)
- [x] **Tag Filtering** (Feb 25 session, PR #7)
- [x] **Spotify Now Playing** (Feb 25 session, PR #8)
  - Key debugging: `prerender = false` required for API routes in static builds
  - Cloudflare secrets accessible via `locals.runtime.env` once route goes through Worker
- [x] **Datadog RUM Events** (Feb 25 session, PR #9)
  - `post.view`, `post.external_link`, `tag.filter`, `spotify.click`

### Earlier Accomplishments (Feb 2026)

- [x] **Typography Refinement** (Feb 24 session, PR #5, v1.2.0)
  - Perfect Fourth (1.333x) type scale: h1 32-40px, h2 24-28px, h3 18-21px
  - Removed hardcoded `text-2xl` overrides on page h1s so global CSS clamp applies
  - Section labels: dropped `font-mono`, standardized to sans-serif lowercase `text-base font-medium`
  - Year labels on `/stream` kept mono (numbers in mono is conventional)
  - Dashed underline links, two-row mobile nav, widened nav contrast
  - Updated `docs/design-preferences.md` with scale values and decision log
- [x] **Multi-Link Posts & Embeds** (Feb 22 session, PR #4)
  - Added `alternateLinks` schema field for posts with multiple related URLs
  - Built `MediaEmbed.astro` for YouTube/Spotify/SoundCloud iframe embeds
  - Built `AlternateLinks.astro` for displaying related links on post detail pages
  - Added frontmatter templates reference doc
- [x] **Technical Debt Cleanup** (Feb 15 session)
  - Updated Husky pre-commit to v9 format (removed legacy `_/husky.sh` sourcing)
  - Confirmed ESLint flat config already migrated — no action needed
  - Both tech debt items from Priority 2 resolved
- [x] **Favicon & OG Image** (Feb 14 session, v1.1.0)
  - SVG favicon with dark mode, PNG fallbacks, apple-touch-icon
  - OG image (1200x630) with `/alex` branding
  - Full meta tags wired in BaseLayout with per-page `image` prop
- [x] **Command-to-Skill Migration** (Feb 11 session)
  - Migrated all commands to skills format
  - Removed deprecated commands directory
- [x] **UI Redesign** (PR #2, 7 commits)
  - Implemented minimal aesthetic across entire site
  - Expanded to 4-level color hierarchy with refined typography
  - Redesigned all components: header, footer, PostListItem
  - Redesigned all pages with refined minimalism
  - Added `/alex` personal identity mark with monospace accents
  - Added real-time system color scheme response
  - Fixed LinkedIn URL, enlarged mark
- [x] **Git Guardian Agent** (Feb 2 session)
  - Created `git-guardian` agent for commit validation
  - Added `commit-check`, `pr-ready`, `branch-decide`, `pre-commit-review` skills
  - AI attribution blocking at multiple enforcement points
  - Branching decision matrix (15-minute rule)
- [x] **Clickable Post Cards** (PR #1)
  - Posts link to individual detail pages at `/posts/[slug]`

### Earlier Accomplishments (Jan 2026)

- [x] **Deployed to Cloudflare Pages**
  - Connected GitHub repo with automatic deployments
  - Preview and production environments configured
  - Site live and accessible
- [x] **Migrated to Tailwind CSS v4**
  - Updated from v3 to v4 with Vite plugin
  - Maintained existing design system
- [x] **Session Management System**
  - Added STATUS.md for project state tracking
  - Created `catchup` skill for quick context loading
  - Moved session notes to `docs/sessions/` (version controlled)
- [x] **Documentation**
  - Git processes guide with commit conventions
  - GitHub Actions workflows documented
  - README with project overview
  - Component patterns guide
  - Content authoring guide

### Phase 1 Accomplishments (Jan 2025)

- [x] Initialized Astro 5 project with TypeScript strict mode
- [x] Configured Tailwind CSS with design system and dark mode
- [x] Set up React integration for future interactive components
- [x] Built posts content collection with Zod schema
- [x] Created 5 sample posts (article, note, code, music types)
- [x] Built core components (Header, Footer, PostCard)
- [x] Created all 4 pages with responsive layouts
- [x] Configured ESLint, Prettier, Husky pre-commit hooks
- [x] Git repository initialized and pushed to GitHub

**Recent Session Logs:** `docs/sessions/`

---

## Immediate Next Steps

### Priority 1 (Content & Polish)

- [ ] **Continue Adding Real Content**
  - Write more posts to build out the stream
  - Flesh out `/about` and `/now` pages with more detail

- [x] ~~**Add Favicon & OG Image**~~ ✅ Done in v1.1.0
- [x] ~~**Typography Refinement**~~ ✅ Done in v1.2.0 (PR #5)
- [x] ~~**Multi-Link Posts & Embeds**~~ ✅ Done in PR #4

### Priority 2 (Fix Technical Debt)

- [x] ~~**Migrate ESLint Config**~~ ✅ Already migrated to flat config
- [x] ~~**Update Husky Hooks**~~ ✅ Fixed in v1.1.1
- [x] ~~**Deploy-preview skill**~~ ✅ Fixed for Cloudflare Workers (was Pages)

---

## Known Issues & Technical Debt

### Minor 🔧

1. **Content**
   - Some sample posts may still need replacement with real content
   - About/now pages could use more personal detail
   - **Priority:** Medium (ongoing)

2. **No Tests**
   - Currently no test suite
   - Should add in Phase 2 (unit tests, integration tests)
   - **Priority:** Low (add when codebase grows)

---

## Phase 2 Backlog (Not Started)

### Content Types

- [ ] Add digests content collection (weekly/monthly rollups)
- [ ] Add articles content collection (long-form posts)
- [ ] Create digest page routes (`/digests`, `/digests/[slug]`)
- [ ] Create article page routes (`/writing`, `/writing/[slug]`)
- [x] ~~Build RSS feeds~~ ✅ Done (PR #6)

### Interactivity

- [ ] Add theme toggle component (manual dark/light override)
- [ ] Add reading time estimates to posts

### Integrations

- [x] ~~Build Spotify "Now Playing" endpoint~~ ✅ Done (PR #8)
- [x] ~~Create NowPlaying.tsx React component~~ ✅ Done (PR #8)
- [x] ~~Set up Datadog RUM initialization~~ ✅ Done (was already initialized)
- [x] ~~Implement Product Analytics event tracking~~ ✅ Done (PR #9)
- [ ] Add Cloudflare Worker for digest auto-generation

### Polish

- [x] ~~Add structured data (JSON-LD) for SEO~~ ✅ Done (PR #12)
- [ ] Generate OG images dynamically (per page)
- [ ] Implement image optimization for photo posts
- [ ] Add Lighthouse CI to GitHub Actions
- [x] ~~Create individual post pages~~ ✅ Done in PR #1

---

## Development Commands

```bash
# Development
pnpm dev              # Start dev server (localhost:4321)
pnpm build            # Production build
pnpm preview          # Preview production build

# Quality Checks
pnpm typecheck        # TypeScript + Astro check
pnpm lint             # ESLint
pnpm format           # Prettier

# Deployment
pnpm deploy:preview   # Deploy to Cloudflare preview
```

---

## Project Links

- **Repository:** https://github.com/arosenkranz/alexrosenkranz.com
- **Local Path:** `/Users/alexrosenkranz/Code/sites/alexrosenkranz.com`
- **Session Logs:** `docs/sessions/`
- **PRD:** `alexrosenkranz-prd.md` (root of project)
- **Component Patterns:** `docs/component-patterns.md`
- **Content Authoring Guide:** `docs/content-authoring.md`

---

## Architecture Notes

### Stack

- **Framework:** Astro 5.x (static site generation)
- **Language:** TypeScript 5.x (strict mode)
- **Styling:** Tailwind CSS 4.x (Vite plugin)
- **Components:** React 18.x (for future interactivity)
- **Content:** Astro Content Collections with Zod validation
- **Hosting:** Cloudflare Workers (connected to GitHub)
- **Package Manager:** pnpm

### Key Files

- `src/content/config.ts` - Content collection schemas
- `src/styles/globals.css` - Design system (CSS variables)
- `src/layouts/BaseLayout.astro` - Base layout with dark mode
- `astro.config.mjs` - Astro configuration
- `tailwind.config.mjs` - Tailwind theme extension

### Design System

- **Aesthetic:** Minimal with monochrome palette, stark borders, no shadows
- **Colors:** 4-level hierarchy via CSS custom properties (light/dark mode)
- **Typography:** Perfect Fourth (1.333x) scale, sans-serif body + mono accents
- **Labels:** Sans-serif lowercase `text-base font-medium` (year labels stay mono)
- **Links:** Dashed underline at rest, solid on hover
- **Identity:** `/alex` mark with monospace accents
- **Dark Mode:** Real-time system preference detection
- **Spacing:** Generous whitespace, narrow prose width (~650px), typography-focused

---

## Questions for Next Session

- Should tag filtering use URL params or client-side state?
- Do we need a search feature for posts?
- What's the priority order for Phase 2 features?

---

**For detailed session history, see:** `docs/sessions/`
