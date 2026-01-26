# Git & GitHub Processes

Guide to git workflows, commit conventions, and CI/CD processes for alexrosenkranz.com.

## Quick Reference

| Scenario            | Branch? | PR? | Commit Format                             |
| ------------------- | ------- | --- | ----------------------------------------- |
| Fix typo            | No      | No  | `docs: fix typo in about page`            |
| Add post            | No      | No  | `feat(posts): add new article link`       |
| Update deps (patch) | No      | No  | `build: update astro to 5.0.1`            |
| Session notes       | No      | No  | `docs(session): add 2026-01-25 git setup` |
| Bug fix (<15min)    | No      | No  | `fix(layout): mobile spacing issue`       |
| New feature         | Yes     | Yes | `feat(digests): add auto-generation`      |
| Refactoring         | Yes     | Yes | `refactor(posts): extract card component` |
| Breaking change     | Yes     | Yes | `feat(content)!: change schema structure` |
| Major deps upgrade  | Yes     | Yes | `build: upgrade react 18→19`              |

## Commit Conventions

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for consistent, semantic commit messages.

### Format

```
type(scope): subject

[optional body]

[optional footer]
```

**Rules:**

- `type` and `subject` are required
- `scope` is optional but recommended
- Subject is lowercase, no period at end
- Subject is imperative mood ("add" not "added" or "adds")
- Body and footer are optional
- Use `!` after type/scope for breaking changes
- **NEVER include "Co-Authored-By: Claude" or any AI attribution in commits**

### Types

| Type       | Use For                                 | Example                               |
| ---------- | --------------------------------------- | ------------------------------------- |
| `feat`     | New features or capabilities            | `feat(posts): add photo lightbox`     |
| `fix`      | Bug fixes                               | `fix(spotify): handle offline state`  |
| `docs`     | Documentation only                      | `docs: update git-processes guide`    |
| `style`    | Code formatting (no logic change)       | `style: format with prettier`         |
| `refactor` | Code restructuring (no behavior change) | `refactor(layout): simplify header`   |
| `perf`     | Performance improvements                | `perf(images): add lazy loading`      |
| `test`     | Adding or updating tests                | `test(posts): add validation tests`   |
| `build`    | Dependencies or build config            | `build: upgrade astro to 5.1`         |
| `ci`       | CI/CD configuration                     | `ci: add preview deployment workflow` |
| `chore`    | Maintenance tasks                       | `chore: update session notes`         |
| `revert`   | Reverting previous commits              | `revert: undo spotify changes`        |

### Scopes

Project-specific scopes for this codebase:

| Scope      | Use For                         |
| ---------- | ------------------------------- |
| `posts`    | Posts content and components    |
| `articles` | Articles content and components |
| `digests`  | Digest generation and display   |
| `spotify`  | Spotify integration             |
| `datadog`  | Datadog observability           |
| `theme`    | Styling and theming             |
| `layout`   | Layout components               |
| `deps`     | Dependencies                    |
| `config`   | Configuration files             |
| `ci`       | CI/CD workflows                 |
| `docs`     | Documentation                   |
| `session`  | Session notes                   |

### Examples

**Features:**

```bash
feat(posts): add photo lightbox component
feat(digests): implement auto-generation worker
feat(spotify): add now playing widget
feat(theme): add dark mode toggle
```

**Bug Fixes:**

```bash
fix(layout): mobile menu overflow on iOS
fix(spotify): handle token refresh failure
fix(posts): correct date sorting order
fix(datadog): track external links properly
```

**Documentation:**

```bash
docs: add git processes guide
docs(session): add 2026-01-25 ci-cd setup
docs: update component patterns
docs: fix typo in content authoring guide
```

**Refactoring:**

```bash
refactor(posts): extract PostCard component
refactor(layout): simplify header structure
refactor(spotify): use async/await pattern
```

**Dependencies:**

```bash
build: upgrade astro to 5.1
build(deps): update all patch versions
build: add playwright for testing
```

**CI/CD:**

```bash
ci: add GitHub Actions workflow
ci: configure required status checks
ci: update cloudflare deployment settings
```

**Breaking Changes:**

```bash
feat(content)!: change post schema structure

BREAKING CHANGE: Posts now require publishedAt field
Migration: Add publishedAt to all existing posts
```

