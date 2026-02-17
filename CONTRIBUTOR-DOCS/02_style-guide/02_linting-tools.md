# Linting tools

This guide covers the linting tools used in the repository and how to work with them as a contributor.

## Overview

All linting is centralized at the repo root with a single configuration for each tool:

- **ESLint** — JavaScript/TypeScript linting with flat config (`eslint.config.js`)
- **Stylelint** — CSS linting (`stylelint.config.js`)
- **Prettier** — Code formatting (`.prettierrc.yaml`)

Pre-commit hooks via `lint-staged` run linting and formatting on staged files automatically.

## Tools and configuration

### Tooling inventory

| Tool      | Config location     | Notes                              |
| --------- | ------------------- | ---------------------------------- |
| ESLint    | `eslint.config.js`  | Flat config at root                |
| Stylelint | `stylelint.config.js` | With custom `swc/header` plugin    |
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
| `stylelint-order`                                  | Logical order property ordering          |
| `stylelint-declaration-strict-value`               | Design token enforcement (2nd-gen only) |
| `@spectrum-web-components/stylelint-header-plugin` | Custom header comment rule              |

## Running linters

### Available commands

| Command             | Description                        |
| ------------------- | ---------------------------------- |
| `yarn lint`         | Check all (ESLint, Stylelint, Prettier) |
| `yarn lint:eslint`  | Check JavaScript/TypeScript only   |
| `yarn lint:styles`  | Check CSS only                     |
| `yarn lint:prettier`| Check formatting only              |
| `yarn format`       | Fix all (ESLint, Stylelint, Prettier)   |
| `yarn format:eslint`| Fix JavaScript/TypeScript only     |
| `yarn format:styles`| Fix CSS only                       |
| `yarn format:prettier`| Fix formatting only              |

### From the command line

```bash
# Check all files (runs sequentially)
yarn lint

# Fix all files (runs sequentially)
yarn format

# Check specific tool only
yarn lint:eslint
yarn lint:styles
yarn lint:prettier

# Fix with specific tool only
yarn format:eslint
yarn format:styles
yarn format:prettier

# Lint specific files directly
yarn eslint path/to/file.ts
yarn stylelint "path/to/*.css"
yarn prettier --check path/to/file.ts
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

The header is automatically added when you run `yarn format`.

### Import sorting

Imports are automatically sorted by `eslint-plugin-simple-import-sort`. Run `yarn format:eslint` to sort imports.

Import groups are ordered as:

1. Side-effect imports (e.g., `import './styles.css'`)
2. External packages (e.g., `import { html } from 'lit'`)
3. Internal packages (e.g., `import { Button } from '@spectrum-web-components/button'`)
4. Relative imports (e.g., `import { helper } from './utils'`)

### CSS property ordering

CSS properties are sorted in a custom logical order by `stylelint-order`, defined in [`stylelint-property-order.js`](../../linters/stylelint-property-order.js). Run `yarn format:styles` to sort properties.

### Design tokens (2nd-gen only)

In 2nd-gen CSS files, use design tokens (CSS custom properties) instead of hardcoded values for:

- `color`, `background-color`, `border-color`
- `fill`, `stroke`
- `font-family`, `font-size`, `font-weight`, `line-height`

This is enforced as a warning by `stylelint-declaration-strict-value`.

### Accessibility (lit-a11y)

The `eslint-plugin-lit-a11y` plugin enforces accessibility best practices in Lit templates. Some rules have allow-lists for components that handle accessibility internally.

#### Click events allow-list

The `lit-a11y/click-events-have-key-events` rule requires keyboard event handlers alongside click handlers. The following components are exempt because they handle keyboard events internally:

| Component          | Reason                                      |
| ------------------ | ------------------------------------------- |
| `sp-button`        | Built-in keyboard support                   |
| `sp-action-button` | Built-in keyboard support                   |
| `sp-checkbox`      | Built-in keyboard support                   |
| `sp-radio`         | Built-in keyboard support                   |
| `sp-switch`        | Built-in keyboard support                   |
| `sp-menu-item`     | Built-in keyboard support                   |
| `sp-clear-button`  | Built-in keyboard support                   |
| `sp-underlay`      | Overlay dismiss handling                    |

If you need to add a component to this list, update the `clickEventsAllowList` in `eslint.config.js`.

#### Rules disabled in tests and stories

The following lit-a11y rules are disabled in test and story files:

- `lit-a11y/no-autofocus` — Tests may need to set autofocus for testing
- `lit-a11y/tabindex-no-positive` — Tests may need positive tabindex for testing

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

- All lint commands use `--cache` by default for faster subsequent runs
- Use specific commands (`yarn lint:eslint`) instead of `yarn lint` during development
- Let `lint-staged` handle pre-commit linting automatically
- Full linting runs in CI as the final gate

## Version policy

All linting packages are pinned to exact versions (no caret ranges) for security and reproducibility. Version updates are audited and tested before merging.

Current versions are listed in the root `package.json` under `devDependencies`.
