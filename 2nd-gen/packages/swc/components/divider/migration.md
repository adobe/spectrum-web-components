# Divider migration guide: `sp-divider` → `swc-divider`

This guide covers everything you need to move from the 1st-gen `sp-divider` component
(`@spectrum-web-components/divider`) to the 2nd-gen `swc-divider` component
(`@adobe/spectrum-wc/divider`).

---

## Installation

Remove the 1st-gen package and add the 2nd-gen equivalent:

```bash
# Remove
yarn remove @spectrum-web-components/divider

# Add
yarn add @adobe/spectrum-wc
```

Update your imports:

```ts
// Before
import '@spectrum-web-components/divider/sp-divider.js';

// After
import '@adobe/spectrum-wc/divider';
```

> **Note:** `@adobe/spectrum-wc` is a monolithic package — installing it makes all
> components available. Importing via a subpath (e.g. `@adobe/spectrum-wc/divider`)
> routes to that component's dedicated bundle, so only that module is loaded rather
> than the entire package.

---

## Quick reference

| What changed          | Before (1st-gen)                     | After (2nd-gen)                                                             |
| --------------------- | ------------------------------------ | --------------------------------------------------------------------------- |
| Tag name              | `sp-divider`                         | `swc-divider`                                                               |
| Package               | `@spectrum-web-components/divider`   | `@adobe/spectrum-wc`                                                        |
| `size` attribute      | `s \| m \| l`                        | `s \| m \| l` — unchanged                                                   |
| `vertical` attribute  | Boolean                              | Boolean — unchanged                                                         |
| `static-color`        | `white \| black`                     | `white \| black` — unchanged                                                |
| CSS custom properties | `--mod-divider-*`                    | `--swc-divider-*`                                                           |
| Shadow DOM structure  | Styles on `:host` (no inner element) | Inner `<div class="swc-Divider">` — see [Shadow DOM](#shadow-dom-structure) |

---

## Breaking changes

### Tag name

Find and replace all instances of `sp-divider` with `swc-divider` in your templates and HTML.

```html
<!-- Before -->
<sp-divider></sp-divider>
<sp-divider size="l"></sp-divider>
<sp-divider vertical></sp-divider>

<!-- After -->
<swc-divider></swc-divider>
<swc-divider size="l"></swc-divider>
<swc-divider vertical></swc-divider>
```

---

### CSS custom properties

All `--mod-divider-*` custom properties have been removed. Replace them with the
`--swc-divider-*` equivalents in your stylesheets:

| Removed (1st-gen)                | Replacement (2nd-gen)                                                                                                                  |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `--mod-divider-background-color` | `--swc-divider-background-color`                                                                                                       |
| `--mod-divider-thickness`        | `--swc-divider-thickness`                                                                                                              |
| `--mod-divider-vertical-align`   | Not directly exposed — in 1st-gen this controlled `align-self` for vertical dividers; in 2nd-gen `align-self: flex-start` is hardcoded |
| `--mod-divider-vertical-height`  | Not directly exposed                                                                                                                   |
| `--mod-divider-vertical-margin`  | Not directly exposed                                                                                                                   |

```css
/* Before */
sp-divider {
  --mod-divider-background-color: hotpink;
}

/* After */
swc-divider {
  --swc-divider-background-color: hotpink;
}
```

> **Note on `static-color` overrides:** When `static-color="white"` or
> `static-color="black"` is set, the component applies color values via internal class
> selectors to ensure correct contrast on static backgrounds. Consumer overrides of
> `--swc-divider-background-color` will not take effect when `static-color` is in use.

---

### Shadow DOM structure

In 1st-gen, all styles were applied directly to `:host` with no inner elements rendered
in the shadow root. In 2nd-gen, the component renders an inner `<div class="swc-Divider">`
with modifier classes applied via JavaScript.

If you were using `:host` selectors or targeting the component's internal structure
directly, those patterns are unaffected for `:host` itself. However, internal class
selectors (`.track`, etc.) that existed in 1st-gen are not present in 2nd-gen's shadow
DOM and have no equivalent — use CSS custom properties instead.

The new internal class names applied to the inner element are:

| Modifier     | Class applied               |
| ------------ | --------------------------- |
| Base         | `.swc-Divider`              |
| Size small   | `.swc-Divider--sizeS`       |
| Size large   | `.swc-Divider--sizeL`       |
| Vertical     | `.swc-Divider--vertical`    |
| Static white | `.swc-Divider--staticWhite` |
| Static black | `.swc-Divider--staticBlack` |

> **Note:** Internal shadow DOM classes are not a public API and may change without notice.

---

## Accessibility

- `swc-divider` sets `role="separator"` automatically in `firstUpdated`. Do not provide
  a conflicting `role` attribute.
- When used vertically, `aria-orientation="vertical"` is set automatically. For
  horizontal dividers the attribute is omitted, which is correct — the default
  orientation for `separator` is horizontal.
- The divider is non-focusable and non-interactive in both generations.
- `static-color="white"` and `static-color="black"` are intended for use on colored or
  photographic backgrounds. Ensure sufficient contrast between the divider color and
  its background (WCAG 1.4.11 non-text contrast).
- A divider is a visual supplement to page structure, not a replacement for it.
  Headings and landmarks still define sections for screen reader users — a divider alone
  does not communicate that a new section has begun. Use fewer dividers where headings
  or whitespace can carry the structural meaning.
