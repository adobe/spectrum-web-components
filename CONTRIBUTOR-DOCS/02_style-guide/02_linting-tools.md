# Linting tools

This guide covers the linting tools used in the repository and how to work with them as a contributor.

## Overview

All linting is centralized at the repo root with a single configuration for each tool:

- **ESLint** — JavaScript/TypeScript linting with flat config (`eslint.config.js`)
- **Stylelint** — CSS linting (`.stylelintrc.json`)
- **Prettier** — Code formatting (`.prettierrc.yaml`)

Pre-commit hooks via `lint-staged` run linting and formatting on staged files automatically.

## Tools and configuration

### Tooling inventory

| Tool      | Config location     | Notes                              |
| --------- | ------------------- | ---------------------------------- |
| ESLint    | `eslint.config.js`  | Flat config at root                |
| Stylelint | `.stylelintrc.json` | With custom `swc/header` plugin    |
| Prettier  | `.prettierrc.yaml`  | Separate formatter (not in ESLint) |

### ESLint plugins

| Plugin                             | Purpose                         |
| ---------------------------------- | ------------------------------- |
| `@typescript-eslint/eslint-plugin` | TypeScript rules                |
| `eslint-plugin-lit`                | Lit-specific linting            |
| `eslint-plugin-lit-a11y`           | Accessibility for Lit templates |
| `eslint-plugin-wc`                 | Web Component best practices    |
| `eslint-plugin-jsdoc`              | JSDoc consistency               |
| `eslint-plugin-import`             | Import validation               |
| `eslint-plugin-simple-import-sort` | Import sorting                  |
| `eslint-plugin-mdx`                | Markdown and MDX linting        |
| `eslint-plugin-jsonc`              | JSON file linting               |
| `eslint-plugin-notice`             | Header comment enforcement      |
| `eslint-plugin-storybook`          | Storybook best practices        |

### Stylelint plugins

| Plugin                                             | Purpose                                 |
| -------------------------------------------------- | --------------------------------------- |
| `stylelint-config-standard`                        | Baseline CSS rules                      |
| `stylelint-order`                                  | Alphabetical property ordering          |
| `stylelint-declaration-strict-value`               | Design token enforcement (2nd-gen only) |
| `@spectrum-web-components/stylelint-header-plugin` | Custom header comment rule              |

## Running linters

### From the command line

```bash
# Lint JavaScript/TypeScript
yarn lint

# Lint with autofix
yarn lint --fix

# Lint specific files
yarn eslint path/to/file.ts

# Lint CSS
yarn stylelint "**/*.css"

# Lint CSS with autofix
yarn stylelint "**/*.css" --fix

# Format with Prettier
yarn prettier --write .

# Check formatting without changes
yarn prettier --check .
```

### Pre-commit hooks

Linting runs automatically on staged files when you commit via `lint-staged`. The pre-commit hook runs:

- **CSS files**: Stylelint with autofix, then Prettier
- **TypeScript files**: ESLint with autofix, then Prettier
- **Other files**: Prettier only

If the pre-commit hook fails, fix the reported issues and commit again.

## IDE setup

### VS Code / Cursor

Install these extensions:

- **ESLint** (`dbaeumer.vscode-eslint`)
- **Stylelint** (`stylelint.vscode-stylelint`)
- **Prettier** (`esbenp.prettier-vscode`)

The workspace settings in `.vscode/settings.json` are configured to:

- Use Prettier as the default formatter
- Run ESLint and Stylelint on save
- Apply autofixes on save

### Troubleshooting IDE issues

If linting isn't working in your IDE:

1. **Reload the window** — `Cmd+Shift+P` → "Developer: Reload Window"
2. **Check Output panel** — Select "ESLint" or "Stylelint" from the dropdown to see errors
3. **Verify extensions are enabled** — Check the Extensions panel for any disabled extensions

## Generation-specific notes

### 2nd-gen

- Uses root `eslint.config.js` with 2nd-gen specific overrides
- Import sorting via `simple-import-sort` with custom groups
- Accessibility linting via `eslint-plugin-lit-a11y` with targeted allow-lists
- Stylelint enforces design tokens via `stylelint-declaration-strict-value`

### 1st-gen

- Uses root `eslint.config.js` with 1st-gen specific overrides for legacy patterns
- Import sorting via `simple-import-sort` (migrated from `sort-imports`)
- Accessibility linting via `eslint-plugin-lit-a11y` with allow-list for click events on specific components
- Stylelint uses root config (no token enforcement)

## Common rules and conventions

### Copyright headers

All source files must include the Adobe copyright header. This is enforced by:

- **ESLint** — `eslint-plugin-notice` for `.ts`, `.js` files
- **Stylelint** — Custom `swc/header` plugin for `.css` files

The header is automatically added when you run linting with `--fix`.

### Import sorting

Imports are automatically sorted by `eslint-plugin-simple-import-sort`. Run `yarn lint --fix` to sort imports.

Import groups are ordered as:

1. Side-effect imports (e.g., `import './styles.css'`)
2. External packages (e.g., `import { html } from 'lit'`)
3. Internal packages (e.g., `import { Button } from '@spectrum-web-components/button'`)
4. Relative imports (e.g., `import { helper } from './utils'`)

### CSS property ordering

CSS properties are sorted alphabetically by `stylelint-order`. Run `yarn stylelint --fix` to sort properties.

### Design tokens (2nd-gen only)

In 2nd-gen CSS files, use design tokens (CSS custom properties) instead of hardcoded values for:

- `color`, `background-color`, `border-color`
- `fill`, `stroke`
- `font-family`, `font-size`, `font-weight`, `line-height`

This is enforced as a warning by `stylelint-declaration-strict-value`.

## Disabling rules

### ESLint

```typescript
// Disable for a single line
// eslint-disable-next-line rule-name
const x = something();

// Disable for a block
/* eslint-disable rule-name */
// ... code ...
/* eslint-enable rule-name */
```

### Stylelint

```css
/* stylelint-disable rule-name */
.selector {
    /* ... */
}
/* stylelint-enable rule-name */

/* Disable for a single declaration */
.selector {
    property: value; /* stylelint-disable-line rule-name */
}
```

### When to disable rules

- **Prefer fixing the issue** over disabling the rule
- **Add a comment** explaining why the rule is disabled
- **Use the most specific disable** (single line > block > file)
- **Re-enable rules** as soon as possible

## Performance tips

- Use `--cache` flag for faster subsequent runs: `yarn eslint --cache .`
- Run linting only on changed files during development
- Let `lint-staged` handle pre-commit linting automatically
- Full linting runs in CI as the final gate

## Version policy

All linting packages are pinned to exact versions (no caret ranges) for security and reproducibility. Version updates are audited and tested before merging.

Current versions are listed in the root `package.json` under `devDependencies`.
