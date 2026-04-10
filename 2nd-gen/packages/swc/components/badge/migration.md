# Badge migration guide: `sp-badge` → `swc-badge`

This guide covers everything you need to move from the 1st-gen `sp-badge` component
(`@spectrum-web-components/badge`) to the 2nd-gen `swc-badge` component
(`@adobe/spectrum-wc/badge`).

---

## Installation

Remove the 1st-gen package and add the 2nd-gen equivalent:

```bash
# Remove
yarn remove @spectrum-web-components/badge

# Add
yarn add @adobe/spectrum-wc
```

Update your imports:

```ts
// Before
import '@spectrum-web-components/badge/sp-badge.js';

// After
import '@adobe/spectrum-wc/badge';
```

> **Note:** `@adobe/spectrum-wc` is a monolithic package — installing it makes all
> components available. Importing via a subpath (e.g. `@adobe/spectrum-wc/badge`)
> routes to that component's dedicated bundle, so only that module is loaded rather
> than the entire package.

---

## Quick reference

| What changed          | Before (1st-gen)                                         | After (2nd-gen)                                                      |
| --------------------- | -------------------------------------------------------- | -------------------------------------------------------------------- |
| Tag name              | `sp-badge`                                               | `swc-badge`                                                          |
| Package               | `@spectrum-web-components/badge`                         | `@adobe/spectrum-wc`                                                 |
| `variant` attribute   | 14 color variants                                        | 19 color variants — 5 new colors added                               |
| `size` attribute      | `s \| m \| l \| xl`                                      | `s \| m \| l \| xl` — unchanged                                      |
| `fixed` attribute     | `block-start \| block-end \| inline-start \| inline-end` | `block-start \| block-end \| inline-start \| inline-end` — unchanged |
| `subtle` attribute    | Not supported                                            | New — reduces visual prominence                                      |
| `outline` attribute   | Not supported                                            | New — bordered appearance (semantic variants only)                   |
| CSS custom properties | `--mod-badge-*`                                          | `--swc-badge-*`                                                      |
| Slots                 | `default` (label), `icon`                                | `default` (label), `icon` — unchanged                                |

---

## Breaking changes

### Tag name

Find and replace all instances of `sp-badge` with `swc-badge` in your templates and HTML.

```html
<!-- Before -->
<sp-badge variant="positive">Approved</sp-badge>

<!-- After -->
<swc-badge variant="positive">Approved</swc-badge>
```

---

### CSS custom properties

All `--mod-badge-*` custom properties have been renamed to `--swc-badge-*`. Update any
overrides in your stylesheets:

| Removed (1st-gen)                           | Replacement (2nd-gen)          |
| ------------------------------------------- | ------------------------------ |
| `--mod-badge-height`                        | `--swc-badge-height`           |
| `--mod-badge-corner-radius`                 | `--swc-badge-corner-radius`    |
| `--mod-badge-label-icon-color`              | `--swc-badge-label-icon-color` |
| `--mod-badge-font-size`                     | `--swc-badge-font-size`        |
| `--mod-badge-line-height`                   | `--swc-badge-line-height`      |
| `--mod-badge-workflow-icon-size`            | `--swc-badge-icon-size`        |
| `--mod-badge-label-spacing-vertical-top`    | `--swc-badge-padding-block`    |
| `--mod-badge-label-spacing-vertical-bottom` | `--swc-badge-padding-block`    |
| `--mod-badge-label-spacing-horizontal`      | `--swc-badge-padding-inline`   |
| `--mod-badge-icon-text-spacing`             | `--swc-badge-gap`              |

```css
/* Before */
sp-badge {
  --mod-badge-height: 24px;
  --mod-badge-corner-radius: 4px;
}

/* After */
swc-badge {
  --swc-badge-height: 24px;
  --swc-badge-corner-radius: 4px;
}
```

---

## New in 2nd-gen

### `subtle` attribute

A new `subtle` boolean attribute reduces the visual prominence of the badge by using a
softer background. It is available on all variants — both semantic and color.

```html
<swc-badge variant="positive" subtle>Approved</swc-badge>
<swc-badge variant="indigo" subtle>Label</swc-badge>
```

---

### `outline` attribute

A new `outline` boolean attribute renders the badge with a bordered appearance and a
semi-transparent background. It is available on semantic variants only (`accent`,
`informative`, `neutral`, `positive`, `notice`, `negative`).

```html
<swc-badge variant="positive" outline>Approved</swc-badge>
```

---

### New color variants

Five new color variants have been added to match the Spectrum 2 specification:

| New variant | Example                                            |
| ----------- | -------------------------------------------------- |
| `pink`      | `<swc-badge variant="pink">Label</swc-badge>`      |
| `turquoise` | `<swc-badge variant="turquoise">Label</swc-badge>` |
| `brown`     | `<swc-badge variant="brown">Label</swc-badge>`     |
| `cinnamon`  | `<swc-badge variant="cinnamon">Label</swc-badge>`  |
| `silver`    | `<swc-badge variant="silver">Label</swc-badge>`    |

All 14 original color variants remain available and are unchanged.

---

## Accessibility

- `swc-badge` is a non-interactive, presentational component. It does not emit events
  and is not focusable.
- Ensure the badge label text is meaningful in context. Do not rely on color alone to
  convey status — always pair color variants with a descriptive text label.
- When placing a badge alongside an icon in the `icon` slot, ensure the icon is
  decorative (hidden from assistive technology) if the text label already conveys
  the full meaning.
