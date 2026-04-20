# Illustrated message migration guide: `sp-illustrated-message` → `swc-illustrated-message`

This guide covers everything you need to move from the 1st-gen `sp-illustrated-message` component
(`@spectrum-web-components/illustrated-message`) to the 2nd-gen `swc-illustrated-message` component
(`@adobe/spectrum-wc/illustrated-message`).

---

## Installation

Remove the 1st-gen package and add the 2nd-gen equivalent:

```bash
# Remove
yarn remove @spectrum-web-components/illustrated-message

# Add
yarn add @adobe/spectrum-wc
```

Update your imports:

```ts
// Before
import '@spectrum-web-components/illustrated-message/sp-illustrated-message.js';

// After
import '@adobe/spectrum-wc/illustrated-message';
```

---

## Quick reference

| What changed          | Before (1st-gen)                            | After (2nd-gen)                                                                     |
| --------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------- |
| Tag name              | `sp-illustrated-message`                    | `swc-illustrated-message`                                                           |
| Heading API           | `heading="..."` attribute or `heading` slot | `<h2 slot="heading">` (or h3–h6) — see [Heading API](#heading-api)                  |
| Description API       | `description="..."` attribute               | `<span slot="description">` — see [Description API](#description-api)               |
| Heading level control | Always renders `<h2>` internally            | Consumer provides `<h2>`–`<h6>` — see [Heading level](#heading-level)               |
| Illustration a11y     | Component-controlled                        | Consumer-controlled — see [Illustration accessibility](#illustration-accessibility) |
| Size variants         | Not available                               | `size="s"`, `size="m"` (default), `size="l"`                                        |
| Layout orientation    | Vertical only                               | `orientation="vertical"` (default) or `orientation="horizontal"`                    |
| CSS custom properties | `--mod-illustrated-message-*`               | `--swc-illustrated-message-*` — see [CSS custom properties](#css-custom-properties) |

---

## Breaking changes

### Tag name

Find and replace all instances of `sp-illustrated-message` with `swc-illustrated-message` in your
templates and HTML.

```html
<!-- Before -->
<sp-illustrated-message>...</sp-illustrated-message>

<!-- After -->
<swc-illustrated-message>...</swc-illustrated-message>
```

---

### Heading API

The `heading` attribute has been removed. In 1st-gen, the `heading` attribute was already deprecated
in favor of the `heading` slot. In 2nd-gen, only the slot is supported. Additionally, the heading
slot now requires an actual heading element (`<h2>`–`<h6>`) — arbitrary elements are not accepted.

**Using the deprecated `heading` attribute (1st-gen only):**

```html
<!-- Before — attribute was deprecated in 1st-gen, removed in 2nd-gen -->
<sp-illustrated-message heading="No results found">
  <svg slot="illustration">...</svg>
</sp-illustrated-message>
```

```html
<!-- After -->
<swc-illustrated-message>
  <svg slot="" aria-hidden="true">...</svg>
  <h2 slot="heading">No results found</h2>
</swc-illustrated-message>
```

**Using the `heading` slot with non-heading elements (1st-gen tolerated, 2nd-gen warns):**

```html
<!-- Before — 1st-gen accepted arbitrary elements in the heading slot -->
<sp-illustrated-message>
  <span slot="heading">No results found</span>
</sp-illustrated-message>
```

```html
<!-- After — heading slot requires <h2>–<h6> -->
<swc-illustrated-message>
  <h2 slot="heading">No results found</h2>
</swc-illustrated-message>
```

> **Note:** In debug mode, `swc-illustrated-message` emits a console warning when any element other
> than `<h2>`–`<h6>` is placed in the `heading` slot.

---

### Description API

The `description` attribute has been removed. Move the content into the `description` slot.

```html
<!-- Before -->
<sp-illustrated-message
  heading="No results found"
  description="Try adjusting your search or filters."
></sp-illustrated-message>
```

```html
<!-- After -->
<swc-illustrated-message>
  <h2 slot="heading">No results found</h2>
  <span slot="description">Try adjusting your search or filters.</span>
</swc-illustrated-message>
```

The `description` slot accepts any phrasing content, including inline links and other interactive
elements.

---

### Heading level

In 1st-gen, `sp-illustrated-message` always rendered the heading as an `<h2>` inside its shadow
DOM, regardless of the surrounding document structure. In 2nd-gen, the consumer is responsible for
providing the correct heading element to match the document outline.

Choose the heading level that is appropriate for where the component appears in the page hierarchy:

```html
<!-- On a page where the illustrated message is the main content, h2 is typical -->
<swc-illustrated-message>
  <h2 slot="heading">No results found</h2>
  <span slot="description">Try adjusting your search or filters.</span>
</swc-illustrated-message>

<!-- Inside a section or panel with its own h2, use h3 -->
<swc-illustrated-message>
  <h3 slot="heading">Your cart is empty</h3>
  <span slot="description">Browse our catalog to add items.</span>
</swc-illustrated-message>
```

> **Accessibility:** Only `<h2>`–`<h6>` are valid in the `heading` slot. `<h1>` is not permitted
> because illustrated messages represent supporting content, not the primary page title. Match the
> heading level to the surrounding document outline to maintain a logical heading structure.

---

### Illustration accessibility

In 1st-gen, the component managed ARIA attributes on the illustration internally. In 2nd-gen, you
must declare whether your SVG illustration is decorative or informative directly on the element.

**Decorative illustrations** (the image adds no information not already communicated by the heading
and description) — hide from assistive technology:

```html
<!-- Before -->
<sp-illustrated-message heading="No results found">
  <svg slot="illustration">...</svg>
</sp-illustrated-message>

<!-- After -->
<swc-illustrated-message>
  <svg slot="" aria-hidden="true">...</svg>
  <h2 slot="heading">No results found</h2>
</swc-illustrated-message>
```

**Informative illustrations** (the image conveys meaning not captured in text) — provide an
accessible label:

```html
<!-- After -->
<swc-illustrated-message>
  <svg slot="" role="img" aria-label="A magnifying glass showing no results">
    ...
  </svg>
  <h2 slot="heading">No results found</h2>
</swc-illustrated-message>
```

> **Accessibility:** Every SVG in the default slot must have either `aria-hidden="true"` (decorative)
> or `role="img"` and `aria-label` (informative). Omitting both leaves the illustration with an
> ambiguous accessible role.

---

### CSS custom properties

All `--mod-illustrated-message-*` custom properties have been replaced with
`--swc-illustrated-message-*` equivalents. The full set of modifiable properties has also changed
to reflect the updated Spectrum 2 design tokens.

**Commonly used replacements:**

| Removed (1st-gen)                                   | Replacement (2nd-gen)                               |
| --------------------------------------------------- | --------------------------------------------------- |
| `--mod-illustrated-message-illustration-color`      | `--swc-illustrated-message-illustration-color`      |
| `--mod-illustrated-message-content-maximum-width`   | `--swc-illustrated-message-max-inline-size`         |
| `--mod-illustrated-message-title-to-heading`        | `--swc-illustrated-message-illustration-to-content` |
| `--mod-illustrated-message-title-font-size`         | `--swc-illustrated-message-heading-font-size`       |
| `--mod-illustrated-message-title-line-height`       | `--swc-illustrated-message-heading-line-height`     |
| `--mod-illustrated-message-description-font-size`   | `--swc-illustrated-message-description-font-size`   |
| `--mod-illustrated-message-description-line-height` | `--swc-illustrated-message-description-line-height` |

**Properties with no direct replacement:**

The following 1st-gen properties do not have a 1:1 equivalent because the corresponding styling
is handled differently in 2nd-gen or is no longer exposed:

- `--mod-illustrated-message-display`
- `--mod-illustrated-message-pointer-events`
- `--mod-illustrated-message-description-pointer-events`
- `--mod-illustrated-message-description-position`
- `--mod-illustrated-message-description-z-index`
- `--mod-illustrated-message-title-font-family`
- `--mod-illustrated-message-title-font-style`
- `--mod-illustrated-message-title-font-weight`
- `--mod-illustrated-message-description-font-family`
- `--mod-illustrated-message-description-font-style`
- `--mod-illustrated-message-description-font-weight`
- `--mod-illustrated-message-description-color`
- `--mod-illustrated-message-illustration-accent-color`

```css
/* Before */
sp-illustrated-message {
  --mod-illustrated-message-illustration-color: blue;
  --mod-illustrated-message-content-maximum-width: 400px;
}

/* After */
swc-illustrated-message {
  --swc-illustrated-message-illustration-color: blue;
  --swc-illustrated-message-max-inline-size: 400px;
}
```

---

## New in 2nd-gen

### `size`

A new `size` attribute controls the visual sizing of the illustration and typography. The default
is `m`.

| Value | Illustration size | Use for                                                      |
| ----- | ----------------- | ------------------------------------------------------------ |
| `s`   | 96 px             | Compact panels, sidebars, or constrained spaces              |
| `m`   | 96 px             | Standard empty states (default)                              |
| `l`   | 160 px            | Full-page empty states or prominent error/onboarding screens |

```html
<swc-illustrated-message size="l">
  <svg slot="" aria-hidden="true">...</svg>
  <h2 slot="heading">Get started</h2>
  <span slot="description">Upload your first file to begin.</span>
</swc-illustrated-message>
```

---

### `orientation`

A new `orientation` attribute controls the layout direction. The default is `vertical`.

- **`vertical`** — illustration stacked above heading and description, centered.
- **`horizontal`** — illustration beside heading and description in a row, left-aligned.

```html
<!-- Vertical (default) -->
<swc-illustrated-message orientation="vertical">
  <svg slot="" aria-hidden="true">...</svg>
  <h2 slot="heading">No results found</h2>
  <span slot="description">Try adjusting your search or filters.</span>
</swc-illustrated-message>

<!-- Horizontal — works well in narrower containers -->
<swc-illustrated-message orientation="horizontal">
  <svg slot="" aria-hidden="true">...</svg>
  <h2 slot="heading">No results found</h2>
  <span slot="description">Try adjusting your search or filters.</span>
</swc-illustrated-message>
```

---

## Accessibility

- The `heading` slot requires an `<h2>`–`<h6>` element. Choose the level that fits the surrounding
  document outline — do not always default to `<h2>`.
- Every SVG illustration must have either `aria-hidden="true"` (decorative) or `role="img"` plus
  `aria-label` (informative).
- The `description` slot can include inline links and interactive elements. Ensure links have
  descriptive text and that interactive elements within the description are reachable by keyboard.
- `swc-illustrated-message` is a non-interactive container — it does not receive focus itself. Focus
  management is the responsibility of the surrounding page or application context.
