# alexrosenkranz.com

Personal website and digital garden built with Astro, deployed on Cloudflare Workers.

## Session Continuity

**IMPORTANT**: At the start of each session, read `STATUS.md` at project root for current state and next steps.

- **Quick Start:** Say "catch up on the project" to read STATUS.md and git status
- **Current Phase:** See STATUS.md for what's complete and what's next
- **Detailed History:** Session logs in `docs/sessions/` (project-specific, version controlled)

## Session Notes

**IMPORTANT**: Session notes for this project are stored locally in `docs/sessions/` and are version controlled.

- **Location:** `docs/sessions/`
- **Naming:** `YYYY-MM-DD-brief-description.md`
- **Format:** Markdown with frontmatter (date, tags, project, status)
- **Purpose:** Track development decisions, accomplishments, and learnings per session
- **Version Control:** Committed to git for project history
- **Skill:** Say "log this session" at the end of a session to create a curated session note

This overrides the global CLAUDE.md instruction to use the Obsidian vault. Session notes for this project stay in the repo.

**When to log:** Any session involving feature work, design decisions, bug fixes with interesting root causes, or architectural changes should get a session note. The Obsidian SessionEnd hook still runs automatically for cross-project logging, but the session-log skill creates the curated, version-controlled record for this project specifically.

## Documentation First

**IMPORTANT**: Before generating any code, ALWAYS read and reference the relevant documentation in the `/docs` directory first. These docs contain project-specific patterns, conventions, and requirements that must be followed.

Current docs:

- `docs/design-preferences.md` - Reference for UI/UX design decisions and visual style
- `docs/component-patterns.md` - Reference for component patterns in this project
- `docs/content-authoring.md` - Reference for writing content
- `docs/git-processes.md` - Reference for git workflows and commit conventions
- `docs/frontmatter-templates.md` - Reference for frontmatter structure and conventions

## Commands

```bash
# Development
pnpm dev              # Start dev server (localhost:4321)
pnpm build            # Production build
pnpm preview          # Preview production build

# Quality
pnpm typecheck        # TypeScript checking
pnpm lint             # ESLint
pnpm lint:fix         # ESLint with auto-fix
pnpm format           # Prettier

# Deployment
pnpm deploy:preview   # Deploy to Cloudflare preview
```

## Tech Stack

- **Framework:** Astro 5.x with TypeScript (strict mode)
- **Styling:** Tailwind CSS 4.x (fully custom components, no UI library)
- **Content:** Markdown with Astro Content Collections
- **Hosting:** Cloudflare Pages
- **Functions:** Cloudflare Workers (Spotify API proxy, digest generator)
- **Observability:** Datadog (RUM, Product Analytics, Logs, Synthetics)

## Project Structure

```
src/
├── components/
│   ├── *.astro       # Astro components
│   └── *.tsx         # React components (for interactivity)
├── content/
│   ├── config.ts     # Content collection schemas (Zod)
│   ├── posts/        # Quick posts (links, photos, etc.)
│   ├── digests/      # Weekly rollups
│   ├── articles/     # Long-form writing
│   └── pages/        # Static pages (about, links)
├── layouts/          # Page layouts
├── pages/            # Route definitions
├── styles/
│   └── globals.css   # Tailwind config + shadcn theme
└── lib/
    ├── utils.ts      # cn() helper and utilities
    ├── spotify.ts    # Spotify client
    └── datadog.ts    # Datadog initialization
functions/
└── api/
    ├── spotify/      # Now playing endpoint
    └── digest/       # Auto-generation worker
```

## Content Types

### Posts (`src/content/posts/`)

Quick items with tags. Filename format: `YYYY-MM-DD-slug.md`

Valid tags: `article`, `photo`, `product`, `code`, `music`, `video`, `quote`, `note`, `website`, `app`, `movie`, `tv`

### Digests (`src/content/digests/`)

Weekly rollups. Filename format: `YYYY-wWW.md`

### Articles (`src/content/articles/`)

Long-form posts. Filename: `slug.md`

## Coding Conventions

### General

- Use TypeScript for all `.ts` and `.tsx` files
- Prefer Astro components (`.astro`) for static content
- Use React components (`.tsx`) only when client-side interactivity is needed
- Path aliases: `@/*` maps to `src/*`

