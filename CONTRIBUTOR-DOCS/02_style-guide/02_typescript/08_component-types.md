<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [2nd-gen TypeScript](README.md) / Component types

<!-- Document title (editable) -->

# Component types

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Purpose](#purpose)
- [File location and naming](#file-location-and-naming)
- [Naming conventions](#naming-conventions)
    - [Constant prefixes](#constant-prefixes)
    - [Type names](#type-names)
    - [S1-only suffixing rule](#s1-only-suffixing-rule)
- [File structure](#file-structure)
    - [Section order](#section-order)
    - [Section separators](#section-separators)
- [Constant patterns](#constant-patterns)
    - [Sizes](#sizes)
    - [Variants with S1/S2 split](#variants-with-s1s2-split)
    - [Variants without S1/S2 split](#variants-without-s1s2-split)
    - [Static colors](#static-colors)
    - [Non-variant constants](#non-variant-constants)
- [Type derivation patterns](#type-derivation-patterns)
- [S1 removal strategy](#s1-removal-strategy)
    - [Dependency direction](#dependency-direction)
    - [Removing S1](#removing-s1)
- [Reference template](#reference-template)
- [Anti-patterns](#anti-patterns)
    - [Suffixing S2 names](#suffixing-s2-names)
    - [S2 arrays spreading from S1](#s2-arrays-spreading-from-s1)
    - [Union types for base class](#union-types-for-base-class)
    - [Widening with explicit type annotations](#widening-with-explicit-type-annotations)
    - [Mixing shared and S1 content without separators](#mixing-shared-and-s1-content-without-separators)
    - [Merged multi-word prefixes](#merged-multi-word-prefixes)
- [Checklist](#checklist)

</details>

<!-- Document content (editable) -->

This guide defines patterns for the `*.types.ts` files in `core/components/*/`. These files contain the shared constants and types that both 1st-gen and 2nd-gen component classes consume.

> **Note:** This guide was migrated from `02_style-guide/03_component-types.md`. The original file has been removed.

## Purpose

Types files serve three goals:

1. **Define valid values** — sizes, variants, static colors, and other enumerable properties as `as const` arrays
2. **Derive TypeScript types** — narrow union types extracted from those arrays for compile-time safety
3. **Support multi-generation coexistence** — separate S1-only values from the canonical set so S1 can be cleanly removed later

## File location and naming

| Item | Convention | Example |
| ---- | ---------- | ------- |
| Location | `core/components/{component}/` | `core/components/badge/` |
| File name | `{Component}.types.ts` | `Badge.types.ts` |
| Export | Barrel-exported from `index.ts` | `export * from './Badge.types.js';` |

## Naming conventions

### Constant prefixes

Use the component name in `UPPER_SNAKE_CASE` with underscores separating words:

| Component | Prefix |
| --------- | ------ |
| Badge | `BADGE_` |
| Status Light | `STATUS_LIGHT_` |
| Progress Circle | `PROGRESS_CIRCLE_` |
| Action Button | `ACTION_BUTTON_` |

Do not merge multi-word names (e.g., `STATUSLIGHT_`). Consistent underscore separators make constants greppable and predictable.

**Renaming existing merged prefixes:** If a component's types file in core already uses a merged prefix (e.g., `STATUSLIGHT_`), rename the constants to the underscore-separated form (`STATUS_LIGHT_`) in core. To avoid a breaking change in 1st-gen, re-export the old name as a deprecated alias from the 1st-gen package:

```typescript
// 1st-gen/packages/status-light/src/StatusLight.ts
import { STATUS_LIGHT_VARIANTS_S1 } from '@spectrum-web-components/core/components/status-light';

/**
 * @deprecated Use `STATUS_LIGHT_VARIANTS_S1` instead.
 */
export const STATUSLIGHT_VARIANTS_S1 = STATUS_LIGHT_VARIANTS_S1;
```

This keeps the canonical name correct in core while giving 1st-gen consumers a migration path.

### Type names

Use the component name in `PascalCase` matching the class name:

| Component | Type prefix | Example |
| --------- | ----------- | ------- |
| Badge | `Badge` | `BadgeVariant`, `BadgeSize` |
| Status Light | `StatusLight` | `StatusLightVariant` |
| Progress Circle | `ProgressCircle` | `ProgressCircleStaticColor` |

### S1-only suffixing rule

**Unsuffixed names are the canonical (S2) values.** Only S1-specific values get a suffix.

| Scope | Name example | When to use |
| ----- | ------------ | ----------- |
| Canonical (S2) | `BADGE_VARIANTS_COLOR` | Values supported in 2nd-gen |
| Canonical (S2) | `BadgeVariant` | Type for 2nd-gen consumers |
| S1-only | `BADGE_VARIANTS_COLOR_S1` | Subset of values for 1st-gen |
| S1-only | `BadgeVariantS1` | Type for 1st-gen consumers |

This means:

- 2nd-gen SWC classes import clean, unsuffixed names — no aliasing needed
- 1st-gen classes import `_S1`-suffixed names and narrow types explicitly
- When S1 is removed, no renames or breaking changes affect 2nd-gen consumers

> **Never suffix with `_S2`.** If a constant or type has `_S2` in its name, it should be renamed to the unsuffixed version.

## File structure

### Section order

Organize the file in this order:

1. **Copyright header**
2. **Imports** (typically only `ElementSize` from core mixins)
3. **Shared constants** — sizes (e.g., `BADGE_VALID_SIZES`), canonical base arrays (e.g., `BADGE_VARIANTS_COLOR`, `BADGE_VARIANTS_SEMANTIC`), non-variant constants (e.g., `FIXED_VALUES`)
4. **S1-only constants** — subset arrays exclusive to 1st-gen, validated against canonical types via `satisfies` (e.g., `BADGE_VARIANTS_COLOR_S1`, `BADGE_VARIANTS_S1`)
5. **Canonical constants** — composed arrays that spread from shared bases (e.g., `BADGE_VARIANTS`)
6. **Types** — shared types (e.g., `BadgeSize`, `BadgeColorVariant`), then S1-only types (e.g., `BadgeVariantS1`), then canonical types (e.g., `BadgeVariant`)

Canonical base arrays (like `BADGE_VARIANTS_COLOR`) belong in the shared section because they define the source-of-truth values that both generations reference. S1 subset arrays validate against the canonical type, and canonical composed arrays spread from the shared bases. This ensures S1 arrays can use `satisfies` against canonical types defined earlier in the file.

In practice, sections 4 and 5 are only needed when S1 and S2 support different value sets for the same property. If there is no S1/S2 split (e.g., Asset variants), only the shared section is needed.

### Section separators

Use the same ASCII separator pattern as base and SWC classes:

```typescript
// ──────────────────
//     SHARED
// ──────────────────

// ──────────────────────────────────────────
//     S1-ONLY (remove with 1st-gen)
// ──────────────────────────────────────────

// ──────────────────
//     CANONICAL
// ──────────────────

// ──────────────────
//     TYPES
// ──────────────────
```

The `S1-ONLY (remove with 1st-gen)` label makes removal mechanical — delete everything between that separator and the next.

## Constant patterns

Constants use `as const` to preserve literal types. When a shared constraint type exists, add `satisfies` to get compile-time validation of each value. The two patterns serve different purposes:

| Pattern | Purpose | When to use |
| ------- | ------- | ----------- |
| `as const` | Preserves literal types for type derivation | All constant arrays |
| `as const satisfies readonly T[]` | Adds compile-time validation against a shared type | When a constraint type exists (sizes, static colors) |
| `as const satisfies readonly CanonicalType[]` | Validates S1 values are a subset of the canonical set | S1 subset arrays where the canonical type is defined in SHARED |

> **When to introduce `satisfies` for a new category:** If a shared constraint type is added to core (e.g., a `StaticColor` type for `'white' | 'black'`), update the guidance here and add `satisfies` to the corresponding constant pattern. The rule is: `satisfies` is warranted when a cross-component type already exists to validate against. For S1 subset arrays, `satisfies` against the canonical type is warranted because the canonical base array is always defined in SHARED before the S1-ONLY section.

### Sizes

Sizes validate against the shared `ElementSize` union defined in `SizedMixin`. Use `as const satisfies readonly ElementSize[]` to catch typos at compile time:

```typescript
import type { ElementSize } from '@spectrum-web-components/core/mixins/index.js';

export const BADGE_VALID_SIZES = ['s', 'm', 'l', 'xl'] as const satisfies readonly ElementSize[];
```

This gives you:

- **Narrow literal tuple type** — TypeScript infers `readonly ['s', 'm', 'l', 'xl']`
- **Compile-time validation** — a typo like `'small'` fails because it doesn't satisfy `ElementSize`

The `readonly` in `satisfies readonly T[]` is required because `as const` produces a readonly tuple, which cannot be assigned to a mutable array type.

Do not add an explicit type annotation (e.g., `: ElementSize[]`) — it widens the type back to a mutable array, negating the benefit of `as const`.

### Variants with S1/S2 split

When S1 and S2 support different variant sets, define the canonical base arrays in the SHARED section, then compose each generation from them. S1 subset arrays go in the S1-ONLY section and validate against the canonical type:

```typescript
// ── SHARED ──

// Semantic variants shared across both generations
export const BADGE_VARIANTS_SEMANTIC = [
    'accent',
    'informative',
    'neutral',
    'positive',
    'notice',
    'negative',
] as const;

// Canonical color set (source of truth)
export const BADGE_VARIANTS_COLOR = [
    'fuchsia',
    'indigo',
    'magenta',
    'purple',
    'seafoam',
    'yellow',
    'pink',
    'turquoise',
    'brown',
    'cinnamon',
    'silver',
] as const;

// ── S1-ONLY (remove with 1st-gen) ──

// S1 subset — satisfies ensures all values exist in the canonical set
export const BADGE_VARIANTS_COLOR_S1 = [
    'fuchsia',
    'indigo',
    'magenta',
    'purple',
    'seafoam',
    'yellow',
] as const satisfies readonly BadgeColorVariant[];

export const BADGE_VARIANTS_S1 = [
    ...BADGE_VARIANTS_SEMANTIC,
    ...BADGE_VARIANTS_COLOR_S1,
] as const;

// ── CANONICAL ──

export const BADGE_VARIANTS = [
    ...BADGE_VARIANTS_SEMANTIC,
    ...BADGE_VARIANTS_COLOR,
] as const;
```

**Key rules:**

- **Canonical base arrays go in SHARED** — `BADGE_VARIANTS_COLOR` defines the source-of-truth values and must be available before the S1-ONLY section so `satisfies` can reference its derived type
- **S1 subset arrays validate against the canonical type** — `satisfies readonly BadgeColorVariant[]` catches invalid S1 values at compile time (e.g., a color that was removed from the canonical set)
- **Canonical arrays never reference S1 arrays** — each array is self-contained or spreads only from shared constants. This prevents deletion of S1 content from breaking canonical arrays
- **CANONICAL section contains only composed arrays** — arrays that spread from shared bases (e.g., `BADGE_VARIANTS` combines semantic and color)

### Variants without S1/S2 split

When both generations share the same values, a single constant is sufficient. No S1 or S2 section is needed.

```typescript
export const ASSET_VARIANTS = ['file', 'folder'] as const;
```

### Static colors

Follow the same shared/S1/canonical pattern as variants:

```typescript
export const PROGRESS_CIRCLE_STATIC_COLORS_S1 = ['white'] as const;

export const PROGRESS_CIRCLE_STATIC_COLORS = ['white', 'black'] as const;
```

Static colors also have a small, known set of valid values (`'white'` and `'black'`). If the project defines a shared `StaticColor` constraint type, use `satisfies` to validate. Otherwise, `as const` is sufficient since the values are self-evident.

### Non-variant constants

Constants that are not split across generations (e.g., `FIXED_VALUES` for Badge) belong in the shared section with no suffix:

```typescript
export const FIXED_VALUES = [
    'block-start',
    'block-end',
    'inline-start',
    'inline-end',
] as const;
```

## Type derivation patterns

All types are derived from constants using indexed access:

```typescript
export type BadgeVariant = (typeof BADGE_VARIANTS)[number];
```

Group types at the bottom of the file in this order:

1. **Shared types** — derived from shared constants (including canonical base arrays)

    ```typescript
    export type FixedValues = (typeof FIXED_VALUES)[number];
    export type BadgeSize = (typeof BADGE_VALID_SIZES)[number];
    export type BadgeSemanticVariant = (typeof BADGE_VARIANTS_SEMANTIC)[number];
    export type BadgeColorVariant = (typeof BADGE_VARIANTS_COLOR)[number];
    ```

2. **S1-only types** — mark with an inline comment for removal

    ```typescript
    export type BadgeColorVariantS1 = (typeof BADGE_VARIANTS_COLOR_S1)[number]; // @todo remove with 1st-gen
    export type BadgeVariantS1 = (typeof BADGE_VARIANTS_S1)[number]; // @todo remove with 1st-gen
    ```

3. **Canonical types** — the clean, unsuffixed names that 2nd-gen consumers use

    ```typescript
    export type BadgeVariant = (typeof BADGE_VARIANTS)[number];
    ```

> **No union types needed.** Because the canonical set (S2) is always a superset of S1, `BadgeVariant` already covers all valid values. The base class uses the canonical type, and S1 consumers narrow to the `_S1` type via `override`.

## S1 removal strategy

### Dependency direction

The dependency always flows toward S1:

```text
Shared constants (base arrays + canonical types)
    ←── Canonical composed arrays spread from shared
    ←── S1 arrays validate against shared types via satisfies
```

This means:

- **Canonical base arrays and types live in SHARED** — `BADGE_VARIANTS_COLOR` and `BadgeColorVariant` are defined before S1-ONLY
- **S1 arrays validate against canonical types** — `BADGE_VARIANTS_COLOR_S1` uses `satisfies readonly BadgeColorVariant[]`
- **Canonical composed arrays never reference S1 arrays** — `BADGE_VARIANTS` does not spread `BADGE_VARIANTS_S1`
- **S1 arrays may spread from shared arrays** — `BADGE_VARIANTS_S1` spreads `BADGE_VARIANTS_SEMANTIC` (shared)
- **Deleting S1 content never breaks shared or canonical content**

### Removing S1

When 1st-gen is retired, the removal process for each types file is:

1. Delete the `S1-ONLY` section (constants and types)
2. Delete the `S1-ONLY` section separator
3. Remove the `@todo` comment about S1 removal
4. Optionally, if a shared constant was only shared for S1's benefit and is identical to the canonical array, inline it

No renames. No changes to canonical type names. No breaking changes for 2nd-gen consumers.

## Reference template

A complete types file for a component with sized variants and an S1/S2 color split:

```typescript
/**
 * Copyright 2026 Adobe. All rights reserved.
 * ...license header...
 */

/*
 * @todo The S1 types can be removed once we are no longer maintaining 1st-gen.
 */

import type { ElementSize } from '@spectrum-web-components/core/mixins/index.js';

// ──────────────────
//     SHARED
// ──────────────────

export const COMPONENT_VALID_SIZES = [
    's',
    'm',
    'l',
    'xl',
] as const satisfies readonly ElementSize[];

export const COMPONENT_VARIANTS_SEMANTIC = [
    'accent',
    'informative',
    'neutral',
    'positive',
    'notice',
    'negative',
] as const;

export const COMPONENT_VARIANTS_COLOR = [
    'fuchsia',
    'indigo',
    'magenta',
    'pink',
    'turquoise',
] as const;

// ──────────────────────────────────────────
//     S1-ONLY (remove with 1st-gen)
// ──────────────────────────────────────────

export const COMPONENT_VARIANTS_COLOR_S1 = [
    'fuchsia',
    'indigo',
    'magenta',
] as const satisfies readonly ComponentColorVariant[];

export const COMPONENT_VARIANTS_S1 = [
    ...COMPONENT_VARIANTS_SEMANTIC,
    ...COMPONENT_VARIANTS_COLOR_S1,
] as const;

// ──────────────────
//     CANONICAL
// ──────────────────

export const COMPONENT_VARIANTS = [
    ...COMPONENT_VARIANTS_SEMANTIC,
    ...COMPONENT_VARIANTS_COLOR,
] as const;

// ──────────────────
//     TYPES
// ──────────────────

// Shared
export type ComponentSize = (typeof COMPONENT_VALID_SIZES)[number];
export type ComponentSemanticVariant = (typeof COMPONENT_VARIANTS_SEMANTIC)[number];
export type ComponentColorVariant = (typeof COMPONENT_VARIANTS_COLOR)[number];

// S1-only (remove with 1st-gen)
export type ComponentColorVariantS1 = (typeof COMPONENT_VARIANTS_COLOR_S1)[number]; // @todo remove with 1st-gen
export type ComponentVariantS1 = (typeof COMPONENT_VARIANTS_S1)[number]; // @todo remove with 1st-gen

// Canonical
export type ComponentVariant = (typeof COMPONENT_VARIANTS)[number];
```

## Anti-patterns

### Suffixing S2 names

```typescript
// ❌ Creates a future rename burden
export const BADGE_VARIANTS_S2 = [...] as const;
export type BadgeVariantS2 = ...;

// ✅ Unsuffixed names are canonical (S2)
export const BADGE_VARIANTS = [...] as const;
export type BadgeVariant = ...;
```

### S2 arrays spreading from S1

```typescript
// ❌ Deleting S1 breaks S2
export const BADGE_VARIANTS_COLOR_S2 = [
    ...BADGE_VARIANTS_COLOR_S1,
    'pink',
] as const;

// ✅ S2 (canonical) is self-contained
export const BADGE_VARIANTS_COLOR = [
    'fuchsia',
    'indigo',
    'pink',
] as const;
```

### Union types for base class

```typescript
// ❌ Unnecessary indirection
export type BadgeVariant = BadgeVariantS1 | BadgeVariantS2;

// ✅ Canonical type already covers the full set
export type BadgeVariant = (typeof BADGE_VARIANTS)[number];
```

Since S2 is a superset of S1, the canonical type works for the base class. S1 consumers narrow via `override`.

### Widening with explicit type annotations

```typescript
// ❌ : ElementSize[] widens the type, negating as const
export const SIZES: ElementSize[] = ['s', 'm'] as const satisfies readonly ElementSize[];

// ✅ Let the type be inferred from as const
export const SIZES = ['s', 'm'] as const satisfies readonly ElementSize[];
```

### Mixing shared and S1 content without separators

```typescript
// ❌ No clear boundary — which lines are S1?
export const BADGE_VARIANTS_SEMANTIC = [...] as const;
export const BADGE_VARIANTS_COLOR = [...] as const;
export const BADGE_VARIANTS_COLOR_S1 = [...] as const;

// ✅ Separated and labeled — canonical base arrays in SHARED, S1 subset validates against them
// ── SHARED ──
export const BADGE_VARIANTS_SEMANTIC = [...] as const;
export const BADGE_VARIANTS_COLOR = [...] as const;

// ── S1-ONLY (remove with 1st-gen) ──
export const BADGE_VARIANTS_COLOR_S1 = [...] as const satisfies readonly BadgeColorVariant[];
```

### Merged multi-word prefixes

```typescript
// ❌ Inconsistent, hard to grep
export const STATUSLIGHT_VARIANTS = [...] as const;

// ✅ Underscore-separated, consistent
export const STATUS_LIGHT_VARIANTS = [...] as const;
```

## Checklist

Use this when creating or reviewing a types file:

- [ ] File is in `core/components/{component}/` and named `{Component}.types.ts`
- [ ] Barrel-exported from `index.ts`
- [ ] Constants use `UPPER_SNAKE_CASE` with underscored component prefix
- [ ] Types use `PascalCase` matching the component class name
- [ ] No `_S2` suffix on any constant or type
- [ ] Only S1-specific items have the `_S1` suffix
- [ ] Sizes use `as const satisfies readonly ElementSize[]` without explicit type annotation
- [ ] Variant arrays use `as const`
- [ ] Canonical base arrays (e.g., color variants) are in the SHARED section
- [ ] S1 subset arrays use `satisfies readonly CanonicalType[]` to validate against canonical types
- [ ] Canonical composed arrays do not spread from S1 arrays
- [ ] S1 arrays spread only from shared constants or are self-contained
- [ ] Sections are separated with ASCII separators (shared, S1-only, canonical, types)
- [ ] S1-only section is labeled `(remove with 1st-gen)`
- [ ] S1-only types have an inline `// @todo remove with 1st-gen` comment
- [ ] Types are derived via `(typeof CONSTANT)[number]` indexed access
- [ ] No union types combining S1 and S2 (canonical type is sufficient)
- [ ] `@todo` comment at top of file references S1 removal
