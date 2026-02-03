# Commit Check

Validate staged changes and commit message before committing.

## Steps

1. **Invoke git-guardian agent** to perform validation

2. The agent will:
   - Analyze staged changes
   - Validate commit message format
   - Check for AI attribution (critical)
   - Assess if changes should go to main or feature branch

3. **Review agent output** and address any issues

4. **Proceed with commit** if validation passes

## Usage

```bash
# Stage your changes first
git add [files]

# Then run this command
/commit-check

# Provide commit message when prompted
# Agent will validate and advise
```

## What This Checks

- ✓ Commit message follows conventional format
- ✓ No AI attribution in message
- ✓ Appropriate type and scope
- ✓ Subject is imperative, lowercase, no period
- ✓ Changes make sense for single commit
- ✓ Branching decision (main vs. feature)

## After Validation

If approved:

```bash
git commit -m "type(scope): subject"
git push origin [branch]
```

If issues found:

```bash
# Fix issues listed by agent
# Re-run /commit-check
```
