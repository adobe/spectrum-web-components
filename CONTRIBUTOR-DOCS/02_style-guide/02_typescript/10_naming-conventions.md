<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [2nd-gen TypeScript](README.md) / Naming conventions

<!-- Document title (editable) -->

# Naming conventions

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Class names](#class-names)
- [Property and method names](#property-and-method-names)
- [Type names](#type-names)
- [Constant names](#constant-names)
- [File names](#file-names)
- [Custom element tag names](#custom-element-tag-names)

</details>

<!-- Document content (editable) -->

This guide lists the naming rules for all identifiers in 2nd-gen components.

## Class names

Use **PascalCase**. Base classes end with `Base`. Concrete classes use the plain component name.

| Class | Pattern | Example |
|-------|---------|---------|
| Base class | `{Component}Base` | `BadgeBase`, `StatusLightBase`, `ProgressCircleBase` |
| Concrete class | `{Component}` | `Badge`, `StatusLight`, `ProgressCircle` |

Multi-word component names keep each word capitalized: `StatusLight`, not `Statuslight`.

```ts
// ✅ Good
export abstract class BadgeBase extends SizedMixin(...) { }
export class Badge extends BadgeBase { }

// ❌ Bad — missing Base suffix
export abstract class Badge extends SizedMixin(...) { }

// ❌ Bad — lowercase word
export abstract class StatuslightBase extends SizedMixin(...) { }
```

## Property and method names

Use **camelCase** for all properties and methods.

| Member | Example |
|--------|---------|
| Public property | `variant`, `staticColor`, `indeterminate` |
| Protected getter | `hasIcon` |
| Private backing field | `_fixed`, `_variant` |
| Lifecycle method | `firstUpdated`, `connectedCallback` |
| Event handler | `handleKeydown`, `handleSlotchange` |
| Private helper | `formatProgress`, `isValidVariant` |
| Controller | `languageResolver` |

**Private backing fields** start with an underscore: `_fixed`, `_variant`, `_size`. No other properties use an underscore prefix.

```ts
// ✅ Good
public staticColor?: ProgressCircleStaticColor;
private _fixed?: FixedValues;
protected handleKeydown(event: KeyboardEvent): void { }

// ❌ Bad — snake_case
public static_color?: ProgressCircleStaticColor;

// ❌ Bad — underscore on non-backing field
private _isOpen = false; // should be: private isOpen = false;
```

The one exception for underscores is backing fields that pair with a custom getter/setter (see [Property patterns](05_property-patterns.md#backing-fields)).

## Type names

Use **PascalCase** matching the component class name. No `I` prefix for interfaces, no `T` prefix for types.

| Type | Example |
|------|---------|
| Component variant | `BadgeVariant`, `StatusLightVariant` |
| Component size | `BadgeSize`, `ProgressCircleSize` |
| Static color | `ProgressCircleStaticColor`, `DividerStaticColor` |
| Semantic variant | `BadgeSemanticVariant` |
| S1-only type | `BadgeVariantS1`, `BadgeColorVariantS1` |

See [Component types](08_component-types.md#type-names) for detailed naming and suffixing rules.

```ts
// ✅ Good
export type BadgeVariant = (typeof BADGE_VARIANTS)[number];

// ❌ Bad — I prefix
export interface IBadgeVariant { }

// ❌ Bad — T prefix
export type TBadgeVariant = string;
```

## Constant names

Use **UPPER_SNAKE_CASE** with an underscore-separated component prefix.

| Constant | Example |
|----------|---------|
| Valid sizes | `BADGE_VALID_SIZES`, `PROGRESS_CIRCLE_VALID_SIZES` |
| Variant arrays | `BADGE_VARIANTS_SEMANTIC`, `BADGE_VARIANTS_COLOR` |
| S1-only arrays | `BADGE_VARIANTS_COLOR_S1` |
| Non-variant constants | `FIXED_VALUES`, `DIVIDER_STATIC_COLORS` |

Multi-word component names use underscores: `STATUS_LIGHT_`, not `STATUSLIGHT_`.

See [Component types](08_component-types.md#constant-prefixes) for the full prefix rules.

```ts
// ✅ Good
export const STATUS_LIGHT_VARIANTS_SEMANTIC = [...] as const;

// ❌ Bad — merged prefix
export const STATUSLIGHT_VARIANTS_SEMANTIC = [...] as const;

// ❌ Bad — camelCase
export const statusLightVariants = [...] as const;
```

## File names

Files use **PascalCase** for the component name and a dot-separated suffix that indicates the file's role.

| File | Pattern | Example |
|------|---------|---------|
| Base class | `{Component}.base.ts` | `Badge.base.ts` |
| Concrete class | `{Component}.ts` | `Badge.ts` |
| Types | `{Component}.types.ts` | `Badge.types.ts` |
| Styles | `{component}.css` (lowercase) | `badge.css` |
| Index | `index.ts` | `index.ts` |
| Tests | `{component}.test.ts` (lowercase) | `badge.test.ts` |
| A11y tests | `{component}.a11y.spec.ts` (lowercase) | `badge.a11y.spec.ts` |
| Stories | `{component}.stories.ts` (lowercase) | `badge.stories.ts` |

Note that TypeScript class files use PascalCase (`Badge.ts`), while CSS, test, and story files use lowercase (`badge.css`, `badge.test.ts`).

```text
✅ Good
Badge.base.ts
Badge.ts
Badge.types.ts
badge.css
badge.test.ts

❌ Bad
badge.base.ts       (should be PascalCase)
Badge.css            (should be lowercase)
Badge.test.ts        (should be lowercase)
```

## Custom element tag names

Custom element tags use the `swc-` prefix with lowercase kebab-case.

| Component | Tag name |
|-----------|----------|
| Badge | `swc-badge` |
| Status Light | `swc-status-light` |
| Progress Circle | `swc-progress-circle` |
| Alert Banner | `swc-alert-banner` |

```ts
// ✅ Good
defineElement('swc-badge', Badge);

// ❌ Bad — no prefix
defineElement('badge', Badge);

// ❌ Bad — camelCase
defineElement('swcBadge', Badge);
```
