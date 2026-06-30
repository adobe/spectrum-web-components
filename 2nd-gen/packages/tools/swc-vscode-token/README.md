# Token Intellisense

VS Code extension providing autocomplete and diagnostics for `token("...")` values sourced from `tokens.json` as provided via `@adobe/swc-tokens`.

## Features

- Partial, case‑insensitive autocomplete for `token("...")`
- True snippets for grouped typography tokens like `type-component-m-regular`
- Quote balancing and automatic trimming of trailing whitespace
- Completions resume after editing inside an existing token
- Deprecated token detection with "renamed to..." diagnostics and hover guidance
- Deleted token detection with actionable hover guidance:
  - Suggests a replacement token when one is known
  - Indicates when the value should be hardcoded as `0` (zero-pixel tokens removed without replacement)
  - Surfaces the Spectrum tokens team's removal notes when no replacement is known
- Improved unknown-token suggestions that can include renamed-token candidates
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

| Input before completion          | Completion selected | Output after completion                                                                 |
| -------------------------------- | ------------------- | --------------------------------------------------------------------------------------- |
| `color: token(│`                 | `accent-color-100`  | `color: token("accent-color-100")`                                                      |
| `color: token('│`                | `accent-color-100`  | `color: token("accent-color-100")`                                                      |
| `color: token('accent-│')`       | `accent-color-100`  | `color: token("accent-color-100")`                                                      |
| `padding: calc(1rem + token(│`   | `spacing-100`       | `padding: calc(1rem + token("spacing-100"))`                                            |
| `padding: var(--my-var, token(│` | `spacing-100`       | `padding: var(--my-var, token("spacing-100"))`                                          |
| `type-component-m-regular│`      | `Tab`               | `font-family`, `font-size`, `font-weight`, `letter-spacing`, `line-height` declarations |

<small>`|` represents cursor position</small>

Typography snippets are currently scoped to CSS-family languages and are generated from grouped typography tokens in `tokens.json`.

Example expansion:

<!-- prettier-ignore -->
```css
font-family: token("sans-serif-font-family");
font-size: token("font-size-100");
font-weight: token("regular-font-weight");
letter-spacing: token("letter-spacing");
line-height: token("line-height-font-size-100");
```

## Local extension install

To use for local development:

1. Go to the VSCode Extensions panel
2. Open the menu (three dots in the title bar)
3. Choose "Install from VSIX..."
4. Select the `.vsix` file within `2nd-gen/packages/tools/swc-vscode-token`

## Development

### Update tokens

Ensure tokens are updated to the latest by running the following command at the _root level_ of the repo:

```bash
yarn tokens:update
```

This updates the extension-relative `tokens.json` (which includes `tokens`, `renamed`, `deleted`, and `deprecatedComments` maps) and regenerates the typography snippet definitions.

When upgrading the underlying `@adobe/spectrum-tokens` package version, run the diff script in `swc-tokens` first to identify and curate deleted tokens before regenerating. See the [swc-tokens upgrade guide](../swc-tokens/README.md#upgrading-adobespectrum-tokens) for the full process.

### Deploy extension

Deploy to build and package updated VSIX file required for VSCode to load the extension.

```bash
yarn deploy
```

Post-build, will require uninstalling and re-installing the extension to see changes take effect.

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

- Completions inside `token("...")` quotes resume after editing
- Correct replacement text is applied for CSS, `calc(...)`, and `var(...)` scenarios