### Multi-line Commits

For complex changes, use the body to explain what and why:

```bash
git commit -m "$(cat <<'EOF'
refactor(posts): extract PostCard component

Moved post card markup into reusable component to improve
maintainability and consistency across stream and digest pages.

- Created PostCard.astro component
- Updated stream.astro to use component
- Updated digest template to use component
EOF
)"
```

### Commit Authorship Policy

**IMPORTANT**: All commits should be authored by you alone. Never include AI attribution.

**Do NOT add:**

- `Co-Authored-By: Claude Sonnet <noreply@anthropic.com>`
- `Co-Authored-By: GitHub Copilot`
- Any other AI tool attribution in commit messages
- References to AI assistance in commit footers

**Rationale**: Commits represent your work and decisions. While AI tools may assist in implementation, you are the author making final decisions about what code to accept and commit.

**Good commits:**

```bash
feat(posts): add filtering by tag

Implements client-side tag filtering with URL state management.
Updates are reflected in browser history for back/forward nav.
```

**Bad commits:**

```bash
feat(posts): add filtering by tag

Implements client-side tag filtering with URL state management.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>  # ❌ Never do this
```

## Branching Strategy

This project uses a **hybrid branching strategy**: commit directly to `main` for small changes, create feature branches for complex work.

### Decision Matrix

**Commit directly to `main` when:**

- Takes less than 15 minutes
- Changes single file or closely related files
- Low risk of breaking changes
- Can be reviewed in commit diff
- Examples: typos, content updates, small bug fixes, session notes

**Create feature branch when:**

- Takes more than 15 minutes or multiple sessions
- Touches multiple unrelated files
- Introduces new patterns or architecture
- Has breaking changes
- Significant dependency upgrades
- When in doubt

### Branch Naming

Format: `type/short-description`

```bash
# Features
feat/digest-generation
feat/photo-lightbox
feat/dark-mode

# Bug fixes
fix/mobile-menu
fix/spotify-token

# Refactoring
refactor/post-components
refactor/layout-structure

# Other
docs/api-documentation
test/integration-tests
ci/preview-workflow
```

### Workflows

#### Small Change (Direct to Main)

```bash
# Make changes
vim docs/content-authoring.md

# Stage and commit
git add docs/content-authoring.md
git commit -m "docs: fix typo in content authoring guide"

# Push
git push origin main

# Cloudflare auto-deploys
```

#### Feature Branch (PR Workflow)

```bash
# Create and checkout branch
git checkout -b feat/photo-lightbox

# Make changes, commit as you go
git add src/components/PhotoLightbox.tsx
git commit -m "feat(posts): add photo lightbox component"

git add src/pages/stream.astro
git commit -m "feat(posts): integrate lightbox in stream page"

# Push branch
git push -u origin feat/photo-lightbox

# Create PR
gh pr create \
  --title "Add photo lightbox component" \
  --body "Implements photo viewing with lightbox for better UX"

# Wait for CI checks
# Review preview deployment
# Merge when ready
gh pr merge --squash
```

#### Hotfix (Urgent Bug Fix)

```bash
# Create hotfix branch
git checkout -b fix/critical-spotify-bug

# Fix the issue
git add src/lib/spotify.ts
git commit -m "fix(spotify): handle null refresh token"

# Push and create PR
git push -u origin fix/critical-spotify-bug
gh pr create --title "Fix critical Spotify bug"

# Merge immediately after CI passes
gh pr merge --squash

# Clean up
git checkout main
git pull
```

## Pull Request Workflow

### Creating PRs

**Using gh CLI (recommended):**

```bash
# From your feature branch
gh pr create --title "Add digest generation" --body "$(cat <<'EOF'
## Summary
- Implements auto-digest generation worker
- Adds digest preview endpoint
- Updates digest schema

## Test Plan
- [ ] Run locally with `pnpm dev`
- [ ] Test digest generation endpoint
- [ ] Verify preview deployment
- [ ] Check CI passes
EOF
)"
```

**Using GitHub Web UI:**

1. Push your branch: `git push -u origin feat/your-feature`
2. Visit repository on GitHub
3. Click "Compare & pull request"
4. Fill in title and description
5. Create pull request

### PR Requirements

