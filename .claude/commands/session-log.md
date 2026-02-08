# Log Session to docs/sessions/

Write a session note documenting the current session's work on alexrosenkranz.com. This captures development decisions, accomplishments, and learnings for future reference.

## When to Use

Run this command at the end of a session where significant work was done:

- Feature implementation or refactoring
- Bug fixes with interesting root causes
- Design or architectural decisions
- New tooling or workflow changes

Skip for trivial sessions (typo fixes, quick config tweaks, failed attempts with no learnings).

## Steps

### 1. Gather Context

Review what was accomplished in this session:

```bash
git log --oneline -10
git diff --stat HEAD~5..HEAD
```

Also check for uncommitted work:

```bash
git status
git diff --stat
```

### 2. Read the Session Format

```
Read docs/sessions/README.md
```

### 3. Write the Session Note

Create a new file at `docs/sessions/YYYY-MM-DD-brief-description.md` using today's date.

Follow this template:

```markdown
---
date: YYYY-MM-DD
tags:
  - session
  - [relevant-tags from README.md tags reference]
project: alexrosenkranz.com
status: complete
---

# Brief Descriptive Title

**Date:** Month Day, Year
**Project:** alexrosenkranz.com

## Summary

[2-3 sentence high-level overview of what was accomplished]

## Accomplishments

- [Specific items completed with concrete details]
- [Group related items under subheadings if needed]

## Key Decisions

[Important choices made and why. Include alternatives considered.]

## Challenges & Solutions

[Problems encountered and how they were resolved. Skip if none.]

## Learnings

[Patterns, techniques, or insights worth remembering]

## Next Steps

[What to tackle in the next session]

## Resources

[Links to relevant PRs, commits, docs. Include commit SHAs.]
```

### 4. If Multiple Sessions on Same Date

If a session note already exists for today, either:

- Append to the existing file with a new section header
- Create a separate file with a more specific slug (e.g., `2026-02-04-ui-redesign.md` and `2026-02-04-personal-identity-mark.md`)

### 5. Confirm with User

Show the user the session note before writing. Ask if they want to adjust anything.

## Important

- Keep notes concise and focused on decisions and learnings, not exhaustive change lists
- Include commit SHAs and PR numbers for traceability
- Use tags from the reference list in `docs/sessions/README.md`
- This is separate from the Obsidian SessionEnd hook (which logs automatically). This command creates curated, version-controlled project documentation
- Do NOT commit the session note automatically. The user will commit when ready.
