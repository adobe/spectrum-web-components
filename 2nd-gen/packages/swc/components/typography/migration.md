# Typography migration guide: `.spectrum-*` → `.swc-*`

This guide covers everything you need to move from the 1st-gen typography utility
classes (`@spectrum-web-components/styles`) to the 2nd-gen equivalents
(`@adobe/spectrum-wc`).

> **These are CSS utility classes, not web components.** Both generations apply
> typography styles to standard semantic HTML elements via class names. No element
> registration or custom elements are involved.

---

## Installation

Remove the 1st-gen package and add the 2nd-gen equivalent:

```bash
# Remove
yarn remove @spectrum-web-components/styles

# Add
yarn add @adobe/spectrum-wc
```

Update your imports:

```ts
// Before — individual style modules
import '@spectrum-web-components/styles/body.js';
import '@spectrum-web-components/styles/heading.js';
import '@spectrum-web-components/styles/detail.js';
import '@spectrum-web-components/styles/code.js';

// After — single CSS import
import '@adobe/spectrum-wc/typography.css';
```

Or via a `<link>` tag:

```html
<!-- Before -->
<link
  rel="stylesheet"
  href="node_modules/@spectrum-web-components/styles/typography.css"
/>

<!-- After -->
<link rel="stylesheet" href="node_modules/@adobe/spectrum-wc/typography.css" />
```

> **Note:** `@adobe/spectrum-wc` is a monolithic package — all components share a
> single install. Importing `typography.css` only pulls in the typography stylesheet;
> component JS is not included unless you import it separately.

---

## Quick reference

