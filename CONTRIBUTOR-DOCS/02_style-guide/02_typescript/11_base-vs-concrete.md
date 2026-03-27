<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [2nd-gen TypeScript](README.md) / Base class vs concrete class

<!-- Document title (editable) -->

# Base class vs concrete class

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Why two classes](#why-two-classes)
- [Core (base class) responsibilities](#core-base-class-responsibilities)
- [SWC (concrete class) responsibilities](#swc-concrete-class-responsibilities)
- [Decision guide](#decision-guide)
- [Common mistakes](#common-mistakes)

</details>

<!-- Document content (editable) -->

This guide explains the split between the **base class** (in the core package) and the **concrete class** (in the SWC package). Understanding this split is key to putting code in the right place.

## Why two classes

Spectrum Web Components supports two generations side by side: 1st-gen (S1) and 2nd-gen (S2). Both generations share the same behavior — validation, state management, accessibility logic — but they look different and support slightly different value sets.

The base class in core holds the **shared** behavior. The concrete class in SWC adds the **generation-specific** parts: styles, rendering, and value overrides.

This split means:

- Fixing a bug in the base class fixes it for both generations at once
- Adding a new feature to the base class makes it available to both generations
- Changing the look of S2 does not affect S1, and vice versa

## Core (base class) responsibilities

The base class lives in `core/components/<name>/Component.base.ts`. It handles:

| Responsibility | Example |
|----------------|---------|
| **Shared properties** | `indeterminate`, `label`, `progress`, `fixed` |
| **Overridable statics** | `VARIANTS`, `VALID_SIZES`, `STATIC_COLORS` |
| **Validation logic** | Checking `variant` against valid values in `update()` |
| **Accessibility setup** | Setting `role="separator"` in `firstUpdated()` |
| **ARIA management** | Adding/removing `aria-orientation` in `updated()` |
| **Mixin composition** | Extending `SizedMixin(SpectrumElement, ...)` |
| **Controllers** | Attaching `LanguageResolutionController` |

The base class does **not**:

- Import or define styles (no CSS)
- Call `render()` (no template)
- Register the custom element (no `defineElement`)
- Import Lit directives like `classMap` or `when`

**Example — Badge.base.ts responsibilities:**

```ts
export abstract class BadgeBase extends SizedMixin(
  ObserveSlotText(ObserveSlotPresence(SpectrumElement, '[slot="icon"]')),
  { validSizes: BADGE_VALID_SIZES, noDefaultSize: true }
) {
  // API TO OVERRIDE: VARIANTS, VALID_SIZES, variant
  // SHARED API: FIXED_VALUES, VARIANTS_SEMANTIC, fixed getter/setter
  // IMPLEMENTATION: hasIcon getter, update() validation
}
```

## SWC (concrete class) responsibilities

The concrete class lives in `swc/components/<name>/Component.ts`. It handles:

| Responsibility | Example |
|----------------|---------|
| **Overriding statics** | Setting `VARIANTS_COLOR` to the S2 value set |
| **Overriding property types** | Narrowing `variant` to `BadgeVariant` |
| **Generation-specific properties** | `subtle`, `outline` (S2-only) |
| **Styles** | Returning `[styles]` from `get styles()` |
| **Rendering** | The `render()` method with the HTML template |
| **Lit directives** | `classMap`, `when`, `ifDefined` in templates |

**Example — Badge.ts responsibilities:**

```ts
export class Badge extends BadgeBase {
  // API OVERRIDES: VARIANTS_COLOR, VARIANTS, VALID_SIZES, variant
  // API ADDITIONS: subtle, outline
  // RENDERING & STYLING: get styles(), render()
}
```

## Decision guide

When you are not sure where to put code, use this table:

| Question | Answer → Location |
|----------|-------------------|
| Does it use `html` or `css` from Lit? | **SWC** (concrete) |
| Does it validate property values? | **Core** (base) |
| Does it set ARIA attributes? | **Core** (base) |
| Is it a `render()` method? | **SWC** (concrete) |
| Is it a property shared across S1 and S2? | **Core** (base) |
| Is it a property only in S2? | **SWC** (concrete), in `API ADDITIONS` |
| Does it import a directive (`classMap`, `when`)? | **SWC** (concrete) |
| Does it attach a controller? | **Core** (base) |
| Does it use a mixin? | **Core** (base), in the `extends` clause |
| Is it a static array of valid values? | **Core** (base), in `API TO OVERRIDE` |

**Rule of thumb:** If it has nothing to do with how the component looks, it belongs in core. If it touches styles, templates, or generation-specific values, it belongs in SWC.

## Common mistakes

**Putting styles in the base class:**

```ts
// ❌ Bad — styles belong in the concrete class
export abstract class BadgeBase extends SpectrumElement {
  public static override get styles() {
    return [styles];
  }
}

// ✅ Good — styles are in the concrete class
export class Badge extends BadgeBase {
  public static override get styles() {
    return [styles];
  }
}
```

**Putting validation in the concrete class:**

```ts
// ❌ Bad — validation belongs in the base class
export class Badge extends BadgeBase {
  protected override update(changedProperties: PropertyValues): void {
    super.update(changedProperties);
    if (!this.constructor.VARIANTS.includes(this.variant)) { ... }
  }
}

// ✅ Good — validation is in the base class
export abstract class BadgeBase extends SizedMixin(...) {
  protected override update(changedProperties: PropertyValues): void {
    super.update(changedProperties);
    if (window.__swc?.DEBUG) {
      if (!this.constructor.VARIANTS.includes(this.variant)) { ... }
    }
  }
}
```

**Putting S2-only properties in the base class:**

```ts
// ❌ Bad — subtle is S2-only, it should not be in the base
export abstract class BadgeBase extends SizedMixin(...) {
  @property({ type: Boolean, reflect: true })
  public subtle: boolean = false;
}

// ✅ Good — subtle is in the concrete class under API ADDITIONS
export class Badge extends BadgeBase {
  // ───────────────────
  //     API ADDITIONS
  // ───────────────────

  /**
   * @todo This can be moved to the base class once we are no longer maintaining 1st-gen.
   */
  @property({ type: Boolean, reflect: true })
  public subtle: boolean = false;
}
```
