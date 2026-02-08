# Component Patterns

**Last Updated:** 2026-02-03

Reference for component patterns used in this project. All components follow the design system described in `design-preferences.md`.

---

## Design Principles

Before creating components, remember:

- **Monochrome only** - No color accents (use grays, black, white)
- **Flat** - No shadows, stark borders, no rounded corners (0px radius)
- **Simple interactions** - Instant feedback, no animations
- **Typography hierarchy** - Sans for body/headings, mono for code/tags/metadata
- **Generous spacing** - Breathe between elements

---

## Astro Components

### PostCard Pattern

```astro
---
// src/components/PostCard.astro
import type { CollectionEntry } from 'astro:content';
import { formatDateShort } from '@/lib/utils';

interface Props {
  post: CollectionEntry<'posts'>;
}

const { post } = Astro.props;
const { title, publishedAt, tags } = post.data;
const primaryTag = tags[0];
const postUrl = `/posts/${post.slug}`;
---

<article class="border-foreground bg-card cursor-pointer border-2 p-8">
  <!-- Stark border (2px solid), no rounded corners, generous padding -->

  <a
    href={postUrl}
    class="absolute inset-0 z-0"
    aria-label={`Read more about ${title}`}></a>

  <!-- Header: Tag (mono font, bordered) and Date (mono font) -->
  <div class="mb-4 flex items-center justify-between text-xs">
    <span
      class="border-foreground text-foreground border px-2 py-1 font-mono font-medium"
    >
      {primaryTag}
    </span>
    <time
      datetime={publishedAt.toISOString()}
      class="text-muted-foreground font-mono"
    >
      {formatDateShort(publishedAt)}
    </time>
  </div>

  <!-- Title: Bold, clear hierarchy -->
  <h3 class="text-foreground mb-3 text-xl font-semibold">
    {title}
  </h3>
</article>
```

**Key patterns:**

- `border-2 border-foreground` - Stark, visible borders (2px solid)
- `font-mono` - Monospace for tags, dates, metadata
- `p-8` - Generous padding (32px)
- No `rounded-*` classes - Completely flat corners
- No `hover:shadow-*` - No hover shadow effects

---

### Header Pattern (Stark Navigation)

```astro
---
// src/components/Header.astro
const currentPath = Astro.url.pathname;
const navItems = [
  { href: '/stream', label: 'Stream' },
  { href: '/now', label: 'Now' },
  { href: '/about', label: 'About' },
];
---

<header class="border-foreground bg-background border-b-2">
  <!-- Stark 2px bottom border -->

  <div class="mx-auto max-w-2xl px-6 py-6 sm:px-8">
    <!-- Narrow prose width (max-w-2xl ~672px), generous padding -->

    <nav class="flex items-center justify-between">
      <a
        href="/"
        class="text-foreground text-xl font-semibold no-underline hover:underline"
      >
        Alex Rosenkranz
      </a>

      <ul class="flex items-center gap-6">
        {
          navItems.map((item) => (
            <li>
              <a
                href={item.href}
                class:list={[
                  'hover:text-foreground text-sm no-underline',
                  currentPath === item.href
                    ? 'text-foreground font-semibold' // Active: bold, no color
                    : 'text-muted-foreground',
                ]}
              >
                {item.label}
              </a>
            </li>
          ))
        }
      </ul>
    </nav>
  </div>
</header>
```

**Key patterns:**

- `border-b-2 border-foreground` - Stark bottom border (2px)
- Active state: `font-semibold` (bold text, no color change)
- Hover: `hover:text-foreground hover:underline` (simple underline, no color)
- No transitions or animations

---

### Footer Pattern (Simple Footer with Flexbox)

