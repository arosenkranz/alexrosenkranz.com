# Catch Up on Context

Read all uncommitted changes and recent work into the conversation context. Use this after `/clear` to restore working context.

## Steps

1. Show current git status:
   ```bash
   git status
   ```

2. If there are uncommitted changes, read the diffs:
   ```bash
   git diff
   git diff --cached
   ```

3. Show recent commits (last 5):
   ```bash
   git log --oneline -5
   ```

4. Read any recently modified files in key directories:
   ```bash
   find src/content -mtime -1 -type f
   find src/components -mtime -1 -type f
   ```

5. Summarize:
   - What files have been changed
   - What the changes appear to be doing
   - Any work in progress that seems incomplete

6. Ask if there's a specific area to focus on.

## Notes

This command is useful after clearing context to avoid losing track of work in progress. It's also helpful at the start of a new session to quickly understand the current state.
