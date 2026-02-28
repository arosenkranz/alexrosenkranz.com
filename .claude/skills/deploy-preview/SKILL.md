---
name: deploy-preview
description: Run quality checks locally before pushing. Preview deployments are handled automatically by Cloudflare's git integration on PR open/push — do not deploy locally.
allowed-tools: Bash(pnpm typecheck), Bash(pnpm lint), Bash(pnpm build)
---

# Deploy Preview

Preview deployments are handled automatically by Cloudflare's git integration — **do not run `wrangler deploy` locally**.

## Why Not Deploy Locally?

Local `wrangler deploy` creates a separate disconnected worker outside of Cloudflare's git integration. It won't share env vars, bindings, or the same worker config as the git-connected deployment.

## Correct Workflow

1. Run quality checks locally:

   ```bash
   pnpm typecheck
   ```

   Stop and report any errors.

   ```bash
   pnpm lint
   ```

   Stop and report any errors.

   ```bash
   pnpm build
   ```

   Stop and report any errors.

2. Push to a feature branch and open a PR:

   ```bash
   gh pr create
   ```

3. Cloudflare automatically builds and deploys a preview URL, visible in the PR checks on GitHub.

## Notes

- **Never run `wrangler deploy` locally for previews** — creates a rogue worker disconnected from git integration
- Production deploys automatically when `main` is pushed via GitHub Actions
- `wrangler.jsonc` has no `env.preview` block intentionally — previews go through git, not local CLI
