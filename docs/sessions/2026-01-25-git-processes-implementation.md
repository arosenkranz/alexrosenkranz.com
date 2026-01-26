---
date: 2026-01-25
tags:
  - session
  - documentation
  - git
  - ci-cd
project: alexrosenkranz.com
status: complete
---

# Git Processes & CI/CD Implementation

**Date:** January 25, 2026
**Project:** alexrosenkranz.com

## Summary

Implemented comprehensive git processes documentation and GitHub Actions CI/CD workflows. Established Conventional Commits standards, defined hybrid branching strategy, and set up automated checks for pull requests. Added explicit commit authorship policy prohibiting AI attribution.

## Accomplishments

### Documentation

- **Created `docs/git-processes.md`** (16KB comprehensive guide)
  - Quick reference table for common scenarios
  - Conventional Commits specification with project-specific scopes
  - 11 commit types with examples (feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert)
  - 12 project-specific scopes (posts, articles, digests, spotify, datadog, theme, layout, deps, config, ci, docs, session)
  - Hybrid branching strategy decision matrix
  - Pull request workflow with gh CLI examples
  - Deployment processes (production and preview)
  - Pre-commit hooks documentation
  - GitHub Actions workflow details
  - Session notes git integration
  - Comprehensive troubleshooting section
  - Commit authorship policy (no AI attribution)

### CI/CD Automation

- **Created `.github/workflows/ci.yml`**
  - Runs on all pull requests to main
  - Runs on pushes to feature branches
  - Steps: checkout, setup pnpm/Node.js, install deps, lint, typecheck, build
  - Uses pnpm 9.15.4 and Node.js 22 (updated from initial Node 20)
  - Catches issues before merge

- **Created `.github/workflows/preview.yml.disabled`**
  - Optional workflow for commenting preview URLs on PRs
  - Disabled by default since Cloudflare Git integration handles previews
  - Can be enabled by renaming to `.yml` and adding secrets
  - Requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`

### Integration Updates

- **Updated `CLAUDE.md`**
  - Added `docs/git-processes.md` to documentation list
  - Added "Git & GitHub Processes" section
  - Quick reference for commit format and branching decisions
  - Added commit authorship policy

- **Updated `docs/sessions/README.md`**
  - Added "Commit Message for Session Notes" section
  - Examples: `docs(session): add YYYY-MM-DD topic`
  - Added `git` and `ci-cd` tags to tags reference
  - Clarified that session notes always go direct to main

## Key Decisions

### Conventional Commits Format

Adopted format: `type(scope): subject`

- Required: type and subject
- Optional: scope (but recommended)
- Subject: lowercase, imperative mood, no period
- Breaking changes: use `!` after type/scope

### Branching Strategy

Hybrid approach based on complexity:

**Direct to main:**

- Takes <15 minutes
- Single file or closely related files
- Low risk of breaking changes
- Examples: typos, content, small fixes, session notes

**Feature branch + PR:**

- Takes >15 minutes or multiple sessions
- Multiple unrelated files
- New patterns/architecture
- Breaking changes
- Major dependency upgrades
- When in doubt

### Commit Authorship Policy

**IMPORTANT**: All commits authored solely by Alex Rosenkranz.

- NEVER include `Co-Authored-By: Claude` or AI tool attribution
- Commits represent your work and decisions
- AI tools assist implementation, but you make final decisions
- Added explicit policy section with good/bad examples

### Preview Deployments

Decided to rely on Cloudflare Pages Git integration for preview deployments:

- Cloudflare automatically creates previews for all PRs
- GitHub Actions preview workflow is optional
- Only needed if wanting preview URLs commented on PRs
- Reduces GitHub Actions complexity and cost

### CI Workflow Scope

Limited CI workflow to essential checks:

- ESLint (code quality)
- TypeScript typecheck (type safety)
- Production build (build validation)
- Does NOT enforce conventional commits (relies on documentation and review)
- Does NOT include tests (no test suite yet)

## Challenges & Solutions

### Challenge: Balancing Documentation Completeness vs. Readability

**Problem**: Git processes documentation needed to be comprehensive but not overwhelming.

**Solution**:

- Started with quick reference table for common scenarios
- Organized into clear sections (commits, branching, PRs, deployment, troubleshooting)
- Used tables for reference data (types, scopes, decision matrix)
- Included 10+ real-world examples throughout
- Added troubleshooting section with common issues

### Challenge: Preview Deployment Strategy

**Problem**: Multiple ways to handle preview deployments (Cloudflare native vs GitHub Actions).

**Solution**:

- Documented that Cloudflare Git integration already handles previews
- Created optional GitHub Actions preview workflow (disabled by default)
- Added clear instructions in both workflow file and documentation
- Allows enabling later if needed without losing context

### Challenge: Conventional Commits Enforcement

**Problem**: How to ensure commits follow conventions without adding friction.

**Solution**:

- Documented conventions thoroughly with many examples
- Relied on documentation and code review rather than tooling
- Avoided adding commitlint or git hooks for message validation
- Kept solo development workflow flexible
- Added troubleshooting for common commit message mistakes

## Technical Details

### GitHub Actions Configuration

```yaml
# .github/workflows/ci.yml
name: CI
on:
  pull_request:
    branches: [main]
  push:
    branches-ignore: [main]

