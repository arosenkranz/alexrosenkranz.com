# alexrosenkranz.com

Personal website and digital garden built with Astro, deployed on Cloudflare Pages.

## Session Continuity

**IMPORTANT**: At the start of each session, read `STATUS.md` at project root for current state and next steps.

- **Quick Start:** Run `/catchup` command to read STATUS.md and git status
- **Current Phase:** See STATUS.md for what's complete and what's next
- **Detailed History:** Session logs in `~/Documents/main-vault/Sessions/`

## Session Notes

**IMPORTANT**: Session notes for this project are stored locally in `docs/sessions/` and are version controlled.

- **Location:** `docs/sessions/`
- **Naming:** `YYYY-MM-DD-brief-description.md`
- **Format:** Markdown with frontmatter (date, tags, project, status)
- **Purpose:** Track development decisions, accomplishments, and learnings per session
- **Version Control:** Committed to git for project history

This overrides the global CLAUDE.md instruction to use the Obsidian vault. Session notes for this project stay in the repo.

## Documentation First

**IMPORTANT**: Before generating any code, ALWAYS read and reference the relevant documentation in the `/docs` directory first. These docs contain project-specific patterns, conventions, and requirements that must be followed.

Current docs:

- `docs/component-patterns.md` - Reference for component patterns in this project
- `docs/content-authoring.md` - Reference for writing content
- `docs/git-processes.md` - Reference for git workflows and commit conventions

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
- **Styling:** Tailwind CSS 4.x + shadcn/ui
- **Content:** Markdown with Astro Content Collections
- **Hosting:** Cloudflare Pages
- **Functions:** Cloudflare Workers (Spotify API proxy, digest generator)
- **Observability:** Datadog (RUM, Product Analytics, Logs, Synthetics)

## Project Structure

```
src/
├── components/
│   ├── ui/           # shadcn/ui components (don't modify directly)
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

- Use Tailwind utility classes
- Use `cn()` helper for conditional classes
- Follow shadcn/ui patterns for component styling
- Dark mode: use `dark:` variant, system preference is default

### Components

- shadcn/ui components live in `src/components/ui/`
- Don't modify shadcn components directly; extend with wrapper components
- Use `client:load` for components needing immediate interactivity
- Use `client:visible` for below-fold interactive components

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

### Adding a shadcn component

```bash
pnpm dlx shadcn@latest add [component-name]
```

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

### Custom Git Guardian Agent

This project has a custom `git-guardian` agent that proactively enforces git best practices:

**Available Commands:**

- `/commit-check` - Validate staged changes and commit message before committing
- `/pr-ready` - Comprehensive PR readiness check with suggested PR content
- `/branch-decide` - Interactive helper to decide main vs. feature branch

**What it enforces:**

- Conventional Commits format validation
- AI attribution blocking (critical)
- Branching decision guidance (15-minute rule)
- PR workflow assistance

**When to use:**

1. Before committing: Run `/commit-check` to validate your commit message
2. Before creating PR: Run `/pr-ready` to review all commits and get PR template
3. When unsure about branching: Run `/branch-decide` for recommendation

**Workflow integration:**

```bash
# Recommended workflow
1. Make changes
2. git add [files]
3. /pre-commit-review  # Code quality
4. /commit-check       # Git conventions
5. git commit -m "type(scope): subject"
```

The git-guardian agent works alongside `/pre-commit-review`:

- `/pre-commit-review` checks code quality (console.logs, TODOs, etc.)
- `/commit-check` checks git conventions (commit format, attribution)

## Important Notes

- Package manager is `pnpm`. Do not use npm or yarn.
- Pre-commit hooks run lint-staged and typecheck.
- All PRs get Cloudflare preview deployments automatically.
- The `/rss.xml` feed includes all content types.
