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

7. **Monitor preview deployment**
   - Cloudflare Pages will auto-deploy
   - Check preview URL in GitHub PR
   - Verify CI checks pass

## Prerequisites

Before running this command:

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

1. Wait for CI checks to pass
2. Review preview deployment
3. Merge when ready: `gh pr merge --squash`
