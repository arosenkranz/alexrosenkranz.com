---
name: deploy-preview
description: Run quality checks (typecheck, lint, build) and deploy to Cloudflare Pages preview environment. Use when testing changes in a preview environment.
allowed-tools: Bash(pnpm typecheck), Bash(pnpm lint), Bash(pnpm build), Bash(pnpm wrangler *)
---

# Deploy to Preview

Run quality checks and deploy to Cloudflare Pages preview environment.

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

4. Deploy to preview:

   ```bash
   pnpm wrangler pages deploy dist --project-name=alexrosenkranz
   ```

5. Report the preview URL from the deployment output.

## Notes

- This does NOT deploy to production
- Preview URLs are temporary and will expire
- For production deployment, merge to `main` branch
