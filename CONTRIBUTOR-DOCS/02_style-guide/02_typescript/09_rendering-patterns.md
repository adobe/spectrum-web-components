<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [2nd-gen TypeScript](README.md) / Rendering patterns

<!-- Document title (editable) -->

# Rendering patterns

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Helper functions](#helper-functions)
- [Size modifier pattern](#size-modifier-pattern)
- [Inline SVG](#inline-svg)
- [classMap patterns](#classmap-patterns)

</details>

<!-- Document content (editable) -->

This guide covers rendering-specific patterns for 2nd-gen component templates, including helper functions, size transformations, inline SVG accessibility, and classMap usage.

## Helper functions

For complex or reusable template fragments, define helper functions at the module level (after imports, before the class). This keeps the `render()` method clean and makes fragments reusable.

**Example from Asset.ts:**

```ts
import { html, TemplateResult } from 'lit';

// After imports, before class
const file = (label: string): TemplateResult => html`
  <svg class="swc-Asset-file" role="img" aria-label=${label}>...</svg>
`;

const folder = (label: string): TemplateResult => html`
  <svg class="swc-Asset-folder" role="img" aria-label=${label}>...</svg>
`;

export class Asset extends AssetBase {
  protected override render(): TemplateResult {
    return html`
      ${when(this.variant === 'file', () => file(this.label))}
      ${when(this.variant === 'folder', () => folder(this.label))}
    `;
  }
}
```

**When to use helper functions:**

- Template fragment is used multiple times
- Fragment is complex (SVG, multiple elements)
- Fragment needs parameters (label, size, etc.)

**When not to use helper functions:**

- Simple conditional rendering (use `when` directly)
- Single-use template fragments (inline in `render()`)
- Fragment has no parameters

```ts
// ✅ Good — complex fragment with parameters
const icon = (name: string): TemplateResult => html`
  <svg class="swc-Icon" aria-label=${name}>...</svg>
`;

// ❌ Bad — simple fragment that could be inline
const divider = (): TemplateResult => html`<hr />`;
```

## Size modifier pattern

Size-based CSS classes use the size value uppercased. This produces classes like `swc-Badge--sizeS`, `swc-Badge--sizeM`, `swc-Badge--sizeL`.

**Pattern:**

```ts
class=${classMap({
  ['swc-Badge']: true,
  [`swc-Badge--size${this.size?.toUpperCase()}`]: this.size != null,
})}
```

The `?.toUpperCase()` handles the case where `size` might be undefined, and the condition `this.size != null` ensures the class is only added when size has a value.

**Example from Badge.ts:**

```ts
protected override render(): TemplateResult {
  return html`
    <div
      class=${classMap({
        ['swc-Badge']: true,
        [`swc-Badge--size${this.size?.toUpperCase()}`]: this.size != null,
        [`swc-Badge--${this.variant}`]: this.variant != null,
      })}
    >
      <!-- ...content... -->
    </div>
  `;
}
```

**Example from Divider.ts:**

```ts
class=${classMap({
  ['swc-Divider']: true,
  [`swc-Divider--size${this.size?.toUpperCase()}`]: this.size != null,
})}
```

## Inline SVG

When rendering inline SVGs, ensure accessibility by providing appropriate ARIA attributes.

**Required attributes:**

- `role="img"` — Identifies the SVG as an image for assistive technology
- `aria-label` — Provides the accessible name (or use `aria-labelledby` to reference another element)

**Example:**

```ts
const icon = (label: string): TemplateResult => html`
  <svg
    class="swc-Asset-icon"
    role="img"
    aria-label=${label}
    viewBox="0 0 24 24"
  >
    <!-- SVG paths -->
  </svg>
`;
```

**When to use `aria-hidden`:**

If the SVG is purely decorative and provides no additional meaning (e.g., an icon next to visible text), use `aria-hidden="true"` instead:

```ts
const decorativeIcon = (): TemplateResult => html`
  <svg class="swc-Icon" aria-hidden="true" viewBox="0 0 24 24">
    <!-- SVG paths -->
  </svg>
`;
```

## classMap patterns

Use `classMap` from `lit/directives/class-map.js` for all dynamic class names. Use bracketed string keys for consistency:

```ts
import { classMap } from 'lit/directives/class-map.js';

class=${classMap({
  ['swc-Badge']: true,                                    // Bracketed string key
  [`swc-Badge--size${this.size?.toUpperCase()}`]: this.size != null,  // Template literal
  [`swc-Badge--${this.variant}`]: this.variant != null,   // Template literal
  ['swc-Badge--subtle']: this.subtle,                     // Boolean condition
})}
```

**Why bracketed keys:**

- Consistent syntax across all entries (both static and computed)
- Required for computed keys (template literals)
- Makes the pattern visually uniform

**Key patterns:**

| Pattern | Example | Use case |
|---------|---------|----------|
| Static class | `['swc-Badge']: true` | Always present |
| Size modifier | `` [`swc-Badge--size${this.size?.toUpperCase()}`]: this.size != null `` | Size-based styling |
| Variant modifier | `` [`swc-Badge--${this.variant}`]: this.variant != null `` | Variant-based styling |
| Boolean modifier | `['swc-Badge--subtle']: this.subtle` | Boolean property styling |
| Static color | `` [`swc-Badge--static${capitalize(this.staticColor)}`]: this.staticColor != null `` | Static color styling |

**Complete example from Badge.ts:**

```ts
protected override render(): TemplateResult {
  return html`
    <div
      class=${classMap({
        ['swc-Badge']: true,
        [`swc-Badge--size${this.size?.toUpperCase()}`]: this.size != null,
        [`swc-Badge--${this.variant}`]: this.variant != null,
        ['swc-Badge--subtle']: this.subtle,
        ['swc-Badge--outline']: this.outline,
      })}
    >
      ${when(this.hasIcon, () => html`<slot name="icon"></slot>`)}
      <slot></slot>
    </div>
  `;
}
```

```ts
// ✅ Good — clear boolean conditions, bracketed keys
class=${classMap({
  ['swc-Badge']: true,
  ['swc-Badge--subtle']: this.subtle,
})}

// ❌ Bad — string concatenation
class=${'swc-Badge' + (this.subtle ? ' swc-Badge--subtle' : '')}

// ❌ Bad — inconsistent key syntax
class=${classMap({
  'swc-Badge': true,                  // Unbracketed
  [`swc-Badge--${this.variant}`]: true, // Bracketed
})}
```