### Styling

- **Design System**: Follow `docs/design-preferences.md` for all UI decisions
- **Color Palette**: Monochrome only (black, white, grays) - no color accents
- **Typography**: Sans-serif + monospace fonts from Google Fonts
- **Interactive Style**: Flat (no shadows, stark borders, simple underlines)
- **Layout**: Narrow prose width (~650px), generous vertical spacing
- **Components**: Fully custom with Tailwind (no shadcn/ui)
- Use Tailwind utility classes exclusively
- Use `cn()` helper for conditional classes
- Dark mode: use `dark:` variant, system preference is default

### Components

- All components are fully custom, built with Tailwind
- Use `client:load` for components needing immediate interactivity
- Use `client:visible` for below-fold interactive components
- Follow the design system (see `docs/design-preferences.md`)

### Content

- All content uses Astro Content Collections with Zod schemas
- Frontmatter is type-checked at build time
- Images in content should use relative paths

## Datadog Integration

RUM is initialized in `BaseLayout.astro`. Key events to track:

- `post.view`, `post.external_link`
- `tag.filter`
- `article.view`, `article.scroll_depth`
- `spotify.click`
- `theme.toggle`

Cloudflare Worker logs go to Datadog via HTTP API.

## Environment Variables

Required in Cloudflare dashboard:

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`
- `DATADOG_CLIENT_TOKEN`
- `DATADOG_APPLICATION_ID`
- `DATADOG_API_KEY`

## Common Tasks

### Adding a new post

1. Create file: `src/content/posts/YYYY-MM-DD-slug.md`
2. Add frontmatter with title, publishedAt, tags
3. Optionally add body content

### Creating a new component

1. Create `.astro` file in `src/components/` for static components
2. Create `.tsx` file for interactive React components (if needed)
3. Follow design system in `docs/design-preferences.md`
4. Use Tailwind utility classes for styling

### Testing the Spotify endpoint locally

The Cloudflare Worker needs wrangler for local dev:

```bash
pnpm wrangler dev functions/api/spotify/now-playing.ts
```

## Git & GitHub Processes

See `docs/git-processes.md` for comprehensive documentation on:

- **Commit Conventions**: Conventional Commits format (`type(scope): subject`)
- **Branching Strategy**: When to use main vs. feature branches
- **Pull Request Workflow**: Creating and merging PRs
- **Deployment Processes**: Production and preview deployments
- **GitHub Actions**: CI/CD automation
- **Troubleshooting**: Common git and CI issues

**Quick Reference:**

```bash
# Commit format
type(scope): subject

# Examples
feat(posts): add photo lightbox
fix(spotify): handle offline state
docs: update git processes guide
docs(session): add 2026-01-25 session notes
```

**Branching decision:**

- Small changes (<15min, low risk): commit directly to `main`
- Features/refactoring: create feature branch and PR

**Commit authorship:**

- NEVER include "Co-Authored-By: Claude" or any AI attribution in commit messages
- All commits are authored by Alex Rosenkranz alone

### Custom Git Workflow Skills

This project has skills that enforce git best practices:

**Available Skills (auto-trigger or invoke with skill name):**

- `commit-check` - Validate staged changes and commit message
- `pr-ready` - Comprehensive PR readiness check
- `branch-decide` - Decide main vs. feature branch
- `pre-commit-review` - Code quality review before commit

**What they enforce:**

- Conventional Commits format validation
- AI attribution blocking (critical)
- Branching decision guidance (15-minute rule)
- PR workflow assistance
- Code quality checks

**Auto-trigger examples:**

- "check my commit" → commit-check
- "ready to create a PR" → pr-ready
- "should I use a feature branch" → branch-decide
- "review my changes" → pre-commit-review

**Workflow integration:**

Say "review my changes" first (code quality), then "check my commit" (git conventions), then commit.

## Important Notes

- Package manager is `pnpm`. Do not use npm or yarn.
- Pre-commit hooks run lint-staged and typecheck.
- All PRs get Cloudflare preview deployments automatically.
- The `/rss.xml` feed includes all content types.
