# Status Light migration guide: `sp-status-light` → `swc-status-light`

This guide covers everything you need to move from the 1st-gen `sp-status-light`
component (`@spectrum-web-components/status-light`) to the 2nd-gen `swc-status-light`
component (`@adobe/spectrum-wc/status-light`).

---

## Installation

Remove the 1st-gen package and add the 2nd-gen equivalent:

```bash
# Remove
yarn remove @spectrum-web-components/status-light

# Add
yarn add @adobe/spectrum-wc
```

Update your imports:

```ts
// Before
import '@spectrum-web-components/status-light/sp-status-light.js';

// After
import '@adobe/spectrum-wc/status-light';
```

> **Note:** `@adobe/spectrum-wc` is a monolithic package — installing it makes all
> components available. Importing via a subpath (e.g. `@adobe/spectrum-wc/status-light`)
> routes to that component's dedicated bundle, so only that module is loaded rather
> than the entire package.

---

## Quick reference

| What changed          | Before (1st-gen)                                  | After (2nd-gen)                                                           |
| --------------------- | ------------------------------------------------- | ------------------------------------------------------------------------- |
| Tag name              | `sp-status-light`                                 | `swc-status-light`                                                        |
| Package               | `@spectrum-web-components/status-light`           | `@adobe/spectrum-wc`                                                      |
| `variant` attribute   | 15 variants (6 semantic incl. `accent`, 9 colors) | 19 variants (`accent` removed, 5 new colors added; 5 semantic, 14 colors) |
| `size` attribute      | `s \| m \| l \| xl`                               | `s \| m \| l \| xl` — unchanged                                           |
| `disabled` attribute  | Boolean                                           | **Removed** — see [disabled removed](#disabled-attribute-removed)         |
| `accent` variant      | Available                                         | **Removed** — see [accent removed](#accent-variant-removed)               |
| New color variants    | —                                                 | `pink`, `turquoise`, `brown`, `cinnamon`, `silver`                        |
| CSS custom properties | `--mod-statuslight-*`                             | `--swc-statuslight-*`                                                     |

---

## Breaking changes

### Tag name

Find and replace all instances of `sp-status-light` with `swc-status-light` in your
templates and HTML.

```html
<!-- Before -->
<sp-status-light variant="positive">Published</sp-status-light>

<!-- After -->
<swc-status-light variant="positive">Published</swc-status-light>
```

---

### `disabled` attribute removed

The `disabled` attribute is not part of the Spectrum 2 design specification for status
light and has been removed. In 1st-gen, `disabled` rendered the component at reduced
opacity and set `aria-disabled="true"`.

**After:** Convey unavailability through text content rather than a visual disabled state.
Keep the semantic variant that best represents the entity's status, and update the label
to describe the current availability.

```html
<!-- Before -->
<sp-status-light variant="positive" disabled>Published</sp-status-light>

<!-- After: remove disabled, describe the state in the label text -->
<swc-status-light variant="positive">Unavailable</swc-status-light>
```

Remove all `disabled` attributes and any JavaScript that toggled them. Remove any
`aria-disabled` handling that was paired with `disabled` on `sp-status-light` elements.

---

### `accent` variant removed

The `accent` variant is not part of the Spectrum 2 design specification and has been
removed. If you were using `variant="accent"`, migrate to one of the semantic variants
that best represents your use case:

| Old usage                            | Suggested replacement               |
| ------------------------------------ | ----------------------------------- |
| `<sp-status-light variant="accent">` | `<swc-status-light variant="info">` |

```html
<!-- Before -->
<sp-status-light variant="accent">Featured</sp-status-light>

<!-- After -->
<swc-status-light variant="info">Featured</swc-status-light>
```

---

### CSS custom properties

All `--mod-statuslight-*` custom properties have been removed. Replace them with the
`--swc-statuslight-*` equivalents in your stylesheets:

| Removed (1st-gen)                           | Replacement (2nd-gen)              |
| ------------------------------------------- | ---------------------------------- |
| `--mod-statuslight-height`                  | `--swc-statuslight-height`         |
| `--mod-statuslight-dot-size`                | `--swc-statuslight-dot-size`       |
| `--mod-statuslight-font-size`               | `--swc-statuslight-font-size`      |
| `--mod-statuslight-spacing-dot-to-label`    | `--swc-statuslight-text-to-visual` |
| `--mod-statuslight-spacing-top-to-dot`      | `--swc-statuslight-top-to-dot`     |
| `--mod-statuslight-spacing-top-to-label`    | `--swc-statuslight-top-to-text`    |
| `--mod-statuslight-spacing-bottom-to-label` | `--swc-statuslight-bottom-to-text` |
| `--mod-statuslight-corner-radius`           | `--swc-statuslight-corner-radius`  |
| `--mod-statuslight-font-weight`             | `--swc-statuslight-font-weight`    |
| `--mod-statuslight-content-color-default`   | `--swc-statuslight-content-color`  |
| `--mod-statuslight-semantic-*-color`        | `--swc-statuslight-dot-color`      |
| `--mod-statuslight-nonsemantic-*-color`     | `--swc-statuslight-dot-color`      |

```css
/* Before */
sp-status-light {
  --mod-statuslight-dot-size: 12px;
  --mod-statuslight-font-size: 14px;
}

/* After */
swc-status-light {
  --swc-statuslight-dot-size: 12px;
  --swc-statuslight-font-size: 14px;
}
```

> **Note on per-variant color overrides:** Semantic variants (`neutral`, `info`,
> `positive`, `negative`, `notice`) use attribute-based selectors internally, so
> consumer per-variant overrides work as expected:
>
> ```css
> swc-status-light[variant='positive'] {
>   --swc-statuslight-dot-color: darkgreen;
> }
> ```
>
> Color variants (`yellow`, `chartreuse`, `celery`, `seafoam`, `cyan`, `indigo`,
> `purple`, `fuchsia`, `magenta`, `pink`, `turquoise`, `brown`, `cinnamon`, `silver`)
> are applied via internal class selectors. A consumer attribute selector targeting one
> of these variants will not reliably override `--swc-statuslight-dot-color` — use a
> global (unscoped) override instead:
>
> ```css
> /* Works — but applies to all status-light instances */
> swc-status-light {
>   --swc-statuslight-dot-color: rebeccapurple;
> }
> ```

---

## New in 2nd-gen

### New color variants

Five new color variants have been added to match the Spectrum 2 specification:

| New variant | Example                                                          |
| ----------- | ---------------------------------------------------------------- |
| `pink`      | `<swc-status-light variant="pink">Label</swc-status-light>`      |
| `turquoise` | `<swc-status-light variant="turquoise">Label</swc-status-light>` |
| `brown`     | `<swc-status-light variant="brown">Label</swc-status-light>`     |
| `cinnamon`  | `<swc-status-light variant="cinnamon">Label</swc-status-light>`  |
| `silver`    | `<swc-status-light variant="silver">Label</swc-status-light>`    |

All remaining original variants continue to work unchanged.

---

## Accessibility

- `swc-status-light` has no implicit ARIA role. It is a static, non-interactive
  presentational component.
- The text content in the default slot serves as the accessible label. Always provide
  meaningful text — do not use the component without a text label, as the indicator dot
  alone conveys no accessible information.
- Do not rely on color alone to convey status. The text label must independently
  communicate the state.
- With `disabled` removed, there is no mechanism to convey "unavailable" visually
  beyond writing it in the label text. This is intentional per the Spectrum 2 spec.
