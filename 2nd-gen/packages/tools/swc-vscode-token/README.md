# Token Intellisense

VS Code extension providing autocomplete and diagnostics for `token('...')` values sourced from `tokens.json` as provided via `@adobe/swc-tokens`.

## Features

- Partial, case‑insensitive autocomplete for `token('...')`
- Quote balancing and automatic trimming of trailing whitespace
- Completions resume after editing inside an existing token
- Hover message for unknown tokens with suggestions
- Diagnostic messages as displayed on hover and in "Problems"

### Supported file types/languages

Recognizes `token()` in the following file/language types:

- CSS
- PostCSS
- SCSS
- JavaScript
- TypeScript

### Completion examples

Valid completion replacements handled by the extension:

| Input before completion          | Completion selected | Output after completion                        |
| -------------------------------- | ------------------- | ---------------------------------------------- |
| `color: token(│`                 | `accent-color-100`  | `color: token('accent-color-100')`             |
| `color: token('│`                | `accent-color-100`  | `color: token('accent-color-100')`             |
| `color: token('accent-│')`       | `accent-color-100`  | `color: token('accent-color-100')`             |
| `padding: calc(1rem + token(│`   | `spacing-100`       | `padding: calc(1rem + token('spacing-100'))`   |
| `padding: var(--my-var, token(│` | `spacing-100`       | `padding: var(--my-var, token('spacing-100'))` |

<small>`|` represents cursor position</small>

## Local extension install

To use for local development:

1. Go to the VSCode Extensions panel
2. Open the menu (three dots in the title bar)
3. Choose "Install from VSIX..."
4. Select the `.vsix` file within `2nd-gen/packages/tools/swc-vscode-token`

## Development

### Update tokens

Ensure the base tokens package - `@adobe/swc-tokens` is the latest version, and install.

THen update the extension-relative `tokens.json`.

```bash
yarn tokens
```

### Deploy extension

Deploy to build and package updated VSIX file required for VSCode to load the extension.

```bash
yarn deploy
```

Post-build, will require uninstalling and re-installing the extension to see changes take affect.

### Updating extension logic

Core extension logic is located in `src/server/server.ts`.

Review VSCode extension docs as needed.

### Changing recognized file types

To change which filetypes allow triggering `token()` intellisense, modify the `activationEvents` within `package.json` as well as the `documentSelector` within `extension.ts`.

### Running tests

This project uses [Vitest](https://vitest.dev/guide/) for both unit and integration tests.

```bash
yarn test
yarn test:watch
```

Test files are located under `src/server/tests`.

**Unit tests** test utility functions (e.g., token parsing, custom var detection)

**Integration tests** simulate a TextDocument with cursor positions, ensuring:

- Completions inside `token('...')` quotes resume after editing
- Correct replacement text is applied for CSS, `calc(...)`, and `var(...)` scenarios
