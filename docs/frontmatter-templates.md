# Frontmatter Templates

Quick reference for post frontmatter based on the schema defined in `src/content/config.ts`.

## Schema Reference

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | yes | Post title |
| `publishedAt` | date | yes | Publication date (YYYY-MM-DD format) |
| `tags` | array | yes | One or more valid tags |
| `url` | string | no | External link (must be valid URL, auto-embeds if supported service) |
| `alternateLinks` | object | no | Additional platform URLs (spotify, bandcamp, youtube, soundcloud, mixcloud) |
| `image` | image | no | Relative path to image file |
| `draft` | boolean | no | Default: false |

**Valid tags:** `article`, `photo`, `product`, `code`, `tech`, `music`, `track`, `playlist`, `video`, `quote`, `note`, `website`, `app`, `movie`, `tv`

## Templates

### Basic Post (text/note)
```yaml
---
title: ""
publishedAt: 2026-02-16
tags: [note]
draft: false
---
```

### Link Post
```yaml
---
title: ""
publishedAt: 2026-02-16
tags: [article]
url: ""
draft: false
---
```

### Photo Post
```yaml
---
title: ""
publishedAt: 2026-02-16
tags: [photo]
image: ./images/filename.jpg
draft: false
---
```

### Multi-tag Post
```yaml
---
title: ""
publishedAt: 2026-02-16
tags: [code, article]
url: ""
draft: false
---
```

### Music Post with Embed
```yaml
---
title: ""
publishedAt: 2026-02-16
tags: [music, track]
url: https://open.spotify.com/track/...
alternateLinks:
  bandcamp: https://artist.bandcamp.com/track/...
  youtube: https://youtube.com/watch?v=...
draft: false
---
```

### Draft Post
```yaml
---
title: ""
publishedAt: 2026-02-16
tags: [note]
draft: true
---
```

## Notes

- **Filename format:** `YYYY-MM-DD-slug.md` (the date in the filename can differ from `publishedAt`)
- **Date format:** Use `YYYY-MM-DD` - Astro automatically coerces to Date object
- **Tags:** Always use array syntax even for single tag: `[note]` not `note`
- **URLs:** Must be complete valid URLs including protocol (`https://...`)
- **Images:** Use relative paths from the post file (e.g., `./images/photo.jpg`)
- **Drafts:** Posts with `draft: true` are excluded from production builds
