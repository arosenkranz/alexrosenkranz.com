---
name: pr-ready
description: Comprehensive pull request readiness check including commit validation, AI attribution scanning, and PR template generation. Use before creating a PR.
allowed-tools: Read, Bash(git *), Bash(gh pr *)
---

# PR Ready Check

Comprehensive check before creating a pull request.

## Steps

1. **Ensure all work is committed**

   ```bash
   git status  # Should be clean
   ```

2. **Push branch to remote**

   ```bash
   git push -u origin [branch-name]
   ```

3. **Invoke git-guardian agent** for PR validation

4. The agent will:
   - Review all commits in branch
   - Validate commit message conventions
   - Check for AI attribution across all commits
   - Verify CI will pass (types + build)
   - Suggest PR title and description
   - Provide gh pr create command

5. **Review suggested PR content**

6. **Execute gh pr create** with agent's suggested command

7. **Check existing PR comments** (if PR already exists)

   ```bash
   gh pr view [number] --comments
   ```

   - Review Cloudflare deployment status
   - Review Datadog CI checks for lint/type errors
   - Fix any issues before considering the PR ready

8. **Monitor preview deployment**
   - Cloudflare Pages will auto-deploy
   - Check preview URL in GitHub PR
   - Verify CI checks pass

## Prerequisites

Before using this skill:

- [ ] All changes committed
- [ ] Branch pushed to remote
- [ ] Local types check passes (`pnpm typecheck`)
- [ ] Local build succeeds (`pnpm build`)

## What This Checks

- ✓ All commits follow conventions
- ✓ No AI attribution in any commit
- ✓ Branch is pushed
- ✓ Working tree is clean
- ✓ CI requirements will pass

## Expected Output

```bash
# Agent provides:
gh pr create \
  --title "feat(scope): descriptive title" \
  --body "$(cat <<'EOF'
## Summary
- Change 1
- Change 2

## Test Plan
- [ ] Local dev works
- [ ] Types check passes
- [ ] Build succeeds
- [ ] Preview looks correct
EOF
)"
```

## After PR Creation

1. **Review PR comments** for CI results:
   ```bash
   gh pr view [number] --comments
   ```
   - Fix any lint/type errors reported by Datadog CI bot
   - Check Cloudflare deployment status
2. Wait for all CI checks to pass
3. Review preview deployment URL
4. Merge when ready: `gh pr merge --squash`
