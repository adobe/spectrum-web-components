# TL;DR of Component CSS Guidelines

## Reference Documents

- **Working examples:** [badge.css](../../../../2nd-gen/packages/swc/components/badge/badge.css), [status-light.css](../../../../2nd-gen/packages/swc/components/status-light)
- **Main rules:** [01_component-css](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/01_component-css.md)
- **Custom property decisions:** [02_custom-properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md)
- **PR self-check:** [03_component-css-pr-checklist](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/03_component-css-pr-checklist.md)

---

## ✅ Correct Pattern

```css
:host {
  display: inline-block;
}

* {
  box-sizing: border-box;
}

.swc-Badge {
  --_swc-badge-border-width: token('border-width-200');

  min-block-size: var(--swc-badge-height, token('component-height-100'));
  background: var(
    --swc-badge-background-color,
    token('accent-background-color-default')
  );
}

:host([size='s']) {
  --swc-badge-height: token('component-height-75');
}

:host([variant='positive']) {
  --swc-badge-background-color: token('positive-background-color-default');
}

.swc-Badge--magenta:where(.swc-Badge--subtle) {
  --swc-badge-background-color: token('magenta-background-color-default');
}
```

---

## ❌ Anti-Patterns

```css
/*
- visual styles are incorrectly on :host
- legacy --mod-* indirection is preserved
- hardcoded values instead of token()
- selector specificity is too high
*/
:host {
  padding: 8px;
  background: var(--mod-badge-background, var(--swc-badge-background-color));
}

.swc-Badge.swc-Badge--large.swc-Badge--primary {
  padding: 16px;
}
```

> **[Review all Anti-Patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md)**

---

## Rules Summary

### 1. `:host` vs Component Class

Put only layout-participation styles on `:host`. Put actual visuals on `.swc-ComponentName` or internal parts.

**Exception**: three categories of styles may legitimately live on `:host` — each for a distinct reason: UA resets when the browser applies default styles directly to the host element (for example, the native popover stylesheet); transition properties (`opacity`, `transition-*`, `transition-behavior: allow-discrete`) when the host is itself the transition target (for example, when `@starting-style` applies to the host); and positioning surface (`position: absolute`, `inset: auto`, dimension constraints) when an external controller such as a placement controller writes coordinates directly to the host element.

→ See [01_component-css#when-to-use-host](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/01_component-css.md#when-to-use-host)

### 2. Stylesheet Order

Follow the prescribed stylesheet order to manage specificity and reduce selector conflicts.
→ See [01_component-css#rule-order](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/01_component-css.md#rule-order)

### 3. Custom Properties

Use `token()` for design token values. Use `--swc-*` only for intentionally exposed override points, and `--_swc-*` for internal/private properties. Do not keep old `--mod-*` chains.

Every exposed `--swc-*` property must be documented with a `@cssprop` JSDoc tag on the primary component class export (the SWC layer class, not the core base). Storybook picks these up automatically and surfaces them in the API docs panel.

```ts
/**
 * @cssprop --swc-button-height - Block size of the button. Defaults to the medium component height token.
 * @cssprop --swc-button-border-radius - Corner radius. Defaults to half the component height (pill shape).
 */
export class Button extends ButtonBase { … }
```

→ See [02_custom-properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md)

### 4. Attribute Selectors vs Modifier Classes

Use `:host([size="..."])` and `:host([variant="..."])` for consumer-settable attributes that should expose a customization surface. Use `.swc-ComponentName--modifier` for:

- Implementation details that should not expose overrides (non-semantic color variants, static color, geometric modifiers)
- **Derived states** — visual modes computed from slot content or internal logic, not set by consumers (e.g. icon-only layout derived from `hasIcon && !hasLabel`). These must never appear as a host attribute; apply them via `classMap` in the template.

```typescript
// ✅ Derived state as a class modifier — not a consumer attribute
class=${classMap({ 'swc-Button': true, 'swc-Button--iconOnly': this.hasIcon && !this.hasLabel })}
```

→ See [01_component-css#when-to-use-classes-vs-attributes](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/01_component-css.md#when-to-use-classes-vs-attributes)

### 5. Vertical spacing tokens

When migrating block padding, use `component-padding-vertical-{scale}` (S2). **Do not carry forward** `component-top-to-text-{scale}` or `component-bottom-to-text-{scale}` from S1/Spectrum CSS — those were offset hacks to compensate for glyph positioning in the old typeface. Adobe Clean VF corrected the glyph position, so the offsets no longer produce visually centered text in S2 components.

→ See [01_component-css#vertical-spacing-tokens](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/01_component-css.md#vertical-spacing-tokens-component-padding-vertical--vs-component-top-to-text-)

### 6. Selector specificity

Keep selector specificity at or below `(0,1,0)`. If you need a compounded selector, use `:where()` on the extra class instead of stacking specificity. Don't use higher-specificity selectors to "win."
→ See [01_component-css#managing-specificity](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/01_component-css.md#managing-specificity) and [05_anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md)

### 7. Forced colors

Only add `@media (forced-colors: active)` if browser defaults are not conveying correct semantic intent, and always put it at the end of the component stylesheet.
→ See [01_component-css#forced-colors-requirements](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/01_component-css.md#forced-colors-requirements)

### 8. Browser API selectors

Prefer native CSS pseudo-classes over attribute selectors when one exists for the same state (`:host(:popover-open)` not `:host([open])`; `:host(:disabled)` not `:host([disabled])`). Use attribute selectors for custom attributes and ARIA states with no native pseudo-class.
→ See [01_component-css#state-implementation-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/01_component-css.md#state-implementation-patterns)

### 9. Sub-element inheritance

When a sub-element must always match a variant-driven property on the parent, use `inherit` rather than repeating the `var()` reference in each variant rule.
→ See [01_component-css#variant-implementation-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/01_component-css.md#variant-implementation-patterns)

### 10. Compound pseudo-classes on `:host()` via CSS nesting

CSS nesting inside a `:host([...])` rule — e.g. `&:dir(rtl)` — expands to `:host([...]):dir(rtl)`, which chains the pseudo-class **outside** the `:host()` argument. Browsers do not support this; the rule silently fails with no parse error.

```css
/* ❌ Silent failure: :dir(rtl) is outside :host() */
:host([placement='start']:popover-open) {
  &:dir(rtl) {
    transform: translateX(1rem);
  }
}

/* ✅ All conditions inside the :host() argument */
:host(:dir(rtl)[placement='start']:popover-open) {
  transform: translateX(1rem);
}
```

**Exception**: when the parent selector targets a descendant (e.g. `:host([...]) .swc-Child`), nesting `&:dir(rtl)` correctly applies `:dir()` to the inner element — that is valid and fine.

**Migration note**: `:dir()` is a common place this surfaces. Whenever you add `:dir()` to a `:host`-level rule, write a separate `:host(:dir(rtl)[...])` rule instead of nesting.
→ See [05_anti-patterns#9](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md#9-nesting-compound-pseudo-classes-on-host-via-css-nesting)
