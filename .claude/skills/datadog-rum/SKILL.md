---
name: datadog-rum
description: Datadog Real User Monitoring setup, event tracking, and observability for this project. Use when adding RUM events, checking Datadog config, troubleshooting observability, or verifying version tracking.
allowed-tools: Read, Grep, Glob, Bash(gh *)
---

# Datadog RUM for alexrosenkranz.com

Comprehensive guide for managing Datadog Real User Monitoring in this project.

## Current Setup

### RUM Initialization

Location: `src/layouts/BaseLayout.astro` (lines 76-94)

```typescript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
  applicationId: import.meta.env.PUBLIC_DD_APPLICATION_ID || '',
  clientToken: import.meta.env.PUBLIC_DD_CLIENT_TOKEN || '',
  site: import.meta.env.PUBLIC_DD_SITE || 'datadoghq.com',
  service: import.meta.env.PUBLIC_DD_SERVICE || 'alexrosenkranz-web',
  env: import.meta.env.PUBLIC_DD_ENV || 'production',
  version: __APP_VERSION__, // auto-injected from package.json
  sessionSampleRate: 100,
  sessionReplaySampleRate: 20,
  trackUserInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: 'mask-user-input',
});
```

### Version Management

**Automatic version injection** from `package.json`:

- `astro.config.mjs` defines `__APP_VERSION__` via Vite's `define` feature
- Value comes from `package.json` `version` field via `createRequire`
- Type declared in `src/env.d.ts`
- **To bump version**: Run `npm version patch|minor|major` then `git push --tags`

### Environment Variables

**Build-time variables** (set in Cloudflare Pages dashboard under Settings → Environment Variables):

| Variable                   | Value                                  | Purpose             |
| -------------------------- | -------------------------------------- | ------------------- |
| `PUBLIC_DD_APPLICATION_ID` | `ba2c55db-01e5-42d7-a64d-29e41d068fe9` | RUM application ID  |
| `PUBLIC_DD_CLIENT_TOKEN`   | `pub92eb451abac811ebd1d05e582d03adad`  | Public client token |
| `PUBLIC_DD_SITE`           | `datadoghq.com`                        | Datadog site        |
| `PUBLIC_DD_SERVICE`        | `alexrosenkranz-web`                   | Service name        |
| `PUBLIC_DD_ENV`            | `production`                           | Environment         |

**Local development**: Same vars in `.env` (gitignored)

## Product Analytics Events

Standard events to track user behavior:

### Post Interactions

```typescript
// Track post view
datadogRum.addAction('post.view', {
  postId: post.slug,
  tags: post.data.tags,
  type: 'quick-post', // or 'article', 'digest'
});

// Track external link clicks
datadogRum.addAction('post.external_link', {
  postId: post.slug,
  url: externalUrl,
  domain: new URL(externalUrl).hostname,
});
```

### Navigation & Filtering

```typescript
// Track tag filtering
datadogRum.addAction('tag.filter', {
  tag: selectedTag,
  resultCount: filteredPosts.length,
});
```

### Content Engagement

```typescript
// Track article views
datadogRum.addAction('article.view', {
  articleId: article.slug,
  wordCount: article.wordCount,
});

// Track scroll depth
datadogRum.addAction('article.scroll_depth', {
  articleId: article.slug,
  depth: 50, // 25, 50, 75, or 100
});

// Track digest views
datadogRum.addAction('digest.view', {
  digestId: digest.slug,
  weekNumber: digest.data.week,
});
```

### UI Interactions

```typescript
// Track theme toggle
datadogRum.addAction('theme.toggle', {
  newTheme: 'dark', // or 'light'
});

// Track Spotify widget clicks
datadogRum.addAction('spotify.click', {
  songId: track.id,
  artist: track.artist,
});

// Track RSS subscription
datadogRum.addAction('rss.subscribe', {
  feedType: 'all', // or specific content type
});
```

## Error Tracking

### Automatic Error Capture

All unhandled errors are captured automatically by RUM.

