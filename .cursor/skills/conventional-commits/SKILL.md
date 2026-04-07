---
name: conventional-commit
description: Create conventional commit messages following best conventions. Use when committing code changes, writing commit messages, or formatting git history. Follows conventional commits specification.
license: MIT
metadata:
  version: '1.0.0'
---

# Conventional Commit Messages

Follow these conventions when creating commits.

## Prerequisites

Before committing, ensure you're working on a feature branch, not the main branch.

```bash
# Check current branch
git branch --show-current
```

If you're on `main` or `master`, create a new branch first:

```bash
# Create and switch to a new branch
git checkout -b <type>/<short-description>
```

Branch naming should follow the pattern: `<type>/<short-description>` where type matches the commit type (e.g., `feat/add-user-auth`, `fix/null-pointer-error`, `refactor/extract-validation`).

## Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

The header is required. Scope is optional. All lines must stay under 100 characters.

## Commit Types

Use the types defined in `.cursor/config.json` under `git.types`.

| Type       | Purpose                                       |
| ---------- | --------------------------------------------- |
| `build`    | Build system or CI changes                    |
| `chore`    | Routine maintenance tasks, dependency updates |
| `ci`       | Continuous integration configuration          |
| `docs`     | Documentation changes                         |
| `feat`     | New feature                                   |
| `fix`      | Bug fix                                       |
| `perf`     | Performance improvement                       |
| `refactor` | Code refactoring (no behavior change)         |
| `revert`   | Revert a previous commit                      |
| `style`    | Code style and formatting                     |
| `test`     | Tests added, updated or improved              |

Source list: `.cursor/config.json` → `git.types`.

## Subject Line Rules

- Use imperative, present tense: "add feature" not "added feature"
- Start with a lowercase letter — commitlint enforces this (`subject-case` rule forbids sentence-case, start-case, pascal-case, and upper-case)
- No period or white space at the end
- Maximum 70 characters

## Body Guidelines

- Explain **why** decisions were made, not how or what
- Use imperative mood and present tense
- Include motivation for the change
- Contrast with previous behavior when relevant
- Use a bullet point for each distinct concept or reason — this also handles line length naturally
- If a bullet's text exceeds 80 characters, continue on the next line flush with the
  bullet text (no indentation)

## Conventional Commits

The commit contains the following structural elements, to communicate intent to the consumers of your library:

- fix: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in Semantic Versioning).
- feat: a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in Semantic Versioning).
- BREAKING CHANGE: a commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking API change (correlating with MAJOR in Semantic Versioning). A BREAKING CHANGE can be part of commits of any type.
- types other than fix: and feat: are allowed, for example @commitlint/config-conventional (based on the Angular convention) recommends build:, chore:, ci:, docs:, style:, refactor:, perf:, test:, and others.
- footers other than BREAKING CHANGE: <description> may be provided and follow a convention similar to git trailer format.

## Examples

### Simple fix (with line wrapping)

```
fix(api): handle null response in user endpoint

- the user API could return null for deleted accounts, causing a crash
in the dashboard
- add a null check before accessing user properties to prevent the
unhandled exception
```

### Feature with scope (with bullet points)

```
feat(alerts): add Slack thread replies for alert updates

- post a reply to the original Slack thread when an alert is updated
or resolved instead of creating a new message
- keeps related notifications grouped together for easier scanning
- reduces noise in high-volume alert channels
```

### Refactor

```
refactor: extract common validation logic to shared module

Move duplicate validation code from three endpoints into a shared
validator class. No behavior change.
```

### Breaking change

```
feat(api)!: remove deprecated v1 endpoints

Remove all v1 API endpoints that were deprecated in version 23.1.
Clients should migrate to v2 endpoints.

BREAKING CHANGE: v1 endpoints no longer available
```

## Revert Format

```
revert: feat(api): add new endpoint

This reverts commit abc123def456.

Reason: Caused performance regression in production.
```

## Principles

- Each commit should be a single, stable change
- Commits should be independently reviewable
- The repository should be in a working state after each commit

## References

- [Conventional Commits Specification](https://www.conventionalcommits.org/en/v1.0.0/#specification)
