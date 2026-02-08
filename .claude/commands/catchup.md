# Catch Up on Context

Read project status and recent work to restore working context. Use this at the start of a new session or after `/clear`.

## Steps

### 1. Read Project Status (Primary Context)

**Always start here first:**

```
Read STATUS.md at project root
```

This file contains:

- Current phase and what's complete
- What we just finished in the last session
- Immediate next steps
- Known issues and technical debt
- Phase 2+ backlog

### 2. Check Git Status

```bash
git status
```

### 3. Review Recent Commits (last 5)

```bash
git log --oneline -5
```

### 4. If Uncommitted Changes Exist

```bash
git diff              # Working directory changes
git diff --cached     # Staged changes
```

### 5. Check Recently Modified Files (if needed)

```bash
find src/content -mtime -1 -type f     # Content modified in last 24h
find src/components -mtime -1 -type f  # Components modified in last 24h
```

### 6. Summarize for User

Based on STATUS.md and git status:

- **Current state:** What phase/milestone we're at
- **Last session:** What was just completed
- **Next up:** Immediate priorities from STATUS.md
- **Any blockers:** Technical debt or issues to address

### 7. Ask Focus Question

"Based on STATUS.md, the immediate next steps are [X, Y, Z]. Which would you like to tackle first?"

## Notes

- **STATUS.md is the source of truth** for project state
- Detailed session history lives in `docs/sessions/` (version controlled)
- This command helps you pick up exactly where the last session left off
- Update STATUS.md at the end of each session to keep it current
