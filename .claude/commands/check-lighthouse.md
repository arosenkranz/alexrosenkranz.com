# Run Lighthouse Audit

Run Lighthouse CI against the local production build to check performance, accessibility, and SEO.

## Steps

1. Ensure a fresh production build:
   ```bash
   pnpm build
   ```

2. Start the preview server in background:
   ```bash
   pnpm preview &
   ```
   Wait a few seconds for it to start.

3. Run Lighthouse on key pages:
   ```bash
   npx lighthouse http://localhost:4321 --output=json --output-path=./lighthouse-home.json --chrome-flags="--headless"
   npx lighthouse http://localhost:4321/stream --output=json --output-path=./lighthouse-stream.json --chrome-flags="--headless"
   npx lighthouse http://localhost:4321/writing --output=json --output-path=./lighthouse-writing.json --chrome-flags="--headless"
   ```

4. Parse and summarize the results, focusing on:
   - Performance score (target: >95)
   - Accessibility score (target: 100)
   - Best Practices score
   - SEO score
   - Core Web Vitals (LCP, FID, CLS)

5. Stop the preview server.

6. Report any scores below target and suggest improvements.

## Target Scores

| Metric | Target |
|--------|--------|
| Performance | > 95 |
| Accessibility | 100 |
| Best Practices | > 95 |
| SEO | > 95 |
| LCP | < 2.5s |
| CLS | < 0.1 |
