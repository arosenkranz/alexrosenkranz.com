# Pre-commit Review

Review all uncommitted changes before committing. Check for issues that linters won't catch.

## Steps

1. Get the list of changed files:
   ```bash
   git status --porcelain
   ```

2. For each changed file, review for:

### Code Quality
- Hardcoded values that should be constants or env vars
- TODO/FIXME comments that shouldn't be committed
- Console.log statements left in
- Commented-out code blocks
- Overly complex functions that should be split

### TypeScript Specific
- Any `any` types that could be more specific
- Missing error handling in async functions
- Unused imports or variables

### Content (Markdown)
- Spelling/grammar issues in titles and descriptions
- Missing required frontmatter fields
- Invalid tag names
- Broken relative links

### Security
- Secrets or API keys accidentally included
- Sensitive data in comments

3. Summarize findings:
   - Critical issues (must fix before commit)
   - Warnings (should consider fixing)
   - Suggestions (nice to have)

4. If no issues found, confirm ready to commit.

## Notes

This is a sanity check, not a replacement for the linter. Focus on issues that automated tools miss.
