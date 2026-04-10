# Asset migration guide: `sp-asset` → `swc-asset`

This guide covers everything you need to move from the 1st-gen `sp-asset` component
(`@spectrum-web-components/asset`) to the 2nd-gen `swc-asset` component
(`@adobe/spectrum-wc/asset`).

---

## Installation

Remove the 1st-gen package and add the 2nd-gen equivalent:

```bash
# Remove
yarn remove @spectrum-web-components/asset

# Add
yarn add @adobe/spectrum-wc
```

Update your imports:

```ts
// Before
import '@spectrum-web-components/asset/sp-asset.js';

// After
import '@adobe/spectrum-wc/asset';
```

> **Note:** `@adobe/spectrum-wc` is a monolithic package — installing it makes all
> components available. Importing via a subpath (e.g. `@adobe/spectrum-wc/asset`)
> routes to that component's dedicated bundle, so only that module is loaded rather
> than the entire package.

---

## Quick reference

| What changed          | Before (1st-gen)                            | After (2nd-gen)                                                                        |
| --------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------- |
| Tag name              | `sp-asset`                                  | `swc-asset`                                                                            |
| Package               | `@spectrum-web-components/asset`            | `@adobe/spectrum-wc`                                                                   |
| `variant` attribute   | `'file' \| 'folder'`                        | `'file' \| 'folder'` — unchanged                                                       |
| `label` attribute     | `label="…"`                                 | `label="…"` — unchanged                                                                |
| CSS custom properties | `--mod-asset-*`                             | Not directly exposed — see [CSS custom properties](#css-custom-properties)             |
| Shadow DOM classes    | `.file`, `.folder`, `.fileBackground`, etc. | `.swc-Asset-file`, `.swc-Asset-folder`, etc. — see [Shadow DOM](#shadow-dom-structure) |
| Dark mode             | Manual via color overrides                  | Automatic via `light-dark()`                                                           |

---

## Breaking changes

### Tag name

Find and replace all instances of `sp-asset` with `swc-asset` in your templates and HTML.

```html
<!-- Before -->
<sp-asset variant="file" label="Report.pdf"></sp-asset>
<sp-asset variant="folder" label="Projects"></sp-asset>

<!-- After -->
<swc-asset variant="file" label="Report.pdf"></swc-asset>
<swc-asset variant="folder" label="Projects"></swc-asset>
```

---

### CSS custom properties

The `--mod-asset-*` custom properties from 1st-gen have been removed. The 2nd-gen component
uses a token-based design system and does not expose direct CSS custom properties for
overriding colors or dimensions.

| Removed (1st-gen)                     | Replacement (2nd-gen)                              |
| ------------------------------------- | -------------------------------------------------- |
| `--mod-asset-folder-background-color` | No direct equivalent — color set via design tokens |
| `--mod-asset-file-background-color`   | No direct equivalent — color set via design tokens |
| `--mod-asset-icon-outline-color`      | No direct equivalent — color set via design tokens |
| `--mod-asset-icon-min-width`          | No direct equivalent                               |
| `--mod-asset-icon-max-width`          | No direct equivalent                               |
| `--mod-asset-icon-margin`             | No direct equivalent                               |

The 2nd-gen component derives its colors from Spectrum 2 design tokens (e.g.,
`gray-200`, `gray-25`, `gray-500`). These resolve automatically based on the active
theme and color scheme — no manual override is needed for standard light/dark mode
support. If you need to override asset colors beyond what the theme provides, use a
wrapping element with custom CSS properties and consult the Spectrum 2 token
documentation for the token names in use. `swc-asset` does not expose `::part()`
selectors.

---

### Shadow DOM structure

The internal shadow DOM structure has changed. The 2nd-gen component wraps all content in
a `.swc-Asset` container div and uses namespaced BEM-style class names on all internal
SVG elements to avoid naming collisions.

If you were targeting internal shadow DOM classes directly — which is not a supported API
and may have broken without warning even in 1st-gen — update your selectors:

| 1st-gen class       | 2nd-gen class                 |
| ------------------- | ----------------------------- |
| `.file`             | `.swc-Asset-file`             |
| `.fileBackground`   | `.swc-Asset-fileBackground`   |
| `.fileOutline`      | `.swc-Asset-fileOutline`      |
| `.folder`           | `.swc-Asset-folder`           |
| `.folderBackground` | `.swc-Asset-folderBackground` |
| `.folderOutline`    | `.swc-Asset-folderOutline`    |

> **Note:** Internal shadow DOM classes are not a public API. Prefer CSS custom properties
> and design tokens for all theming. Internal class names may change without notice.

---

## New in 2nd-gen

### Automatic dark mode

The 2nd-gen component uses the CSS `light-dark()` function to automatically adapt colors
to the user's or application's color scheme. Manual color overrides via `--mod-*`
properties are no longer required for dark mode support.

---

## Accessibility

- Always provide a meaningful `label` when using `variant="file"` or `variant="folder"`.
  The label is applied to the SVG as an accessible name via `aria-label`.
- When used without a `variant`, `swc-asset` renders a default slot. Ensure slotted
  content carries its own accessible name if it conveys meaning.
- `swc-asset` is a non-interactive, presentational component. It does not manage focus
  and does not emit events.
