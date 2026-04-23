# Color Loupe migration guide: `sp-color-loupe` → `swc-color-loupe`

This guide covers everything you need to move from the 1st-gen `sp-color-loupe`
component (`@spectrum-web-components/color-loupe`) to the 2nd-gen
`swc-color-loupe` component (`@adobe/spectrum-wc/color-loupe`).

The public JavaScript API — the `open` and `color` properties — is **unchanged**
between 1st-gen and 2nd-gen. Most migrations will only need to update the tag
name, package, and any CSS overrides.

---

## Installation

Remove the 1st-gen package and add the 2nd-gen equivalent:

```bash
# Remove
yarn remove @spectrum-web-components/color-loupe

# Add
yarn add @adobe/spectrum-wc
```

Update your imports:

```ts
// Before
import '@spectrum-web-components/color-loupe/sp-color-loupe.js';

// After
import '@adobe/spectrum-wc/color-loupe';
```

To extend the base class, import it directly from the core package:

```ts
// Before
import { ColorLoupe } from '@spectrum-web-components/color-loupe';

// After
import { ColorLoupeBase } from '@spectrum-web-components/core/components/color-loupe';
```

---

## Quick reference

| What changed           | Before (1st-gen)                       | After (2nd-gen)                                                                                |
| ---------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Tag name               | `sp-color-loupe`                       | `swc-color-loupe`                                                                              |
| Package                | `@spectrum-web-components/color-loupe` | `@adobe/spectrum-wc`                                                                           |
| `open` property        | `open` (boolean, reflected)            | `open` (boolean, reflected) — unchanged                                                        |
| `color` property       | `color` (string)                       | `color` (string) — unchanged                                                                   |
| Default color          | `rgba(255, 0, 0, 0.5)`                 | `rgba(255, 0, 0, 0.5)` — unchanged                                                             |
| Picked-color CSS var   | `--spectrum-picked-color`              | `--swc-color-loupe-picked-color` — see [Picked-color CSS variable](#picked-color-css-variable) |
| Consumer CSS overrides | `--mod-colorloupe-*`                   | Removed — see [CSS custom properties](#css-custom-properties)                                  |
| Shadow DOM structure   | Divs + inline SVG                      | Restructured — see [Shadow DOM structure](#shadow-dom-structure)                               |

---

## Breaking changes

### Tag name

Find and replace all instances of `sp-color-loupe` with `swc-color-loupe` in
your templates and HTML.

```html
<!-- Before -->
<sp-color-loupe open color="rgba(0, 128, 255, 0.7)"></sp-color-loupe>

<!-- After -->
<swc-color-loupe open color="rgba(0, 128, 255, 0.7)"></swc-color-loupe>
```

The `open` and `color` properties work identically in both generations. No
API code changes are required.

---

### Picked-color CSS variable

In 1st-gen, the picked color was set internally via the `--spectrum-picked-color`
custom property on the SVG element. In 2nd-gen, the equivalent hook is
`--swc-color-loupe-picked-color`, set via the template on the color-fill layer
and consumed by the stylesheet.

For most consumers this is **not a required change** — the `color` attribute is
still the public API for setting the picked color. But if you were setting
`--spectrum-picked-color` directly (for example via an external stylesheet or
inline style on a parent), switch to the new name:

```css
/* Before */
sp-color-loupe {
  --spectrum-picked-color: rgba(0, 128, 255, 0.7);
}

/* After */
swc-color-loupe {
  --swc-color-loupe-picked-color: rgba(0, 128, 255, 0.7);
}
```

Both `background: var(...)` and `background: ${color}` paths hand the same
string to the browser's CSS parser, so the set of accepted color formats is
unchanged between generations (hex, rgb/rgba, hsl/hsla, hwb, lab/lch,
oklab/oklch, and named colors).

---

### CSS custom properties

All `--mod-colorloupe-*` override hooks have been removed. 2nd-gen
intentionally keeps the CSS customization surface small — see the
[component custom property exposure guideline](../../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
— so the only supported CSS-level customization on `swc-color-loupe` is the
picked color.

| Removed (1st-gen)                              | Replacement (2nd-gen)                           |
| ---------------------------------------------- | ----------------------------------------------- |
| `--mod-colorloupe-offset`                      | None — use the parent color-picker's layout     |
| `--mod-colorloupe-drop-shadow-x`               | None                                            |
| `--mod-colorloupe-drop-shadow-y`               | None                                            |
| `--mod-colorloupe-drop-shadow-blur`            | None                                            |
| `--mod-colorloupe-drop-shadow-color`           | None                                            |
| `--mod-colorloupe-animation-distance`          | None                                            |
| `--mod-colorloupe-inner-border-color`          | None                                            |
| `--mod-colorloupe-inner-border-width`          | None                                            |
| `--mod-colorloupe-outer-border-color`          | None                                            |
| `--mod-colorloupe-outer-border-width`          | None                                            |
| `--highcontrast-colorloupe-outer-border-color` | None — handled internally in forced-colors mode |

**Before (1st-gen):** you could override appearance with `--mod-colorloupe-*` hooks, for
example border width:

```css
sp-color-loupe {
  --mod-colorloupe-inner-border-width: 2px;
}
```

**After (2nd-gen):** there is no public `--swc-*` replacement for that border hook (or
the other `None` rows in the table). The HTML below is a **different** concern: it is
the supported way to set the **picked color**. Use the `color` attribute (or the
`color` property in JavaScript) instead of relying on host-level color variables.

```html
<swc-color-loupe color="rgba(0, 128, 255, 0.7)"></swc-color-loupe>
```

If you have a customization need that isn't covered by the `color` attribute,
open an issue so it can be evaluated against the exposure guideline.

---

### Shadow DOM structure

The internal shadow DOM has been restructured. If you target shadow internals
with `::part()` or class selectors, update accordingly.

| 1st-gen                                                                                                                                  | 2nd-gen                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `div.opacity-checkerboard` + `div.spectrum-ColorLoupe-inner-border` + `div.spectrum-ColorLoupe-outer-border` + `svg.spectrum-ColorLoupe` | `div.swc-ColorLoupe > div.swc-ColorLoupe-checkerboard + div.swc-ColorLoupe-colorFill + svg.swc-ColorLoupe-svg` |
| `.is-open` class on the SVG toggled visibility                                                                                           | `:host([open])` attribute selector toggles visibility                                                          |
| `xlink:href` on `<use>` elements                                                                                                         | Modern `href` attribute                                                                                        |
| SVG path had a malformed double `Z` close and mask-reference bugs                                                                        | SVG path corrected; mask reference fixed                                                                       |

> Note: Accessing shadow internals via class selectors is not a public API and
> may change without notice. Use the exposed custom properties instead.

---

### Opacity-checkerboard package dependency removed

1st-gen `sp-color-loupe` pulled its checkerboard styles from a separate
`@spectrum-web-components/opacity-checkerboard` package. 2nd-gen inlines the
checkerboard styling directly in `color-loupe.css` (driven by the existing
`--swc-opacity-checkerboard-*` tokens), so consumers no longer need to install
or import the opacity-checkerboard package to use the loupe.

---

## Accessibility

The accessibility contract is unchanged — `swc-color-loupe` is a visual-only
companion for a parent color-selection control (`sp-color-area`,
`sp-color-slider`, `sp-color-wheel` in 1st-gen; their future 2nd-gen
equivalents). Key points:

- The SVG has `aria-hidden="true"` and the element is not focusable. Accessibility
  semantics (name, value, role) are provided by the **parent** color selection
  component.
- The loupe's `open` state is driven by the parent — on touch interactions the
  loupe appears to keep the picked color visible; for mouse and stylus input it
  remains hidden.
- Never use the loupe as the sole means of communicating a color value. Pair it
  with labelled controls that expose the value to assistive technology.
- Do not add `role`, `aria-label`, or focus management to the loupe itself — it
  is intentionally inert.

A known WCAG 1.4.11 (Non-text Contrast) limitation for the loupe's outer border
is documented in the component's [accessibility migration
analysis](../../../../../CONTRIBUTOR-DOCS/03_project-planning/03_components/color-loupe/accessibility-migration-analysis.md)
and tracked separately — behavior is unchanged from 1st-gen.
