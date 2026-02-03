---
date: 2026-02-02
tags: [claude-code, agents, git, automation, tooling]
project: alexrosenkranz.com
status: complete
---

# Git Guardian Agent Implementation

## Overview

Created a custom Claude Code agent (`git-guardian`) that proactively enforces git and GitHub best practices during development work. This agent validates commit messages, guides branching decisions, assists with PR creation, and critically enforces the "no AI attribution" policy.

## What Was Built

### Primary Agent: `git-guardian`

**Location:** `.claude/agents/git-guardian.md`

**Capabilities:**

- Pre-commit validation workflow
- Branching decision matrix (15-minute rule)
- PR creation guidance with templates
- Post-commit compliance review
- Critical AI attribution blocking

**Tools:** Read, Grep, Glob, Bash(git _), Bash(gh _)
**Model:** Sonnet (needs reasoning for branching decisions)

### Supporting Commands

1. **`/commit-check`** - Quick pre-commit validation
   - Validates conventional commit format
   - Checks for AI attribution
   - Provides branching recommendation

2. **`/pr-ready`** - Comprehensive PR readiness check
   - Reviews all commits in branch
   - Validates conventions across all commits
   - Suggests PR title and body
   - Provides ready-to-run `gh pr create` command

3. **`/branch-decide`** - Interactive branching decision helper
   - Applies decision matrix from git-processes.md
   - Recommends main vs. feature branch with reasoning

## Key Features

### Conventional Commits Validation

Enforces `type(scope): subject` format with:

- Valid types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
- Valid scopes: posts, articles, digests, spotify, datadog, theme, layout, deps, config, ci, docs, session
- Subject rules: imperative mood, lowercase, no period, <72 chars

### AI Attribution Blocking (Critical)

**Hard blocks** any commits containing:

- "Co-Authored-By: Claude"
- "Co-Authored-By: GitHub Copilot"
- Any AI tool attribution in commit messages

This is non-negotiable and enforced at multiple checkpoints:

- Pre-commit validation
- PR creation review
- Post-commit compliance checks

### Branching Decision Matrix

Applies systematic decision-making:

1. Session notes → Always main
2. Time > 15 min → Feature branch
3. Multiple unrelated files → Feature branch
4. Breaking changes / new patterns → Feature branch
5. When in doubt → Feature branch (safer)
6. Otherwise → Main

### PR Workflow Automation

Provides complete PR templates:

- Title suggestions (<70 chars, conventional format)
- Body with Summary and Test Plan sections
- Ready-to-run `gh pr create` commands with heredoc body
- Reminds about preview deployment and CI checks

## Integration Points

### Works With Existing Tools

**Complementary to `/pre-commit-review`:**

- `/pre-commit-review`: Code quality (console.logs, TODOs, hardcoded values)
- `/commit-check`: Git conventions (commit format, attribution, branching)

**Recommended workflow:**

```bash
1. Make changes
2. git add [files]
3. /pre-commit-review  # Code quality
4. /commit-check       # Git conventions
5. git commit -m "type(scope): subject"
```

### No Permission Changes Needed

All required permissions already existed in `settings.json` and `settings.local.json`:

- `Bash(git *)` - All git commands
- `Bash(gh *)` - GitHub CLI
- Read, Grep, Glob - File inspection

## Implementation Highlights

### Meta-Validation

The git-guardian agent validated its own creation during the first test run:

- Analyzed 5 staged files (727 lines)
- Validated commit message: `feat(ci): add git-guardian agent for commit validation`
- Recommended direct to main (complete implementation, low risk)
- ✓ No AI attribution detected
- ✓ Conventional Commits format validated

### Agent Structure

The agent file includes:

- 4 comprehensive workflows
- Critical rules section (AI attribution front and center)
- Common patterns with good/bad examples
- Decision examples for different scenarios
- Integration guidelines with existing tools
- Clear output guidelines for consistency

### Documentation Updates

Updated `CLAUDE.md` with new section documenting:

- What the git-guardian agent does
- When to use each command
- How it integrates with existing workflows
- Recommended usage patterns

## Testing Strategy

Outlined 7 test scenarios in the implementation plan:

1. Valid conventional commit validation
2. Invalid format detection
3. AI attribution blocking (critical test)
4. Branching decision - simple change
5. Branching decision - complex feature
6. PR readiness check
7. Integration with existing commands

## What's Next

The git-guardian agent is now active and ready to use:

- Try `/commit-check` before your next commit
- Use `/pr-ready` when creating feature branch PRs
- Use `/branch-decide` when unsure about branching strategy

The agent will help maintain consistent git practices and catch common issues like:

- Incorrectly formatted commit messages
- AI attribution in commits (hard blocked)
- Inappropriate branching decisions
- Missing PR documentation

## Learnings

1. **Meta-implementation**: Building an agent that validates git practices by having it validate itself during creation was a satisfying recursive test case.

2. **Read-only agents**: The git-guardian is intentionally read-only (no Write/Edit tools). It guides and validates but doesn't auto-commit or modify files. This preserves user agency while providing expert guidance.

3. **Critical enforcement points**: AI attribution blocking is implemented at multiple checkpoints to ensure it's caught before becoming a problem.

4. **Integration over replacement**: The agent works alongside existing tools (pre-commit-review) rather than replacing them. Each has a specific focus area.

5. **Decision frameworks**: Systematic decision matrices (like the branching strategy) provide consistent, explainable recommendations rather than arbitrary guidance.

## Files Changed

```
.claude/agents/git-guardian.md         (463 lines) - Main agent
.claude/commands/commit-check.md       (53 lines)  - Validation command
.claude/commands/pr-ready.md           (76 lines)  - PR readiness
.claude/commands/branch-decide.md      (62 lines)  - Branching helper
CLAUDE.md                              (38 lines)  - Documentation
```

**Commit:** `feat(ci): add git-guardian agent for commit validation` (b96b3e5)
