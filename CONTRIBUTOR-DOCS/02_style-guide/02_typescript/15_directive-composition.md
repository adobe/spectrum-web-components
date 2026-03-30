<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [2nd-gen TypeScript](README.md) / Directive composition

<!-- Document title (editable) -->

# Directive composition

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [What is a directive](#what-is-a-directive)
- [Built-in directives used in 2nd-gen](#built-in-directives-used-in-2nd-gen)
    - [classMap](#classmap)
    - [when](#when)
    - [choose](#choose)
    - [ifDefined](#ifdefined)
    - [styleMap](#stylemap)
- [Custom directives](#custom-directives)

</details>

<!-- Document content (editable) -->

This guide explains how Lit directives are used in 2nd-gen component templates.

For the official Lit documentation, see [Lit — Built-in directives](https://lit.dev/docs/templates/directives/).

## What is a directive

A directive is a function that controls how values are rendered in a Lit `html` template. Lit provides many built-in directives for common tasks like conditional rendering, dynamic class names, and style mapping.

Directives are imported from `lit/directives/*.js` and used directly in template expressions.

## Built-in directives used in 2nd-gen

| Directive | Import | Used in | Purpose |
|-----------|--------|---------|---------|
| `classMap` | `lit/directives/class-map.js` | All concrete classes | Dynamic CSS class names |
| `when` | `lit/directives/when.js` | Badge | Conditional rendering in place of ternary with `nothing` |
| `choose` | `lit/directives/choose.js` | Asset | Switch-case style rendering based on a value |
| `ifDefined` | `lit/directives/if-defined.js` | Stories, templates | Skip attribute if undefined |
| `styleMap` | `lit/directives/style-map.js` | Storybook decorators | Dynamic inline styles |

### classMap

The most commonly used directive. It builds a class string from an object where keys are class names and values are booleans.

**Import:**

```ts
import { classMap } from 'lit/directives/class-map.js';
```

**Example from Badge.ts:**

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
      <!-- ...content... -->
    </div>
  `;
}
```

**Example from Divider.ts:**

```ts
protected override render(): TemplateResult {
  return html`
    <div
      class=${classMap({
        ['swc-Divider']: true,
        [`swc-Divider--size${this.size?.toUpperCase()}`]: this.size != null,
        [`swc-Divider--static${capitalize(this.staticColor)}`]:
          this.staticColor != null,
        [`swc-Divider--vertical`]: this.vertical,
      })}
    ></div>
  `;
}
```

```ts
// ✅ Good — clear boolean conditions
class=${classMap({
  ['swc-Badge']: true,
  ['swc-Badge--subtle']: this.subtle,
})}

// ❌ Bad — string concatenation instead of classMap
class=${'swc-Badge' + (this.subtle ? ' swc-Badge--subtle' : '')}
```

### when

Conditionally renders content. Takes a condition, a true template, and an optional false template.

**Import:**

```ts
import { when } from 'lit/directives/when.js';
```

**Example from Badge.ts:**

```ts
${when(
  this.hasIcon,
  () => html`<slot name="icon"></slot>`
)}
```

**Always prefer `when` over ternary operators** for conditional rendering:

```ts
// ✅ Good — when directive
${when(this.hasIcon, () => html`<slot name="icon"></slot>`)}

// ❌ Bad — ternary with empty string
${this.hasIcon ? html`<slot name="icon"></slot>` : ''}

// ❌ Bad — ternary with nothing
${this.hasIcon ? html`<slot name="icon"></slot>` : nothing}
```

Use `when` for cleaner conditional rendering. It is especially useful when the false case is empty (no else branch).

For multiple discrete values, use [`choose`](#choose) instead of multiple `when` directives.

### choose

Renders content based on matching a value against a set of cases, similar to a switch statement. Takes a value, an array of case-template pairs, and an optional default template.

**Import:**

```ts
import { choose } from 'lit/directives/choose.js';
```

**Example from Asset.ts:**

```ts
protected override render(): TemplateResult {
  return html`
    <div class=${classMap({ ['spectrum-Asset']: true })}>
      ${choose(this.variant, [
        ['file', () => file(this.label)],
        ['folder', () => folder(this.label)],
      ], () => html`<slot></slot>`)}
    </div>
  `;
}
```

**Always prefer `choose` over nested ternaries** when selecting between multiple discrete values:

```ts
// ✅ Good — choose directive
${choose(this.variant, [
  ['file', () => file(this.label)],
  ['folder', () => folder(this.label)],
], () => html`<slot></slot>`)}

// ❌ Bad — nested ternary
${this.variant === 'file'
  ? file(this.label)
  : this.variant === 'folder'
    ? folder(this.label)
    : html`<slot></slot>`}
```

**When to use `choose` vs `when`:**

- Use `choose` when selecting between multiple discrete values (like a switch statement)
- Use `when` for simple boolean conditions or presence checks

```ts
// ✅ Good — choose for variant selection
${choose(this.variant, [
  ['primary', () => html`<span class="primary">Primary</span>`],
  ['secondary', () => html`<span class="secondary">Secondary</span>`],
  ['tertiary', () => html`<span class="tertiary">Tertiary</span>`],
])}

// ✅ Good — when for boolean condition
${when(this.hasIcon, () => html`<slot name="icon"></slot>`)}
```

### ifDefined

Sets an attribute only if the value is defined. If the value is `undefined`, the attribute is removed entirely.

**Import:**

```ts
import { ifDefined } from 'lit/directives/if-defined.js';
```

**Example from stories:**

```ts
<swc-status-light variant=${ifDefined(args.variant)}>
  ${args.label}
</swc-status-light>
```

```ts
// ✅ Good — attribute removed when undefined
variant=${ifDefined(this.variant)}

// ❌ Bad — attribute set to "undefined" string
variant=${this.variant}
```

### styleMap

Builds an inline style string from an object. Used in Storybook decorators for dynamic layout.

**Import:**

```ts
import { styleMap } from 'lit/directives/style-map.js';
```

**Example from Storybook decorators:**

```ts
style=${styleMap({
  display: 'flex',
  gap: '16px',
  'flex-wrap': 'wrap',
})}
```

## Custom directives

2nd-gen does not currently use custom directives. All directive usage relies on Lit's built-in directives.

If a custom directive is needed in the future, it should follow Lit's custom directive pattern:

1. Extend the `Directive` class from `lit/directive.js`
2. Implement the `render()` method
3. Optionally implement `update()` for fine-grained control
4. Export a factory function created with `directive(MyDirective)`

See [Lit — Custom directives](https://lit.dev/docs/templates/custom-directives/) for the full pattern.
