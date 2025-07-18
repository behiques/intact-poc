# Commit Guidelines

Ensure the following before drafting and finalizing any commit:

---

## Pre‑Commit Checks

- **Run Formatting fix**
  Execute: `pnpm format`.  
  If it fails, **stop the commit** and ask for help.

- **Run lint fix**  
  Execute: `pnpm lint:fix`.  
  If it fails, **stop the commit** and ask for help.

- **Run unit tests**
  Execute: `pnpm test`.  
  If any test fails, **stop the commit**, fix the issue, or ask for help.

- **Build validation**  
  Execute: `pnpm build`.  
  If build errors occur, **stop the commit** and resolve or seek help.

---

## Format

Use the following format for commit messages (excude the Jira key if not Jira ticket exists or is explicitly mentioned):

```plain
<type>: [<jira-issue-key>]: <description>

[optional body]

[optional footer(s)]
```

---

## Type and Description

Type must be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

Include Jira Issue Key, if available. Usually, they Jira Issue Key is the same as the branch name

- Must be in uppercase format: `[ABC-123]`
- Should match the pattern: `[A-Z]+-\d+`
- Examples: `[COR-2129]`, `[API-456]`, `[BUG-789]`
- If no Jira key, ask: "What kind of change is this? (fix, feat, chore, docs…)"  
  Then use standard conventional format without the key, e.g.: `feat: add new export feature`

The description must:

- Use the imperative, present tense: "change" not "changed" nor "changes"
- Capitalize the first letter
- No dot (.) at the end
- Limit to 50 characters or less

The Body is optional, but if included, it must:

- Use the imperative, present tense: "change" not "changed" nor "changes"
- Include motivation for the change and contrast with previous behavior
- Wrap at 72 characters

The Footer is optional, but if included, it must:

- Reference issues and pull requests
- Include breaking change notes
- Use format: `BREAKING CHANGE: <description>`

---

## Examples

### Good Examples

```plain
feat: [PRJ-12345]: add user authentication endpoint

Add JWT-based authentication for user login.
Includes validation, error handling, and token generation.

Closes #123
```

```plain
fix: resolve memory leak in cache service

The cache service was not properly clearing expired entries,
causing memory usage to grow indefinitely.
```

```plain
docs: [DOC-789]: update API documentation for v2 endpoints
```

### Bad Examples

```plain
Fixed bug                           # Missing type, issue key, not imperative
FIX: [cor-123]: Fix the thing       # Wrong case for type and issue key
```

## Additional Rules

1. Keep the subject line concise and descriptive
2. If the commit addresses multiple issues, mention them in the body
3. Use the body to explain what and why, not how
4. Separate subject from body with a blank line
5. Use present tense in the imperative mood
6. Don't end the subject line with a period

---

## Final Step

- **Always run the Pre‑Commit Checks** before drafting any commit message.
- **Always follow the commit message format** as specified.
- **Always draft the commit first**, then **ask for confirmation** before finalizing it.

Following these steps ensures **consistent quality**, **traceability**, and **project hygiene**.
