# alexrosenkranz.com

Personal website and digital garden featuring posts, articles, and weekly digests.

Built with Astro and deployed on Cloudflare Pages.

## Features

- **Quick Posts**: Share links, photos, code snippets, and more with tag-based organization
- **Articles**: Long-form writing and tutorials
- **Weekly Digests**: Auto-generated weekly rollups of posts
- **Now Playing**: Live Spotify integration showing current listening activity
- **RSS Feed**: Syndication of all content types
- **Dark Mode**: System preference-based theming with manual toggle
- **Observability**: Full Datadog integration (RUM, Product Analytics, Logs, Synthetics)

## Tech Stack

- **Framework**: [Astro 5.x](https://astro.build) with TypeScript (strict mode)
- **Styling**: [Tailwind CSS 4.x](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- **Content**: Markdown with Astro Content Collections (Zod schema validation)
- **Hosting**: [Cloudflare Pages](https://pages.cloudflare.com)
- **Functions**: [Cloudflare Workers](https://workers.cloudflare.com) (Spotify API proxy, digest generator)
- **Observability**: [Datadog](https://www.datadoghq.com) (RUM, Product Analytics, Logs, Synthetics)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (v18 or later)
- [pnpm](https://pnpm.io) (required - do not use npm or yarn)

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev              # Start dev server (localhost:4321)
pnpm build            # Production build
pnpm preview          # Preview production build
```

### Quality

```bash
pnpm typecheck        # TypeScript checking
pnpm lint             # ESLint
pnpm lint:fix         # ESLint with auto-fix
pnpm format           # Prettier
```

### Deployment

```bash
pnpm deploy:preview   # Deploy to Cloudflare preview
```

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

### Posts

Quick items with tags. Create files in `src/content/posts/` with format: `YYYY-MM-DD-slug.md`

**Valid tags**: `article`, `photo`, `product`, `code`, `music`, `video`, `quote`, `note`, `website`, `app`, `movie`, `tv`

Example frontmatter:

```yaml
---
title: 'Check out this cool library'
publishedAt: 2024-01-15
tags: ['code', 'website']
link: 'https://example.com'
---
```

### Digests

Weekly rollups. Create files in `src/content/digests/` with format: `YYYY-wWW.md`

### Articles

Long-form posts. Create files in `src/content/articles/` with format: `slug.md`

## Environment Variables

Required in Cloudflare dashboard for production:

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`
- `DATADOG_CLIENT_TOKEN`
- `DATADOG_APPLICATION_ID`
- `DATADOG_API_KEY`

## Documentation

See the `docs/` directory for detailed documentation:

- `docs/component-patterns.md` - Component architecture and patterns
- `docs/content-authoring.md` - Guide for writing content
- `docs/git-processes.md` - Git workflows and commit conventions

## Git Conventions

This project follows Conventional Commits format:

```bash
type(scope): subject

# Examples
feat(posts): add photo lightbox
fix(spotify): handle offline state
docs: update README
```

See `docs/git-processes.md` for complete workflow documentation.

## License

Personal project - all rights reserved.
