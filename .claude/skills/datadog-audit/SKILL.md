---
name: datadog-audit
description: Audit current Datadog RUM configuration, verify event tracking coverage, and identify missing instrumentation. Use when checking observability setup.
allowed-tools: Read, Grep, Bash(cat package.json)
---

# Datadog Monitoring Audit

Audit the current Datadog RUM setup, verify configuration, and identify gaps in event tracking coverage.

## Steps

### 1. Check RUM Initialization

Read `src/layouts/BaseLayout.astro` and verify:

- `@datadog/browser-rum` is imported and `datadogRum.init()` is called
- `__APP_VERSION__` is used for version (not hardcoded)
- All `PUBLIC_DD_*` env vars are referenced

### 2. Verify Build Config

Read `astro.config.mjs` and confirm:

- `__APP_VERSION__` is defined via `vite.define`
- Value comes from `process.env.npm_package_version`

### 3. Check Package Version

Read `package.json` and report the current `version` field. This is what gets sent to Datadog as the RUM version.

### 4. Scan for Custom Event Tracking

Search the codebase for `datadogRum.addAction` and `datadogRum.addError` calls. Report which events are tracked vs. the standard event list:

| Event                  | Status |
| ---------------------- | ------ |
| `post.view`            | ?      |
| `post.external_link`   | ?      |
| `tag.filter`           | ?      |
| `digest.view`          | ?      |
| `article.view`         | ?      |
| `article.scroll_depth` | ?      |
| `spotify.click`        | ?      |
| `theme.toggle`         | ?      |
| `rss.subscribe`        | ?      |

### 5. Check for Error Tracking

Search for `datadogRum.addError` usage and `try/catch` blocks that should report to Datadog.

### 6. Report Summary

Output a table:

| Component              | Status | Notes                        |
| ---------------------- | ------ | ---------------------------- |
| RUM SDK installed      | ?      | @datadog/browser-rum version |
| RUM init in layout     | ?      | BaseLayout.astro             |
| Version auto-injected  | ?      | from package.json            |
| Env vars configured    | ?      | PUBLIC*DD*\* in .env         |
| Custom events tracked  | X/9    | List missing events          |
| Error tracking         | ?      | Manual error reporting       |
| Cloudflare Worker logs | ?      | functions/ directory         |

### 7. Suggest Next Steps

Based on gaps found, suggest prioritized next actions (e.g., adding missing event tracking, setting up Cloudflare Worker log forwarding, adding error boundaries).
