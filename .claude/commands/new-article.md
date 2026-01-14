# Create New Article

Create a new long-form article in `src/content/articles/` with the following details: $ARGUMENTS

## Steps

1. Generate a slug from the title (lowercase, hyphens, no special chars)
2. Create the file at `src/content/articles/slug.md`
3. Use this frontmatter template:

```yaml
---
title: "[Title from arguments]"
publishedAt: [ISO 8601 datetime]
description: "[Generate a 1-2 sentence description]"
tags:
  - [appropriate tag(s)]
draft: true
---
```

4. Add a basic outline structure:

```markdown
## Introduction

[Opening paragraph placeholder]

## [Main Section 1]

[Content placeholder]

## [Main Section 2]

[Content placeholder]

## Conclusion

[Closing thoughts placeholder]
```

5. Confirm the file was created with `draft: true` so it won't publish until ready
6. Suggest running `pnpm dev` to preview

## Notes

- Articles are longer-form content, so set draft: true by default
- Description is used for SEO and social sharing
- Tags help with discoverability but aren't as critical as for posts