jobs:
  lint-and-typecheck:
    runs-on: ubuntu-latest
    steps:
      - checkout
      - setup pnpm 9.15.4
      - setup node 22
      - install deps (frozen-lockfile)
      - run lint
      - run typecheck
      - run build
```

### Pre-commit Hooks Integration

Existing hooks continue to work:

- lint-staged runs on staged files
- typecheck runs on full project
- Runs before every commit
- Can be bypassed with `--no-verify` (emergency only)

### Documentation Structure

```
docs/
├── git-processes.md       # New: comprehensive git guide
├── component-patterns.md  # Existing
├── content-authoring.md   # Existing
└── sessions/
    ├── README.md          # Updated with commit conventions
    └── 2026-01-25-git-processes-implementation.md  # This file
```

## Files Modified/Created

**Created:**

- `docs/git-processes.md` (921 lines total added across all files)
- `.github/workflows/ci.yml`
- `.github/workflows/preview.yml.disabled`

**Modified:**

- `CLAUDE.md` - Added git processes reference
- `docs/sessions/README.md` - Added commit conventions

**Commit:**

```
74d0a28 docs(git): add processes guide and github actions workflows
```

## Next Steps

### Immediate

- ✅ Documentation complete
- ✅ CI workflow configured
- ✅ Session note created

### Testing

- Create test PR to verify CI workflow runs correctly
- Verify lint, typecheck, and build steps pass
- Check that Cloudflare preview deployments work
- Optional: Enable preview workflow and test PR comments

### Optional Enhancements

- Configure branch protection rules (require CI checks)
- Add commitlint if strict conventional commits enforcement needed
- Create PR template with conventional commit format reminder
- Add test suite and include in CI workflow
- Add deployment status badges to README

### Future Considerations

- Visual regression testing in CI
- Automated digest generation testing
- Lighthouse CI for performance checks
- Automated accessibility testing

## Resources

**Documentation:**

- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Cloudflare Pages](https://developers.cloudflare.com/pages/)

**Project Files:**

- `docs/git-processes.md` - Primary reference
- `CLAUDE.md` - Quick reference
- `.github/workflows/ci.yml` - CI configuration

**Commit:**

- https://github.com/arosenkranz/alexrosenkranz.com/commit/74d0a28

## Learnings

### Git Workflow Design

- Hybrid branching strategies work well for solo projects
- Clear decision criteria (time, risk, scope) make branching decisions easy
- Conventional commits improve project history without requiring enforcement tools
- Session notes benefit from consistent commit format

### CI/CD Implementation

- Start minimal and add complexity as needed
- GitHub Actions can complement existing CI/CD (Cloudflare)
- Disabled workflows (`.yml.disabled`) preserve context for future enablement
- Clear documentation prevents "why did we do this?" questions later

### Documentation Approach

- Tables are excellent for reference data
- Examples are more valuable than abstract rules
- Troubleshooting sections save future debugging time
- Quick reference at top helps daily workflows
- Real-world scenarios make guidelines practical

### Commit Authorship

- Clear policy on AI attribution prevents future ambiguity
- Commits represent decision-making, not just code writing
- Solo projects benefit from consistent authorship
- Documentation reinforces expectations for future collaborators

---

**Status:** Complete
**Duration:** ~2 hours
**Lines of Code:** 921 additions
