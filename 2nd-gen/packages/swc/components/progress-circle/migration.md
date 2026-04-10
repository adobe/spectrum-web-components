# Progress Circle migration guide: `sp-progress-circle` → `swc-progress-circle`

This guide covers everything you need to move from the 1st-gen `sp-progress-circle`
component (`@spectrum-web-components/progress-circle`) to the 2nd-gen
`swc-progress-circle` component (`@adobe/spectrum-wc/progress-circle`).

---

## Installation

Remove the 1st-gen package and add the 2nd-gen equivalent:

```bash
# Remove
yarn remove @spectrum-web-components/progress-circle

# Add
yarn add @adobe/spectrum-wc
```

Update your imports:

```ts
// Before
import '@spectrum-web-components/progress-circle/sp-progress-circle.js';

// After
import '@adobe/spectrum-wc/progress-circle';
```

> **Note:** `@adobe/spectrum-wc` is a monolithic package — installing it makes all
> components available. Importing via a subpath (e.g. `@adobe/spectrum-wc/progress-circle`)
> routes to that component's dedicated bundle, so only that module is loaded rather
> than the entire package.

---

## Quick reference

| What changed          | Before (1st-gen)                           | After (2nd-gen)                      |
| --------------------- | ------------------------------------------ | ------------------------------------ |
| Tag name              | `sp-progress-circle`                       | `swc-progress-circle`                |
| Package               | `@spectrum-web-components/progress-circle` | `@adobe/spectrum-wc`                 |
| `progress` attribute  | `0`–`100`                                  | `0`–`100` — unchanged                |
| `indeterminate`       | Boolean                                    | Boolean — unchanged                  |
| `size` attribute      | `s \| m \| l`                              | `s \| m \| l` — unchanged            |
| `label` attribute     | `label="…"`                                | `label="…"` — unchanged              |
| `static-color`        | `white` only                               | `white \| black` — `black` added     |
| CSS custom properties | `--mod-progress-circle-*`                  | `--swc-progress-circle-*`            |
| Internal rendering    | Nested `<div>` masks with CSS transforms   | SVG circles with `stroke-dashoffset` |

---

## Breaking changes

### Tag name

Find and replace all instances of `sp-progress-circle` with `swc-progress-circle` in
your templates and HTML.

```html
<!-- Before -->
<sp-progress-circle progress="50" label="Loading"></sp-progress-circle>
<sp-progress-circle indeterminate label="Loading"></sp-progress-circle>

<!-- After -->
<swc-progress-circle progress="50" label="Loading"></swc-progress-circle>
<swc-progress-circle indeterminate label="Loading"></swc-progress-circle>
```

---

### CSS custom properties

All `--mod-progress-circle-*` and `--spectrum-progress-circle-*` custom properties have
been replaced with `--swc-progress-circle-*`. Update any overrides in your stylesheets:

| Removed (1st-gen)                             | Replacement (2nd-gen)                      |
| --------------------------------------------- | ------------------------------------------ |
| `--mod-progress-circle-size`                  | `--swc-progress-circle-size`               |
| `--mod-progress-circle-track-border-color`    | `--swc-progress-circle-track-border-color` |
| `--mod-progress-circle-fill-border-color`     | `--swc-progress-circle-fill-border-color`  |
| `--mod-progress-circle-position`              | Not directly exposed                       |
| `--spectrum-progress-circle-size-small`       | `--swc-progress-circle-size-small`         |
| `--spectrum-progress-circle-size-medium`      | `--swc-progress-circle-size-medium`        |
| `--spectrum-progress-circle-size-large`       | `--swc-progress-circle-size-large`         |
| `--spectrum-progress-circle-thickness`        | `--swc-progress-circle-thickness`          |
| `--spectrum-progress-circle-thickness-small`  | `--swc-progress-circle-thickness-small`    |
| `--spectrum-progress-circle-thickness-medium` | `--swc-progress-circle-thickness-medium`   |
| `--spectrum-progress-circle-thickness-large`  | `--swc-progress-circle-thickness-large`    |

```css
/* Before */
sp-progress-circle {
  --mod-progress-circle-track-border-color: #ccc;
  --mod-progress-circle-fill-border-color: blue;
}

/* After */
swc-progress-circle {
  --swc-progress-circle-track-border-color: #ccc;
  --swc-progress-circle-fill-border-color: blue;
}
```

---

### Internal rendering changed

In 1st-gen, the progress fill was rendered using nested `<div>` elements with CSS masks
and `transform: rotate()` to simulate a circular fill. In 2nd-gen, the component uses
an SVG with `stroke-dasharray` and `stroke-dashoffset` on a `<circle>` element.

This change is invisible at the API level — all attributes, events, and ARIA behavior
are identical. However, if you were targeting internal shadow DOM elements (`.track`,
`.fills`, `.fillMask1`, `.fillSubMask1`, `.fill`, etc.) via JavaScript or CSS, those
selectors will no longer match.

The new internal SVG elements use these classes:

| Purpose      | 2nd-gen class               |
| ------------ | --------------------------- |
| Outer SVG    | `.swc-outerCircle`          |
| Track circle | `.swc-ProgressCircle-track` |
| Fill circle  | `.swc-ProgressCircle-fill`  |

> **Note:** Internal shadow DOM structure is not a public API. Use CSS custom properties
> for all theming.

---

## New in 2nd-gen

### `static-color="black"`

The `static-color` attribute now accepts `"black"` in addition to `"white"`, matching
the Spectrum 2 specification. Use `static-color="black"` when placing the component on
a light static background that falls outside the normal theme.

```html
<!-- 1st-gen: white only -->
<sp-progress-circle
  static-color="white"
  indeterminate
  label="Loading"
></sp-progress-circle>

<!-- 2nd-gen: both white and black supported -->
<swc-progress-circle
  static-color="white"
  indeterminate
  label="Loading"
></swc-progress-circle>
<swc-progress-circle
  static-color="black"
  indeterminate
  label="Loading"
></swc-progress-circle>
```

---

## Accessibility

- Always provide `label` with a meaningful description. When `label` is set, the
  component applies `aria-label` to the host element.
- `swc-progress-circle` sets `role="progressbar"` automatically in `firstUpdated`.
  Do not provide a conflicting `role` attribute.
- In determinate mode (`progress` is set), `aria-valuenow`, `aria-valuemin="0"`,
  `aria-valuemax="100"`, and `aria-valuetext` (a locale-aware percentage string) are
  set automatically.
- In indeterminate mode, all `aria-value*` attributes are removed so assistive technology
  correctly announces the component as having no known progress value.
- A development-mode warning is emitted when no accessible name can be determined.
  Provide either `label` or text content in the default slot to satisfy this requirement.
