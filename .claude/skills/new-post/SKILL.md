---
name: new-post
description: Create a new quick post in src/content/posts/ with proper frontmatter and slug generation. Use when user wants to share links, photos, or quick thoughts.
allowed-tools: Write, Bash(date *)
---

# Create New Post

Create a new post in `src/content/posts/` with the provided details.

## Steps

1. Generate a slug from the title (lowercase, hyphens, no special chars)
2. Get today's date in YYYY-MM-DD format
3. Create the file at `src/content/posts/YYYY-MM-DD-slug.md`
4. Use this frontmatter template:

```yaml
---
title: '[Title from arguments]'
publishedAt: [ISO 8601 datetime]
tags:
  - [appropriate tag(s)]
url: '[if this is a link post]'
draft: false
---
```

5. If the user provided content/commentary, add it below the frontmatter
6. Confirm the file was created and show the path

## Valid Tags

article, photo, product, code, music, video, quote, note, website, app, movie, tv

## Examples

- "new post about an interesting React article I found at https://example.com" → article tag, include URL
- "new post sharing a photo of my dog" → photo tag
- "new post recommending the Arc browser" → app tag
