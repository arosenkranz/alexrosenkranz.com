---
name: deploy-preview
description: Run quality checks (typecheck, lint, build) and deploy to Cloudflare Workers preview environment. Use when testing changes in a preview environment.
allowed-tools: Bash(pnpm typecheck), Bash(pnpm lint), Bash(pnpm build), Bash(pnpm wrangler *)
---

# Deploy to Preview

Run quality checks and deploy to Cloudflare Workers preview environment.

## IMPORTANT: This is a Cloudflare Workers project, NOT Cloudflare Pages

**NEVER use `wrangler pages deploy`** — this will always fail with "Project not found".

The site uses Cloudflare Workers with static assets (required for Spotify API proxy and other Worker functions). The `wrangler.jsonc` config uses `assets.directory` (Workers Assets), not `pages_build_output_dir` (Pages).

## Steps

1. Run type checking:

   ```bash
   pnpm typecheck
   ```

   If this fails, stop and report the errors.

2. Run linting:

   ```bash
   pnpm lint
   ```

   If this fails, stop and report the errors.

3. Run production build:

   ```bash
   pnpm build
   ```

   If this fails, stop and report the errors.

4. Deploy to preview (Cloudflare Workers):

   ```bash
   pnpm wrangler deploy --env preview
   ```

   This deploys to `alexrosenkranz-preview.alex-rosenkranz.workers.dev`.

5. Report the preview URL from the deployment output.

## Notes

- This does NOT deploy to production
- Preview worker URL: `https://alexrosenkranz-preview.alex-rosenkranz.workers.dev`
- Production worker: deployed automatically when `main` branch is pushed via GitHub Actions
- The `--env preview` flag maps to the `alexrosenkranz-preview` worker name in `wrangler.jsonc`
