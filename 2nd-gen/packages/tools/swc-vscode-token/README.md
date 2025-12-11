# Token Intellisense

VS Code extension providing autocomplete for `token('...')` values sourced from `tokens.json` as provided via `@adobe/swc-tokens`.

## Features

- Partial, case‑insensitive autocomplete
- Quote balancing
- Hover message for unknown tokens

Recognizes `token()` in the following file types:

- CSS
- PostCSS
- SCSS
- JavaScript

Valid completion replacements handled by the extension:

| Input before completion          | Completion selected | Output after completion                          |
| -------------------------------- | ------------------- | ------------------------------------------------ |
| `color: token(│`                 | `accent-color-100`  | `color: token('accent-color-100')`               |
| `color: token('│`                | `accent-color-100`  | `color: token('accent-color-100')`               |
| `padding: calc(1rem + token(│`   | `spacing-100`       | `padding: calc(1rem + token('spacing-small'))`   |
| `padding: var(--my-var, token(│` | `spacing-100`       | `padding: var(--my-var, token('spacing-small'))` |

<small>`|` represents cursor position</small>

## Local install

To use for local development:

1. Go to the VSCode Extensions panel
2. Open the menu (three dots in the title bar)
3. Choose "Install from VSIX..."
4. Select the `.vsix` file within `2nd-gen/packages/tools/swc-vscode-token`

## Development

### Update tokens

Ensure the base tokens package - `@adobe/swc-tokens` is the latest version, and install.

Then run `yarn tokens` to update the extension-relative `tokens.json`.

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

To change which filetypes allow triggering `token()` intellisense, modify the `activationEvents` within `package.json`.
