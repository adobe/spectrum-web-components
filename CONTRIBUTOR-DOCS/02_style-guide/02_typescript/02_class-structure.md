<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [2nd-gen TypeScript](README.md) / Class structure

<!-- Document title (editable) -->

# Class structure

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
- [Two classes per component](#two-classes-per-component)
- [Base class (core)](#base-class-core)
    - [Section: API TO OVERRIDE](#section-api-to-override)
    - [Section: SHARED API](#section-shared-api)
    - [Section: IMPLEMENTATION](#section-implementation)
- [Concrete class (SWC)](#concrete-class-swc)
    - [Section: API OVERRIDES](#section-api-overrides)
    - [Section: API ADDITIONS](#section-api-additions)
    - [Section: RENDERING and STYLING](#section-rendering-and-styling)
- [Section comment format](#section-comment-format)
- [When to omit sections](#when-to-omit-sections)

</details>

<!-- Document content (editable) -->

This guide explains how to organize a component class in 2nd-gen. Every component has two classes: a **base class** in core and a **concrete class** in SWC. Each class uses section comments to group related code.

## Overview

The base class holds shared logic. The concrete class holds styles, rendering, and anything specific to 2nd-gen (S2). Code is split this way so 1st-gen and 2nd-gen can share the same behavior without duplicating it.

> **Reference implementation:** [Badge.base.ts](../../../2nd-gen/packages/core/components/badge/Badge.base.ts) (base) and [Badge.ts](../../../2nd-gen/packages/swc/components/badge/Badge.ts) (concrete).

## Two classes per component

| Class | Package | Location | Purpose |
|-------|---------|----------|---------|
| Base (abstract) | core | `core/components/<name>/Component.base.ts` | Shared behavior, validation, and API |
| Concrete | swc | `swc/components/<name>/Component.ts` | Styles, rendering, and 2nd-gen API |

The base class is `abstract`. You cannot create an instance of it directly. The concrete class extends the base and provides everything needed to render the component.

## Base class (core)

The base class is organized into up to three sections:

```text
API TO OVERRIDE    → Properties and statics that subclasses must set
SHARED API         → Properties and constants shared across all generations
IMPLEMENTATION     → Lifecycle methods, validation, and internal logic
```

### Section: API TO OVERRIDE

This section holds properties and static members that each concrete class **must** override. These differ between 1st-gen and 2nd-gen, so the base class declares them but does not set their final values.

**What goes here:**

- Static readonly arrays that vary by generation (e.g. `VARIANTS`, `VARIANTS_COLOR`, `STATIC_COLORS`)
- Properties whose valid values differ between S1 and S2 (e.g. `variant`)

**Example from Badge.base.ts:**

```ts
// ─────────────────────────
//     API TO OVERRIDE
// ─────────────────────────

/**
 * @internal
 */
static readonly VARIANTS_COLOR: readonly string[];

/**
 * @internal
 */
static readonly VARIANTS: readonly string[];

@property({ type: String, reflect: true })
public variant: BadgeVariant = 'informative';
```

**Example from Asset.base.ts:**

```ts
// ─────────────────────────
//     API TO OVERRIDE
// ─────────────────────────

/**
 * @internal
 */
static readonly VARIANTS: readonly AssetVariant[] = ASSET_VARIANTS;
```

### Section: SHARED API

This section holds properties, constants, and getters that are the **same** across all generations. They do not need to be overridden.

**What goes here:**

- Static constants that are the same in S1 and S2 (e.g. `FIXED_VALUES`, `VARIANTS_SEMANTIC`)
- Properties that are shared and not generation-specific (e.g. `fixed`, `indeterminate`, `label`, `progress`)
- Getters with backing fields (e.g. the `fixed` getter/setter with `_fixed`)

**Example from Badge.base.ts:**

```ts
// ──────────────────
//     SHARED API
// ──────────────────

/**
 * @internal
 */
static readonly FIXED_VALUES: readonly string[] = FIXED_VALUES;

/**
 * @internal
 */
static readonly VARIANTS_SEMANTIC: readonly string[] = BADGE_VARIANTS_SEMANTIC;

@property({ reflect: true })
public get fixed(): FixedValues | undefined {
  return this._fixed;
}

public set fixed(fixed: FixedValues | undefined) {
  // ...custom setter logic...
}

private _fixed?: FixedValues;
```

**Example from ProgressCircle.base.ts:**

```ts
// ──────────────────
//     SHARED API
// ──────────────────

@property({ type: Boolean, reflect: true })
public indeterminate = false;

@property({ type: String })
public label = '';

@property({ type: Number })
public progress = 0;
```

### Section: IMPLEMENTATION

This section holds lifecycle methods, validation logic, internal getters, and private helpers. Nothing in this section is part of the public API.

**What goes here:**

- Protected getters used by rendering (e.g. `hasIcon`)
- Lifecycle overrides (e.g. `update`, `firstUpdated`, `updated`)
- Validation logic (e.g. checking `variant` against `VARIANTS`)
- Private helper methods
- `@query` decorated properties

**Example from Badge.base.ts:**

```ts
// ──────────────────────
//     IMPLEMENTATION
// ──────────────────────

/**
 * @internal Used for rendering gap when the badge has an icon.
 */
protected get hasIcon(): boolean {
  return this.slotContentIsPresent;
}

protected override update(changedProperties: PropertyValues): void {
  super.update(changedProperties);
  if (window.__swc?.DEBUG) {
    // ...variant validation...
  }
}
```

## Concrete class (SWC)

The concrete class is organized into up to three sections:

```text
API OVERRIDES         → Values for properties declared in the base
API ADDITIONS         → New properties only in this generation (optional)
RENDERING & STYLING   → Styles and the render method
```

### Section: API OVERRIDES

This section sets the values that the base class declared in `API TO OVERRIDE`. It uses the `override` keyword.

**What goes here:**

- Static overrides for variant arrays and valid sizes
- Property overrides with narrowed types

**Example from Badge.ts:**

```ts
// ────────────────────
//     API OVERRIDES
// ────────────────────

/**
 * @internal
 */
static override readonly VARIANTS_COLOR = BADGE_VARIANTS_COLOR_S2;

/**
 * @internal
 */
static override readonly VARIANTS = BADGE_VARIANTS_S2;

/**
 * @internal
 */
static override readonly VALID_SIZES = BADGE_VALID_SIZES;

@property({ type: String, reflect: true })
public override variant: BadgeVariant = 'informative';
```

### Section: API ADDITIONS

This section holds properties that exist **only** in this generation. They are not declared in the base class. Use this section when 2nd-gen introduces new features that 1st-gen does not have.

**What goes here:**

- New properties specific to S2 (e.g. `subtle`, `outline`)

**Example from Badge.ts:**

```ts
// ───────────────────
//     API ADDITIONS
// ───────────────────

/**
 * Whether the badge is subtle.
 *
 * @todo This can be moved to the base class once we are no longer maintaining 1st-gen.
 */
@property({ type: Boolean, reflect: true })
public subtle: boolean = false;

/**
 * Whether the badge is outlined.
 *
 * Can only be used with semantic variants.
 *
 * @todo This can be moved to the base class once we are no longer maintaining 1st-gen.
 */
@property({ type: Boolean, reflect: true })
public outline: boolean = false;
```

Not every component has this section. If there are no generation-specific additions, omit it. For example, Status Light and Progress Circle do not have an `API ADDITIONS` section.

### Section: RENDERING and STYLING

This section holds the component's styles and `render()` method. Every concrete class has this section.

**What goes here:**

- The static `styles` getter or property
- The `render()` method

**Example from Badge.ts:**

```ts
// ──────────────────────────────
//     RENDERING & STYLING
// ──────────────────────────────

public static override get styles(): CSSResultArray {
  return [styles];
}

protected override render(): TemplateResult {
  return html`
    <div class=${classMap({ ['swc-Badge']: true })}>
      <!-- ...template content... -->
    </div>
  `;
}
```

## Section comment format

Section comments use ASCII box-drawing characters. The format has three lines:

```ts
// ─────────────────────────
//     SECTION NAME
// ─────────────────────────
```

Rules:

- The top and bottom lines use the `─` character (U+2500, "box drawings light horizontal").
- The section name is indented with 5 spaces after `//`.
- The line width varies to roughly match the section name length. It does not need to be exact.
- There is a blank line before each section separator.

```ts
// ✅ Good
// ─────────────────────────
//     API TO OVERRIDE
// ─────────────────────────

// ❌ Bad — uses dashes instead of box-drawing characters
// -------------------------
//     API TO OVERRIDE
// -------------------------

// ❌ Bad — uses a different comment style
/* ======================== */
/*     API TO OVERRIDE      */
/* ======================== */
```

## When to omit sections

Not every component needs all sections. Omit a section if it would be empty.

| Section | When to include |
|---------|----------------|
| `API TO OVERRIDE` | The base has properties that differ between S1 and S2 |
| `SHARED API` | The base has shared properties beyond what mixins provide |
| `IMPLEMENTATION` | The base has lifecycle methods, validation, or helpers |
| `API OVERRIDES` | The concrete class overrides anything from the base |
| `API ADDITIONS` | The concrete class adds generation-specific properties |
| `RENDERING & STYLING` | Always (every concrete class renders) |

For example, the Divider base class is simple enough that it does not use section separators. The Asset concrete class only has `RENDERING & STYLING` because it has no API overrides or additions.

When a component is simple, section comments are still recommended for consistency, but they are not strictly required if the class has only a few members and no logical grouping.
