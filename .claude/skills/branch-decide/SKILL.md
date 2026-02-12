---
name: branch-decide
description: Decide whether to commit to main or create a feature branch using the 15-minute rule and decision matrix. Use before starting work on a change.
allowed-tools: Read, Bash(git *)
---

# Branch Decision Helper

Interactive helper to decide: commit to main or create feature branch?

## Steps

1. **Describe your planned changes**
   - What are you changing?
   - How many files involved?
   - Estimated time to complete?

2. **Invoke git-guardian agent** for decision support

3. The agent will apply decision matrix:
   - Session notes → Always main
   - Time > 15 min → Feature branch
   - Multiple unrelated files → Feature branch
   - Breaking changes → Feature branch
   - Otherwise → Main

4. **Follow agent's recommendation**

5. **If feature branch:**

   ```bash
   git checkout -b type/short-description
   # Make changes
   git add [files]
   git commit -m "type(scope): subject"
   git push -u origin type/short-description
   # Then use pr-ready skill when done
   ```

6. **If main:**
   ```bash
   # Make changes
   git add [files]
   git commit -m "type(scope): subject"
   git push origin main
   ```

## Decision Factors

The agent considers:

- **Time estimate**: > 15 min suggests feature branch
- **File scope**: Multiple unrelated files → feature branch
- **Risk level**: Breaking changes → feature branch
- **Type of work**: Session notes always main
- **Uncertainty**: When in doubt → feature branch

## Examples

**Scenario 1: Typo fix**
→ Recommendation: Main
→ Quick, low-risk, single file

**Scenario 2: New feature**
→ Recommendation: Feature branch
→ Multiple files, >15 min, medium risk

**Scenario 3: Session note**
→ Recommendation: Main (always)
→ Documentation only, no PR needed
