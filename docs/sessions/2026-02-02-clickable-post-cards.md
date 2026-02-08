---
date: 2026-02-02
tags:
  - session
  - web-development
  - astro
  - typescript
  - refactoring
project: alexrosenkranz.com
status: complete
---

# Clickable Post Cards & ESLint v9 Migration

**Date:** February 2, 2026
**Project:** alexrosenkranz.com
**PR:** #1 (`feat/clickable-post-cards`)

## Summary

Added individual post detail pages and made post cards clickable, linking from the stream to dedicated post routes. Also completed the ESLint 9 flat config migration that had been technical debt since the MVP build.

## Accomplishments

### Post Detail Pages

- Created `src/pages/posts/[slug].astro` route for individual post pages
- Made post cards in the stream link to their detail pages
- Fixed header navigation active state to correctly highlight the stream link

### ESLint v9 Migration

- Migrated from legacy `.eslintrc.cjs` to ESLint 9 flat config (`eslint.config.js`)
- Removed legacy ESLint config file
- Pre-commit hooks now work properly (resolving tech debt from Jan 13 MVP build)

## Key Decisions

### Separate PR for Post Cards

Used a feature branch and PR workflow for this change since it touched routing, components, and navigation - a multi-file change worth reviewing before merging.

## Commits

| SHA       | Message                                                        |
| --------- | -------------------------------------------------------------- |
| `9b9f72a` | `build: migrate to eslint 9 flat config`                       |
| `8fecc27` | `build: remove legacy eslint config file`                      |
| `d0e741e` | `fix(navigation): correct header active state for stream link` |
| `91a6dae` | `feat(posts): add clickable cards linking to detail pages`     |

## Next Steps

- Implement brutalist UI redesign
- Replace sample content with real posts