### Manual Error Reporting

For handled errors that you want to track:

```typescript
try {
  await riskyOperation();
} catch (error) {
  datadogRum.addError(error, {
    context: 'spotify-fetch',
    endpoint: '/api/spotify/now-playing',
  });
  // Handle gracefully...
}
```

## Cloudflare Worker Logging

For server-side functions (Spotify API, digest generator), send logs to Datadog:

```typescript
async function logToDatadog(
  message: string,
  level: 'info' | 'warn' | 'error',
  context: Record<string, unknown>,
  env: { DATADOG_API_KEY: string }
) {
  await fetch('https://http-intake.logs.datadoghq.com/api/v2/logs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'DD-API-KEY': env.DATADOG_API_KEY,
    },
    body: JSON.stringify({
      ddsource: 'cloudflare-worker',
      ddtags: `env:production,service:alexrosenkranz-api`,
      hostname: 'cloudflare',
      level,
      message,
      ...context,
    }),
  });
}
```

## Dashboards & Links

- **RUM Performance Monitoring**: https://app.datadoghq.com/rum/performance-monitoring?query=@application.id:ba2c55db-01e5-42d7-a64d-29e41d068fe9
- **RUM Application Settings**: https://app.datadoghq.com/rum/application/ba2c55db-01e5-42d7-a64d-29e41d068fe9/manage?agentic=true
- **Error Tracking**: https://app.datadoghq.com/error-tracking?query=@application.id:ba2c55db-01e5-42d7-a64d-29e41d068fe9&source=all
- **Product Analytics**: https://app.datadoghq.com/product-analytics?query=@application.id:ba2c55db-01e5-42d7-a64d-29e41d068fe9

## Common Tasks

### Audit Current Setup

Run `/datadog-monitor` command to check:

- RUM SDK installation and version
- Config in BaseLayout.astro
- Version auto-injection
- Environment variables
- Custom event tracking coverage
- Error tracking implementation

### Add a New Custom Event

1. Identify the user action to track
2. Choose appropriate event name from standard list (or create new if needed)
3. Add `datadogRum.addAction()` call in the relevant component
4. Test locally (check browser DevTools Network tab for requests to datadoghq.com)
5. Deploy and verify in RUM dashboard

### Troubleshoot Missing Data

1. **Check browser console** for RUM SDK errors
2. **Verify env vars** are set in Cloudflare Pages dashboard
3. **Check Network tab** for requests to `https://browser-intake-datadoghq.com`
4. **Verify version** in RUM dashboard matches `package.json`
5. **Check sampling rates** - only 20% of sessions get replay

### Bump Version

```bash
# Patch release (1.0.0 → 1.0.1) - bug fixes
npm version patch

# Minor release (1.0.0 → 1.1.0) - new features
npm version minor

# Major release (1.0.0 → 2.0.0) - breaking changes
npm version major

# Push to trigger deploy
git push && git push --tags
```

## Recommended Synthetics Tests

Set up in Datadog Synthetics to monitor uptime and performance:

1. **Homepage Availability**
   - URL: `https://alexrosenkranz.com`
   - Assertions: Status 200, Load time < 3s

2. **Spotify API Health**
   - URL: `https://alexrosenkranz.com/api/spotify/now-playing`
   - Assertions: Status 200, Valid JSON response

3. **RSS Feed Validity**
   - URL: `https://alexrosenkranz.com/rss.xml`
   - Assertions: Status 200, Content-Type includes XML

4. **Critical User Journey**
   - Steps: Homepage → Stream → Filter by tag → Click post
   - Assertions: Each step completes successfully

## Documentation Reference

For official Datadog documentation:

- **RUM Browser SDK**: https://docs.datadoghq.com/real_user_monitoring/browser/
- **Product Analytics**: https://docs.datadoghq.com/product_analytics/
- **Error Tracking**: https://docs.datadoghq.com/error_tracking/
- **Logs from Cloudflare Workers**: https://docs.datadoghq.com/logs/log_collection/javascript/