| What changed                  | Before (1st-gen)                                      | After (2nd-gen)                                                    |
| ----------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------ |
| Class prefix                  | `.spectrum-Body`                                      | `.swc-Body`                                                        |
| CSS custom properties         | `--mod-body-*`, `--mod-heading-*`, etc.               | `--swc-body-*`, `--swc-heading-*`, etc.                            |
| `Title` variant               | Not available                                         | New — `.swc-Title` — see [Title variant](#title-variant-new)       |
| Heading `XXXXL` size          | Not available                                         | New — `.swc-Heading--sizeXXXXL`                                    |
| Body `XXS` size               | Not available                                         | New — `.swc-Body--sizeXXS`                                         |
| Margins modifier              | Implicit via `.spectrum-Typography` wrapper           | Explicit `.swc-[Variant]--margins`                                 |
| Prose container               | `.spectrum-Typography`                                | `.swc-Typography--prose` — auto-styles semantic elements           |
| Emphasized modifier           | Per-class `.spectrum-Body-emphasized` etc.            | Global `.swc-Typography--emphasized`                               |
| Light weight modifier         | `.spectrum-Heading--light`, `.spectrum-Detail--light` | **Removed**                                                        |
| `Detail` uppercase            | Applied automatically via CSS                         | **Removed** — apply `text-transform: uppercase` manually if needed |
| Strong/emphasized sub-classes | `.spectrum-Body-strong`, `.spectrum-Body-emphasized`  | **Removed** — use semantic `<strong>`, `<em>`                      |

---

## Breaking changes

### Class prefix

Replace the `.spectrum-` prefix with `.swc-` on all typography class names:

```html
<!-- Before -->
<p class="spectrum-Body">Body text</p>
<h1 class="spectrum-Heading spectrum-Heading--sizeXXL">Heading</h1>
<p class="spectrum-Detail spectrum-Detail--sizeS">Detail</p>
<code class="spectrum-Code spectrum-Code--sizeM">code</code>

<!-- After -->
<p class="swc-Body">Body text</p>
<h1 class="swc-Heading swc-Heading--sizeXXL">Heading</h1>
<p class="swc-Detail swc-Detail--sizeS">Detail</p>
<code class="swc-Code swc-Code--sizeM">code</code>
```

---

### Light weight variants removed

`.spectrum-Heading--light` and `.spectrum-Detail--light` have no 2nd-gen equivalent.
The Spectrum 2 type scale does not include a light weight variant for these elements.

```html
<!-- Before — no longer works -->
<h2 class="spectrum-Heading spectrum-Heading--light">Lighter heading</h2>

<!-- After — apply font-weight via a CSS class if a lighter weight is required -->
<h2 class="swc-Heading my-heading-light">Lighter heading</h2>
```

```css
/* In your stylesheet */
.my-heading-light {
  font-weight: 300;
}
```

---

### `Detail` uppercase removed

In 1st-gen, `.spectrum-Detail` automatically applied `text-transform: uppercase`. In
2nd-gen, `.swc-Detail` does not apply any text transform. If your design requires
uppercase detail text, apply it explicitly:

```css
/* Add to your stylesheet */
.my-uppercase-detail {
  text-transform: uppercase;
}
```

```html
<!-- Before — uppercase was automatic -->
<p class="spectrum-Detail">Category</p>

<!-- After — add text-transform manually where needed -->
<p class="swc-Detail my-uppercase-detail">Category</p>
```

---

### Strong and emphasized sub-classes removed

The per-class strong and emphasized modifiers (e.g., `.spectrum-Body-strong`,
`.spectrum-Body-emphasized`) have been removed. Use semantic HTML elements instead:

```html
<!-- Before -->
<p class="spectrum-Body">
  <strong class="spectrum-Body-strong">Bold text</strong>
  <em class="spectrum-Body-emphasized">Italic text</em>
</p>

<!-- After — use semantic HTML directly -->
<p class="swc-Body">
  <strong>Bold text</strong>
  <em>Italic text</em>
</p>
```

For global italic emphasis across a block of typography, use the new
`.swc-Typography--emphasized` modifier instead — see
[emphasized modifier](#emphasized-modifier-new) below.

---

### Margins are now explicit

In 1st-gen, wrapping elements in `.spectrum-Typography` automatically applied vertical
margins to heading and detail elements inside it. In 2nd-gen, margins must be requested
explicitly on each element using the `--margins` modifier.

```html
<!-- Before — margins applied automatically by wrapper -->
<div class="spectrum-Typography">
  <h1 class="spectrum-Heading spectrum-Heading--sizeL">Heading</h1>
  <p class="spectrum-Body">Body text</p>
</div>

<!-- After — request margins explicitly per element -->
<div>
  <h1 class="swc-Heading swc-Heading--sizeL swc-Heading--margins">Heading</h1>
  <p class="swc-Body swc-Body--margins">Body text</p>
</div>
```

Alternatively, use the new prose container for document-like content — see
[prose container](#prose-container-new) below.

---

### CSS custom properties

All `--mod-[variant]-*` custom properties have been renamed to `--swc-[variant]-*`.
Update any overrides in your stylesheets:

| Removed (1st-gen)           | Replacement (2nd-gen)       |
| --------------------------- | --------------------------- |
| `--mod-body-font-size`      | `--swc-body-font-size`      |
| `--mod-body-font-color`     | `--swc-body-color`          |
| `--mod-body-line-height`    | `--swc-body-line-height`    |
| `--mod-heading-font-size`   | `--swc-heading-font-size`   |
| `--mod-heading-font-weight` | `--swc-heading-font-weight` |
| `--mod-heading-line-height` | `--swc-heading-line-height` |
| `--mod-detail-font-size`    | `--swc-detail-font-size`    |
| `--mod-code-font-size`      | `--swc-code-font-size`      |

```css
/* Before */
.spectrum-Body {
  --mod-body-font-size: 16px;
  --mod-body-font-color: #333;
}

/* After */
.swc-Body {
  --swc-body-font-size: 16px;
  --swc-body-color: #333;
}
```

---

## New in 2nd-gen

### Title variant (new)

A new `.swc-Title` class sits between `.swc-Heading` and `.swc-Body` in the visual
hierarchy. It is intended for section titles, card titles, and sub-headings.

Available sizes: `XS`, `S`, `M` (default), `L`, `XL`, `XXL`, `XXXL`

Available modifiers: `--serif`

```html
<h2 class="swc-Title swc-Title--sizeL">Section title</h2>
<h3 class="swc-Title swc-Title--sizeM swc-Title--serif">Serif title</h3>
```

---

### Prose container (new)

`.swc-Typography--prose` is a wrapper class that automatically applies appropriate
typography styles to semantic HTML elements within a block of document-like content.
Use it for rich text output, CMS content, or any prose where you cannot add classes
to individual elements.

| Semantic element | Style applied         |
| ---------------- | --------------------- |
| `h1`             | `.swc-Heading` size M |
| `h2`             | `.swc-Title` size XL  |
| `h3`             | `.swc-Title` size L   |
| `h4`             | `.swc-Title` size M   |
| `p`, `li`        | `.swc-Body` size M    |

```html
<div class="swc-Typography--prose">
  <h1>Page title</h1>
  <p>Introductory paragraph with auto-styled body text.</p>
  <h2>Section heading</h2>
  <p>More body text.</p>
</div>
```

---

### Emphasized modifier (new)

`.swc-Typography--emphasized` applies italic styling to all typography within a block.
It is automatically skipped for CJK languages (`ja`, `ko`, `zh`), where italic is
not conventionally used.

```html
<div class="swc-Typography--emphasized">
  <p class="swc-Body">This entire paragraph will be italicized.</p>
</div>
```

---

### New sizes

| Variant   | New size | Class                     |
| --------- | -------- | ------------------------- |
| `Body`    | `XXS`    | `.swc-Body--sizeXXS`      |
| `Heading` | `XXXXL`  | `.swc-Heading--sizeXXXXL` |

---

## Accessibility

- Typography classes affect visual presentation only. Use semantic HTML elements
  (`<h1>`–`<h6>`, `<p>`, `<code>`, etc.) regardless of which visual class is applied.
  The visual class does not change the element's role in the accessibility tree.
- Do not use heading classes (`.swc-Heading`, `.swc-Title`) on non-heading elements
  to make text look larger. Screen reader users navigate by heading hierarchy — visual
  appearance should match document structure.
- CJK language users receive adjusted `font-family`, `line-height`, and `letter-spacing`
  automatically when the appropriate `lang` attribute is set on an ancestor element.