Before merging, ensure:

- ✅ All CI checks pass (lint, typecheck, build)
- ✅ Preview deployment works correctly
- ✅ Commit messages follow conventions
- ✅ Code follows project patterns
- ✅ No merge conflicts

### Merge Strategies

**Default: Squash and Merge**

This project uses squash merging to keep `main` history clean:

```bash
# After PR approval
gh pr merge --squash

# This combines all commits into one
# Final commit message should be conventional format
```

**When to use other strategies:**

- **Merge commit**: Never (keeps history messy)
- **Rebase**: For small PRs with single clean commit

## Deployment

### Production Deployment

**Automatic on push to `main`:**

```bash
# Every push to main triggers Cloudflare Pages deployment
git push origin main

# Check deployment status
# Visit Cloudflare Pages dashboard
```

**Manual deployment (fallback):**

```bash
pnpm deploy:preview
```

### Preview Deployments

**Automatic for all PRs:**

Cloudflare Pages Git integration automatically creates preview deployments for every PR:

1. Create PR from feature branch
2. Cloudflare detects PR and builds preview
3. Preview URL available in:
   - Cloudflare Pages dashboard
   - GitHub PR "Deployments" tab
   - (Optional) PR comment if GitHub Actions preview workflow is configured

**Finding preview URLs:**

- **Cloudflare Dashboard**: Pages → alexrosenkranz → View builds
- **GitHub**: PR → Deployments tab
- **Direct**: `https://<branch-name>.alexrosenkranz.pages.dev`

### Deployment Verification

After any deployment:

```bash
# Check build output in Cloudflare dashboard
# Visit deployed URL
# Verify:
# - Content renders correctly
# - No console errors
# - Links work
# - Images load
# - Datadog RUM initializes
```

## Pre-commit Hooks

This project uses Husky and lint-staged for pre-commit checks.

### What Runs

On every commit:

1. **lint-staged**: Runs ESLint and Prettier on staged files
2. **typecheck**: Runs TypeScript compiler check

```bash
# Example hook output
✓ Preparing lint-staged...
✓ Running tasks for staged files...
✓ Applying modifications...
✓ Cleaning up...
✓ Type checking...
```

### When Hooks Fail

**Linting errors:**

```bash
# Fix automatically
pnpm lint:fix

# Re-stage and commit
git add .
git commit -m "fix: resolve linting errors"
```

**Type errors:**

```bash
# Review error output
pnpm typecheck

# Fix type issues in code
# Re-attempt commit
git commit -m "fix: resolve type errors"
```

### Bypassing Hooks

**Never bypass hooks unless absolute emergency:**

```bash
# Only use in extreme circumstances
git commit --no-verify -m "emergency: fix critical production bug"

# Then immediately fix the issues
pnpm lint:fix
pnpm typecheck
git commit -m "fix: resolve linting and type issues"
```

## GitHub Actions

### CI Workflow

**Triggers:**

- All pull requests to `main`
- All pushes to feature branches

**Steps:**

1. Checkout code
2. Setup pnpm and Node.js
3. Install dependencies
4. Run ESLint
5. Run TypeScript check
6. Run production build

**Configuration:** `.github/workflows/ci.yml`

**Required checks:**

- Set up in GitHub Settings → Branches → Branch protection rules
- Require "CI / Lint & Type Check" to pass before merging

### Preview Deployment Workflow (Optional)

**Note:** Cloudflare Pages Git integration already handles preview deployments. This workflow is only needed if you want preview URLs commented on PRs.

**Triggers:**

- Pull requests opened, synchronized, or reopened

**Steps:**

1. Build site
2. Deploy to Cloudflare Pages
3. Comment preview URL on PR

**Configuration:** `.github/workflows/preview.yml`

**Required secrets:**

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Session Notes Integration

Session notes are documented in `docs/sessions/` and follow these git conventions:

### Commit Format

```bash
docs(session): add YYYY-MM-DD session topic

# Examples
docs(session): add 2026-01-25 git processes implementation
docs(session): add 2026-01-28 spotify integration
docs(session): add 2026-02-01 digest generation
```

### Workflow

