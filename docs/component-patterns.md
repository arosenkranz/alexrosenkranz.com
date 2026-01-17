# Component Patterns

Reference for component patterns used in this project.

## Astro Components

### Basic Component with Props

```astro
---
// src/components/PostCard.astro
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  publishedAt: Date;
  tags: string[];
  url?: string;
  class?: string;
}

const { title, publishedAt, tags, url, class: className } = Astro.props;

const formattedDate = publishedAt.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});
---

<article class={cn('border-b border-border py-6', className)}>
  <div
    class="text-muted-foreground mb-2 flex items-center justify-between text-sm"
  >
    <div class="flex gap-2">
      {tags.map((tag) => <Badge variant="secondary">{tag}</Badge>)}
    </div>
    <time datetime={publishedAt.toISOString()}>{formattedDate}</time>
  </div>

  <h2 class="text-lg font-medium">
    {
      url ? (
        <a href={url} class="hover:text-primary" target="_blank" rel="noopener">
          {title}
          <span class="text-muted-foreground ml-2">→</span>
        </a>
      ) : (
        title
      )
    }
  </h2>

  <slot />
</article>
```

### Layout Component

```astro
---
// src/layouts/BaseLayout.astro
import '@/styles/globals.css';
import { Header } from '@/components/Header.astro';
import { Footer } from '@/components/Footer.astro';
import { SEO } from '@/components/SEO.astro';

interface Props {
  title: string;
  description?: string;
  image?: string;
}

const { title, description, image } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <SEO title={title} description={description} image={image} />
  </head>
  <body class="bg-background text-foreground min-h-screen">
    <Header />
    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

## React Components (Islands)

### Interactive Component with State

```tsx
// src/components/TagFilter.tsx
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TagFilterProps {
  tags: string[];
  initialTag?: string;
  onTagChange?: (tag: string | null) => void;
}

export function TagFilter({ tags, initialTag, onTagChange }: TagFilterProps) {
  const [activeTag, setActiveTag] = useState<string | null>(initialTag ?? null);

  const handleTagClick = (tag: string) => {
    const newTag = activeTag === tag ? null : tag;
    setActiveTag(newTag);
    onTagChange?.(newTag);

    // Update URL without page reload
    const url = new URL(window.location.href);
    if (newTag) {
      url.searchParams.set('tag', newTag);
    } else {
      url.searchParams.delete('tag');
    }
    window.history.pushState({}, '', url);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant={activeTag === tag ? 'default' : 'outline'}
          className={cn('cursor-pointer', activeTag === tag && 'bg-primary')}
          onClick={() => handleTagClick(tag)}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
```

### Polling Component

```tsx
// src/components/NowPlaying.tsx
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface NowPlayingData {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  songUrl: string;
}

const POLL_INTERVAL_IDLE = 30000;
const POLL_INTERVAL_ACTIVE = 10000;

export function NowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let intervalId: number;
    let isVisible = true;

    const fetchNowPlaying = async () => {
      try {
        const res = await fetch('/api/spotify/now-playing');
        if (!res.ok) throw new Error('Failed to fetch');
        const json = await res.json();
        setData(json);
        setError(null);
      } catch (err) {
        setError('Unable to load');
      }
    };

    const startPolling = () => {
      const interval = data?.isPlaying
        ? POLL_INTERVAL_ACTIVE
        : POLL_INTERVAL_IDLE;
      intervalId = window.setInterval(fetchNowPlaying, interval);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
        clearInterval(intervalId);
      } else {
        isVisible = true;
        fetchNowPlaying();
        startPolling();
      }
    };

    // Initial fetch
    fetchNowPlaying();
    startPolling();

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [data?.isPlaying]);

  if (error || !data) {
    return null;
  }

  return (
    <a
      href={data.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'text-muted-foreground flex items-center gap-3 text-sm',
        'hover:text-foreground transition-colors'
      )}
    >
      <span
        className={cn(
          'h-2 w-2 rounded-full',
          data.isPlaying ? 'animate-pulse bg-green-500' : 'bg-muted'
        )}
      />
      <span>
        {data.isPlaying ? 'Now playing' : 'Recently played'}:{' '}
        <span className="text-foreground">{data.title}</span>
        {' - '}
        {data.artist}
      </span>
    </a>
  );
}
```

## Using React Components in Astro

```astro
---
// src/pages/stream.astro
import BaseLayout from '@/layouts/BaseLayout.astro';
import { TagFilter } from '@/components/TagFilter';
import PostCard from '@/components/PostCard.astro';
import { getCollection } from 'astro:content';

const posts = await getCollection('posts', ({ data }) => !data.draft);
const allTags = [...new Set(posts.flatMap((p) => p.data.tags))];

// Get initial tag from URL
const url = new URL(Astro.request.url);
const initialTag = url.searchParams.get('tag');
---

<BaseLayout title="Stream">
  <h1 class="mb-8 text-3xl font-bold">Stream</h1>

  <!-- React component with client:load for immediate interactivity -->
  <TagFilter client:load tags={allTags} initialTag={initialTag} />

  <div class="mt-8">
    {
      posts.map((post) => (
        <PostCard
          title={post.data.title}
          publishedAt={post.data.publishedAt}
          tags={post.data.tags}
          url={post.data.url}
          data-tags={post.data.tags.join(',')}
        />
      ))
    }
  </div>
</BaseLayout>

<script>
  // Client-side filtering based on tag selection
  document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tag = urlParams.get('tag');
    if (tag) {
      filterPosts(tag);
    }
  });

  function filterPosts(tag: string | null) {
    const posts = document.querySelectorAll('[data-tags]');
    posts.forEach((post) => {
      const tags = post.getAttribute('data-tags')?.split(',') ?? [];
      const show = !tag || tags.includes(tag);
      (post as HTMLElement).style.display = show ? 'block' : 'none';
    });
  }

  // Listen for popstate (back/forward navigation)
  window.addEventListener('popstate', () => {
    const urlParams = new URLSearchParams(window.location.search);
    filterPosts(urlParams.get('tag'));
  });
</script>
```
