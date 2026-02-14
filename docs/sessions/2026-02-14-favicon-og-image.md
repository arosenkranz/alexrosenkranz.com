---
date: 2026-02-14
tags:
  - session
  - web-development
  - design
  - seo
  - deployment
project: alexrosenkranz.com
status: complete
---

# Favicon & OG Image Implementation

**Date:** February 14, 2026
**Project:** alexrosenkranz.com
**Version:** 1.1.0

## Summary

Added complete favicon set and OG image for social sharing. The `/a` monospace mark serves as the favicon with dark mode support via SVG `prefers-color-scheme`. PNG fallbacks generated with Playwright for browser compatibility. Created a 1200x630 OG image featuring the `/alex` mark, tagline, and domain. Wired up all `og:image` and `twitter:image` meta tags in BaseLayout with a per-page `image` prop for future customization.

## Accomplishments

### Favicon Set

- Created `public/favicon.svg` with `/a` mark in JetBrains Mono, dark mode adaptive via `@media (prefers-color-scheme: dark)`
- Generated PNG fallbacks: 32x32, 16x16 (transparent background)
- Generated `apple-touch-icon.png` at 180x180 with white background for iOS
- Created `public/site.webmanifest` for PWA icon support

### OG Image

- Created `public/og-image.png` (1200x630) with white background
- Features `/alex` mark in JetBrains Mono, tagline in Inter, domain in monospace
- Uses design system colors: `#1A1A1A` primary, `#666666` secondary, `#999999` tertiary

### Meta Tags

- Added `og:image`, `og:image:width`, `og:image:height`, `og:image:alt` to BaseLayout
- Added `twitter:image` and `twitter:image:alt` to BaseLayout
- All image URLs use absolute paths via `siteUrl` variable
- Added `image` prop to BaseLayout for per-page OG images (defaults to `/og-image.png`)

### Deployment

- Bumped version to 1.1.0, tagged `v1.1.0`
- Deployed to Cloudflare Workers production
- Verified all meta tags and favicon links on preview before production deploy

## Commits

| SHA       | Message                                             |
| --------- | --------------------------------------------------- |
| `0faa8a0` | `feat: add favicon and OG image for social sharing` |
| `9dd98ad` | `chore(release): bump to 1.1.0`                     |

## Key Decisions

### SVG Favicon with CSS Media Query

Using `prefers-color-scheme` inside the SVG means the favicon automatically adapts to system theme without JavaScript. PNG fallbacks cover browsers that don't support SVG favicons.

### Playwright for PNG Generation

Used Playwright MCP to render HTML pages at exact pixel sizes and screenshot them, avoiding the need for image editing tools or external dependencies. Fonts loaded from Google Fonts CDN ensure consistent rendering.

### Per-Page Image Prop

The `image` prop on BaseLayout defaults to `/og-image.png` but can be overridden per page. This sets up future support for article-specific OG images from frontmatter.

## Learnings

- Playwright MCP blocks `file://` URLs - need to serve files over HTTP (e.g., `python3 -m http.server`)
- Cloudflare Workers uses `wrangler deploy` for production, not `wrangler pages deploy`
- `wrangler versions deploy` requires interactive TTY for traffic split prompts, doesn't work in non-interactive shells
- Always run `branch-decide` before committing to determine main vs. feature branch

## Next Steps

- Add per-article OG images using the `image` prop
- Fix Husky deprecation warnings
- Replace sample posts with real content
- Validate OG image with social sharing debuggers (Facebook, Twitter, LinkedIn) post-deploy