```bash
# Create session note
vim docs/sessions/2026-01-25-git-processes.md

# Stage and commit
git add docs/sessions/2026-01-25-git-processes.md
git commit -m "docs(session): add 2026-01-25 git processes implementation"

# Push directly to main (no PR needed)
git push origin main
```

### When to Commit Session Notes

- **During session**: Commit when significant milestones are reached
- **End of session**: Final update with all accomplishments
- **Next steps**: Update if plans change

Session notes are exempt from the PR workflow and always go directly to `main`.

## Troubleshooting

### Pre-commit Hook Failures

**Problem:** Hook fails with linting errors

**Solution:**

```bash
# Auto-fix linting issues
pnpm lint:fix

# Re-stage files
git add .

# Try commit again
git commit -m "fix: resolve linting errors"
```

**Problem:** Hook fails with type errors

**Solution:**

```bash
# Check type errors
pnpm typecheck

# Fix errors in code
# Re-attempt commit
```

**Problem:** Hook hangs or takes too long

**Solution:**

```bash
# Check what's running
ps aux | grep -E "eslint|tsc"

# Kill if necessary (Ctrl+C)
# Check for type errors in specific files
pnpm tsc --noEmit src/path/to/file.ts
```

### CI Checks Failing But Hooks Passed

**Problem:** Local pre-commit hooks pass but GitHub Actions CI fails

**Possible causes:**

- Uncommitted files affecting build
- Different Node.js versions
- Missing environment variables

**Solution:**

```bash
# Run full CI checks locally
pnpm lint
pnpm typecheck
pnpm build

# Check for uncommitted files
git status

# Commit any missing files
git add .
git commit -m "fix: add missing files"
git push
```

### Conventional Commit Validation Errors

**Problem:** Commit message doesn't follow conventions

**Solution:**

```bash
# Amend last commit with correct format
git commit --amend -m "type(scope): correct subject"

# Force push if already pushed (only on feature branches!)
git push --force-with-lease
```

**Good commit messages:**

```bash
✓ feat(posts): add photo lightbox
✓ fix(spotify): handle offline state
✓ docs: update git processes
✓ refactor(layout): simplify header
```

**Bad commit messages:**

```bash
✗ Add photo lightbox          # Missing type
✗ feat: Add Photo Lightbox    # Subject should be lowercase
✗ feat(posts): Added lightbox # Should be imperative mood
✗ wip                         # Not descriptive
✗ fix stuff                   # Too vague
```

### Preview Deployment Not Triggered

**Problem:** PR created but no preview deployment appears

**Check:**

1. **Cloudflare Pages Dashboard**
   - Visit Pages → alexrosenkranz → View builds
   - Look for branch build

2. **GitHub Deployments Tab**
   - PR → Deployments tab
   - Check for Cloudflare deployment

3. **Cloudflare Git Integration**
   - Pages → Settings → Builds & deployments
   - Verify Git integration is enabled
   - Check branch deployment settings

**Solution:**

```bash
# If Cloudflare integration not working:
# Manual preview deployment
pnpm deploy:preview

# Or trigger rebuild
git commit --allow-empty -m "ci: trigger preview rebuild"
git push
```

### Merge Conflicts

**Problem:** Branch has conflicts with `main`

**Solution:**

```bash
# Update main
git checkout main
git pull origin main

# Rebase feature branch
git checkout feat/your-feature
git rebase main

# Resolve conflicts
# Edit conflicted files
git add .
git rebase --continue

# Force push (updates PR)
git push --force-with-lease
```

**Or use merge strategy:**

```bash
# Update main
git checkout main
git pull origin main

# Merge main into feature
git checkout feat/your-feature
git merge main

# Resolve conflicts
# Edit conflicted files
git add .
git commit -m "merge: resolve conflicts with main"
git push
```

## Resources

### Official Documentation

- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- [GitHub CLI Manual](https://cli.github.com/manual/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)

### Project Documentation

- `CLAUDE.md` - Project conventions and setup
- `docs/content-authoring.md` - Content creation guide
- `docs/component-patterns.md` - Component development patterns
- `docs/sessions/README.md` - Session notes documentation

### Tools

- [Commitizen](https://github.com/commitizen/cz-cli) - Interactive commit message helper
- [commitlint](https://commitlint.js.org/) - Commit message linter (optional future addition)

---

**Last updated:** 2026-01-25