```astro
---
// src/components/Footer.astro
const currentYear = new Date().getFullYear();
---

<footer class="border-foreground bg-background mt-auto border-t-2">
  <!-- Stark top border, mt-auto for flexbox footer positioning -->

  <div class="mx-auto max-w-2xl px-6 py-12 sm:px-8">
    <!-- Narrow width, generous vertical padding (48px) -->

    <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
      <p class="text-muted-foreground font-mono text-sm">
        © {currentYear} Alex Rosenkranz
      </p>

      <div class="flex items-center gap-4">
        <a
          href="/rss.xml"
          class="text-muted-foreground hover:text-foreground text-sm no-underline hover:underline"
        >
          RSS
        </a>
        <a
          href="https://github.com/arosenkranz"
          class="text-muted-foreground hover:text-foreground text-sm no-underline hover:underline"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</footer>
```

**Key patterns:**

- `border-t-2 border-foreground` - Stark top border
- `mt-auto` - Flexbox pattern to push footer to bottom
- `font-mono` - Monospace for copyright text
- Simple hover: underline + color change

---

### Layout Pattern (Flexbox Footer)

```astro
---
// src/layouts/BaseLayout.astro
import '@/styles/globals.css';
import Header from '@/components/Header.astro';
import Footer from '@/components/Footer.astro';

interface Props {
  title?: string;
  description?: string;
}
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
  </head>

  <body class="flex min-h-screen flex-col antialiased">
    <!-- Flexbox pattern: min-h-screen + flex flex-col -->
    <slot />
  </body>
</html>
```

**Key patterns:**

- `min-h-screen flex flex-col` on body - Flexbox container for footer positioning
- `flex-1` on main - Pushes footer to bottom on short pages
- `mt-auto` on footer - Ensures footer stays at bottom

---

## Page Structure Pattern

```astro
---
// src/pages/stream.astro
import BaseLayout from '@/layouts/BaseLayout.astro';
import Header from '@/components/Header.astro';
import Footer from '@/components/Footer.astro';
import PostCard from '@/components/PostCard.astro';
---

<BaseLayout title="Stream">
  <Header />

  <main class="mx-auto max-w-2xl flex-1 px-6 py-16 sm:px-8 sm:py-24">
    <!-- flex-1: Grows to fill space (pushes footer down) -->
    <!-- max-w-2xl: Narrow prose width (~672px) -->
    <!-- px-6 py-16: Generous padding (24px horizontal, 64px vertical) -->
    <!-- sm:py-24: Even more vertical padding on larger screens (96px) -->

    <div class="mb-16">
      <!-- mb-16: Large gap between sections (64px) -->
      <h1 class="text-foreground mb-6 text-4xl font-bold tracking-tight">
        Stream
      </h1>
      <p class="text-muted-foreground text-lg leading-relaxed">
        Description text
      </p>
    </div>

    <div class="grid gap-12 sm:grid-cols-1">
      <!-- gap-12: Large gap between cards (48px) -->
      <!-- sm:grid-cols-1: Single column (narrow, focused) -->
      {posts.map((post) => <PostCard post={post} />)}
    </div>
  </main>

  <Footer />
</BaseLayout>
```

**Key patterns:**

- `flex-1` on main - Fills available space
- `max-w-2xl` - Narrow prose width (~650px)
- `py-16 sm:py-24` - Very generous vertical spacing
- `gap-12` or `gap-16` - Large gaps between sections
- Single column grids for focused reading

---

## Link Pattern (Monochrome Links)

```astro
<!-- Default link (no underline until hover) -->
<a href="/about" class="text-foreground no-underline hover:underline">
  About
</a>

<!-- Muted link (secondary/footer links) -->
<a
  href="/rss.xml"
  class="text-muted-foreground hover:text-foreground no-underline hover:underline"
>
  RSS
</a>

<!-- External link indicator (monospace arrow) -->
<a
  href="https://example.com"
  class="text-foreground font-mono no-underline hover:underline"
>
  <span>→</span>
  <span>example.com</span>
</a>
```

**Key patterns:**

