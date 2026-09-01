<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [2nd-gen TypeScript](README.md) / Rendering patterns

<!-- Document title (editable) -->

# Rendering patterns

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Helper functions](#helper-functions)
- [Shared render templates](#shared-render-templates)
    - [Anatomy of the options object](#anatomy-of-the-options-object)
    - [When to use a shared render template](#when-to-use-a-shared-render-template)
    - [Where the template file lives](#where-the-template-file-lives)
    - [When not to use a shared render template](#when-not-to-use-a-shared-render-template)
- [Size modifier pattern](#size-modifier-pattern)
- [Inline SVG](#inline-svg)
- [classMap patterns](#classmap-patterns)
- [Inline CSS strings from component properties](#inline-css-strings-from-component-properties)
- [Shadow root customization](#shadow-root-customization)

</details>

<!-- Document content (editable) -->

This guide covers rendering-specific patterns for 2nd-gen component templates, including helper functions, size transformations, inline SVG accessibility, classMap usage, and shadow root customization.

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

## Shared render templates

When the same anatomy is rendered by **multiple concrete components** (not just multiple call sites within one file), promote the shared markup out of `render()` entirely into its own file: a standalone function that takes an options object and returns a `TemplateResult`. This is the render-logic counterpart to a `_lit-styles/` CSS fragment (see [Shared Lit CSS fragments](../01_css/07_stylesheets.md#shared-lit-css-fragments-lit-styles)) — same motivation, one structural definition with several consumers, applied to markup instead of CSS.

**Example from `card/card-template.ts`:**

```ts
import { html, nothing, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

export interface CardTemplateOptions {
  /** Per-component class root (e.g. `UserCard`), prefixed with `swc-`. */
  cardClass: string;

  /** Renders the collection slot in addition to the preview. Default: none. */
  renderCollection?: () => TemplateResult | typeof nothing;

  /** Renders the avatar/thumbnail glyph. Default: none. */
  renderGlyph?: () => TemplateResult | typeof nothing;

  /** Whether the default slot has assigned content. Default: false. */
  hasDefaultSlotContent?: boolean;

  /** Bound to the default slot's `slotchange` event. Default: none. */
  onDefaultSlotChange?: (event: Event) => void;
}

export function renderCardTemplate({
  cardClass,
  renderCollection = () => nothing,
  renderGlyph = () => nothing,
  hasDefaultSlotContent = false,
  onDefaultSlotChange,
}: CardTemplateOptions): TemplateResult {
  return html`
    <div
      class=${classMap({
        'swc-CardBase': true,
        [`swc-${cardClass}`]: true,
        [`swc-${cardClass}--hasDefault`]: hasDefaultSlotContent,
      })}
    >
      <!-- shared preview / media / content / footer anatomy -->
      ${renderGlyph()} ${renderCollection()}
      <slot @slotchange=${onDefaultSlotChange}></slot>
    </div>
  `;
}
```

**Called from the concrete component's `render()`:**

```ts
protected override render(): TemplateResult {
  return renderCardTemplate({
    cardClass: 'Card',
    hasDefaultSlotContent: this.slotText.hasContent,
    onDefaultSlotChange: this.slotText.handleSlotChange,
  });
}
```

### Anatomy of the options object

Three kinds of option. Each consumer supplies only the ones it needs:

| Kind | Example | Purpose |
|---|---|---|
| Static value | `cardClass: string` | Data the template needs to compute a class name or attribute; supplied by every consumer |
| Optional render callback | `renderGlyph?: () => TemplateResult \| typeof nothing` | A region only some consumers use; defaults to `() => nothing` so the template doesn't have to branch on whether it was passed |
| Event handler pass-through | `onDefaultSlotChange?: (event: Event) => void` | Wires up an event listener in the shared markup while the handler logic and state (a controller, a property) stay owned by the calling component |

The template function itself has no state, no lifecycle, and is not a class: it is a pure function of its options, called fresh on every `render()`.

### When to use a shared render template

- Two or more **concrete components** render the same structural anatomy: the same wrapper elements, the same slot layout, the same conditional regions.
- The differences between consumers can be expressed as options: a handful of static values, optional render callbacks for regions not every consumer needs, and pass-through event handlers.
- Flag the opportunity as early as migration prep, the same way a `_lit-styles/` CSS-fragment candidate gets flagged, so the shared file gets created (or extended) as part of the plan rather than discovered as duplication after the fact.

### Where the template file lives

- **One component owns the family:** `card-template.ts` lives inside `card/`, the directory of the component that owns the shared anatomy; other variants import it by relative path. Use this when there is a clear primary component and the others are its variants.
- **No single component owns the shared structure:** for example, a form-field template shared across `text-field`, `text-area`, `number-field`, `picker`, and `combobox`, none of which is a variant of another. There is not yet a settled convention for this case. Decide during that migration's planning phase whether to host the template in whichever field component migrates first (mirroring the `card` precedent) or introduce a dedicated shared location (mirroring `_lit-styles/` at `swc/stylesheets/_lit-styles/`, for example a `swc/components/_lit-templates/` directory). Record the decision in the migration plan rather than let it be decided implicitly by whichever component happens to migrate first.

### When not to use a shared render template

- Only one component will ever render the markup: inline it in `render()`, or use a same-file [helper function](#helper-functions) if it is reused within that one file.
- The shared part is CSS only, not markup structure: use a [`_lit-styles/` fragment](../01_css/07_stylesheets.md#shared-lit-css-fragments-lit-styles) instead.
- The variation between consumers cannot be cleanly expressed as a small options object (for example, fundamentally different slot sets). Forcing it into one shared template produces an options object full of flags that fight each other. Leave the markup duplicated until a clearer shared shape emerges, or split into two smaller shared templates.

```ts
// ✅ Good — options are independent and each has a sensible default
renderCardTemplate({
  cardClass: 'ProductCard',
  renderGlyph: () => this.renderPriceBadge(),
});

// ❌ Bad — options that only make sense in combination, or that contradict
// each other, are a sign the shared template is modeling two different
// things. Split it instead of adding a mode flag to switch anatomy.
renderCardTemplate({
  cardClass: 'ProductCard',
  isCompact: true,
  isExpanded: true, // contradicts isCompact — the template has to guess
});
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

## Inline CSS strings from component properties

Some components accept a property whose value is a CSS string — for example, `<swc-color-loupe>` exposes a `color` property that accepts any valid CSS color. When the value must influence rendering, set it as a **CSS custom property via `styleMap`**, and have the component's stylesheet consume that custom property.

```ts
// ColorLoupe.ts
<div
  class="swc-ColorLoupe-colorFill"
  style=${styleMap({
    '--swc-color-loupe-picked-color': this.color,
  })}
></div>
```

```css
/* color-loupe.css */
.swc-ColorLoupe-colorFill {
  background: var(--swc-color-loupe-picked-color);
}
```

When a property value reaches an inline `style` attribute — directly or via `styleMap` — the browser's CSS parser reads it verbatim. That means:

- **Only accept CSS strings from trusted sources.** Component properties that participate in an inline `style` (or a `styleMap` entry) must be treated as trusted input. Do not expose such properties to arbitrary user-generated content without validation at the call site.
- **Use a CSS custom property, not a full declaration.** Set `--swc-<component>-<role>: ${value}` via `styleMap` rather than interpolating an entire declaration. This scopes what the property can affect to what the component's CSS explicitly consumes.
- **Document the contract on the property.** The property's JSDoc must state that the value is passed to the CSS parser as-is and that callers are responsible for ensuring it is a valid, trusted CSS value.

```ts
// ✅ Good — typed CSS property, scoped via a custom property
style=${styleMap({
  '--swc-color-loupe-picked-color': this.color,
})}

// ❌ Bad — full inline declaration interpolated from a property.
//    The entire declaration is re-parsed on every render, and a malformed
//    value can corrupt adjacent styles. Always route property values through
//    a custom property that the stylesheet consumes explicitly.
style="background: ${this.color}"
```
## Shadow root customization

To customize shadow root options (e.g., enabling `delegatesFocus`), always use the static `shadowRootOptions` property. **Never override `createRenderRoot()`** to set shadow root options.

**Why this matters:** Lit's default `createRenderRoot()` calls `adoptStyles()` to inject the component's CSS into the shadow DOM via `adoptedStylesheets`. Any `createRenderRoot()` override that does not call `super.createRenderRoot()` silently bypasses this step — the component renders, but no styles are applied and no error is thrown.

**Correct pattern:**

```ts
// ✅ Good — uses the documented Lit API; default createRenderRoot() runs adoptStyles()
export abstract class ButtonBase extends SizedMixin(SpectrumElement, {
  validSizes: BUTTON_VALID_SIZES,
}) {
  static override shadowRootOptions: ShadowRootInit = {
    ...SpectrumElement.shadowRootOptions,
    delegatesFocus: true,
  };
}
```

**Anti-pattern:**

```ts
// ❌ Bad — bypasses adoptStyles(); all component CSS is silently ignored
export abstract class ButtonBase extends SpectrumElement {
  protected override createRenderRoot(): ShadowRoot {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }
}
```

The spreading of `...SpectrumElement.shadowRootOptions` (or the parent class's `shadowRootOptions`) preserves any options set by the base class, such as `mode: 'open'`.

**When `createRenderRoot()` is appropriate:**

Override `createRenderRoot()` only when you need to change the render target itself (e.g., rendering into the light DOM instead of a shadow root). In those cases, call `super.createRenderRoot()` or manually call `adoptStyles()` to preserve style injection:

```ts
// ✅ Acceptable — light DOM render target, adoptStyles called manually
import { adoptStyles, unsafeCSS } from 'lit';

protected override createRenderRoot(): Element {
  adoptStyles(this, (this.constructor as typeof LitElement).elementStyles);
  return this;
}
```

This scenario is rare in SWC components. If you find yourself considering it, discuss with the team first.
