---
name: branch-naming
description: Suggests the preferred branch name format for Spectrum Web Components contributions (lowercase, dash-separated, a conventional commit type, and an optional issue number). Use when creating, renaming, or checking a git branch name.
---

# Branch naming format

Suggests the ideal branch naming format for Spectrum Web Components contributions.

## Pattern

```
^[a-z0-9]+\/(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)-[a-z0-9-]+(-swc-[0-9]+)?$
```

The types are the conventional commit types that commitlint enforces (`@commitlint/config-conventional`, extended by `commitlint.config.cjs`). `yarn lint:ai` fails if this pattern and commitlint's type list disagree.

## Message

Consider following the preferred branch naming format: `<username>/<type>-<description>[-swc-<issue>]`

Username will be automatically pulled from your git config settings.

### Guidelines

- Use lowercase letters and numbers only
- Separate words with dashes (not camelCase)
- Use a conventional commit type. Descriptions below are for quick reference:
  • **feat**: New feature
  • **fix**: Bug fix
  • **docs**: Documentation only
  • **style**: Code style/formatting
  • **refactor**: Code change that neither fixes a bug nor adds a feature
  • **perf**: Code change that improves performance
  • **test**: Adding missing tests or correcting existing tests
  • **build**: Changes that affect the build system or external dependencies
  • **ci**: Changes to CI configuration files and scripts
  • **chore**: Other changes that don't modify src or test files, dependency updates
  • **revert**: Reverts a previous commit
- Optional issue number format: `-swc-XXX`

### Good examples

- `johndoe/feat-add-new-button-swc-123`
- `janedoe/fix-dropdown-alignment`
- `alice/refactor-component-structure`
- `bob/perf-optimize-rendering`

### Avoid

- `johnDoe/feat-addNewButton` (no camelCase)
- `jane/fix-Dropdown-Bug` (no uppercase)

This is a recommended format to maintain consistency, but not required.

## Severity

warning

## Scope

git_branch