- `text-foreground` - No color accent, same as body text
- `no-underline hover:underline` - Simple underline on hover (instant, no transition)
- `font-mono` - Monospace for external link indicators
- No `transition-*` classes - Instant feedback

---

## Button Pattern

```astro
<!-- Primary button (stark border, no background) -->
<button
  class="border-foreground text-foreground hover:bg-muted border-2 px-6 py-3 font-medium"
>
  Click me
</button>

<!-- Disabled button (grayed out) -->
<button
  class="border-border text-muted-foreground border px-3 py-1 font-mono text-sm"
  disabled
>
  Disabled
</button>

<!-- Link-style button (tag filter) -->
<button
  class="border-border bg-background text-muted-foreground hover:bg-muted border px-3 py-1 font-mono text-sm"
>
  Tag name
</button>
```

**Key patterns:**

- `border-2 border-foreground` - Stark visible border
- No `rounded-*` - Completely flat corners
- `hover:bg-muted` - Optional subtle background change on hover
- `font-mono` - Monospace for tags/filters
- No shadows, no gradients

---

## Tag/Badge Pattern (Monochrome Tags)

```astro
<!-- Tag with border (used in PostCard) -->
<span
  class="border-foreground text-foreground border px-2 py-1 font-mono text-xs font-medium"
>
  article
</span>

<!-- Simple tag (no border) -->
<span class="text-muted-foreground font-mono text-xs"> photo </span>
```

**Key patterns:**

- `font-mono` - Always monospace for tags
- `border border-foreground` - Stark border if bordered
- No background color (transparent or `bg-muted`)
- Small text: `text-xs`

---

## What NOT to Do

❌ **Don't use color accents:**

```astro
<!-- WRONG: Uses blue color -->
<a href="/" class="text-primary hover:text-primary-hover">Link</a>

<!-- CORRECT: Monochrome -->
<a href="/" class="text-foreground hover:underline">Link</a>
```

❌ **Don't use rounded corners:**

```astro
<!-- WRONG: Rounded corners -->
<div class="rounded-lg border">Content</div>

<!-- CORRECT: Flat corners -->
<div class="border">Content</div>
```

❌ **Don't use shadows:**

```astro
<!-- WRONG: Shadow on hover -->
<article class="border hover:shadow-md">Card</article>

<!-- CORRECT: No shadow -->
<article class="border-foreground border-2">Card</article>
```

❌ **Don't use transitions/animations:**

```astro
<!-- WRONG: Animated transition -->
<button class="transition-all duration-300">Click</button>

<!-- CORRECT: Instant feedback -->
<button class="hover:bg-muted">Click</button>
```

---

## Spacing System

Use these spacing values consistently:

- **Small gaps:** `gap-2` (8px), `gap-4` (16px)
- **Medium gaps:** `gap-6` (24px), `gap-8` (32px)
- **Large gaps:** `gap-12` (48px), `gap-16` (64px)
- **Section padding:** `py-16` (64px), `sm:py-24` (96px)
- **Container padding:** `px-6` (24px), `sm:px-8` (32px)
- **Card padding:** `p-8` (32px)

---

## Typography Patterns

```astro
<!-- Heading hierarchy -->
<h1 class="text-4xl font-bold tracking-tight">Page Title</h1>
<h2 class="text-3xl font-semibold">Section Title</h2>
<h3 class="text-xl font-semibold">Card Title</h3>

<!-- Body text -->
<p class="text-lg leading-relaxed">Intro text</p>
<p class="leading-relaxed">Regular text (line-height: 1.75)</p>

<!-- Metadata (monospace) -->
<time class="text-muted-foreground font-mono text-sm">Jan 13, 2025</time>
<span class="font-mono text-xs">TAG</span>
```

---

## For More Details

- **Design philosophy:** `design-preferences.md`
- **Content structure:** `content-authoring.md`
- **Git workflows:** `git-processes.md`
