<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [2nd-gen TypeScript](README.md) / Interface composition

<!-- Document title (editable) -->

# Interface composition

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [When to use interface vs type](#when-to-use-interface-vs-type)
- [Mixin interfaces](#mixin-interfaces)
- [Global type augmentation](#global-type-augmentation)
- [The Constructor type pattern](#the-constructor-type-pattern)
- [Naming rules](#naming-rules)

</details>

<!-- Document content (editable) -->

This guide explains how TypeScript interfaces are used in 2nd-gen components.

## When to use interface vs type

In 2nd-gen, `interface` and `type` serve different purposes:

| Use `interface` when | Use `type` when |
|---------------------|-----------------|
| Describing the shape of a class or object | Deriving a union from `as const` arrays |
| Declaring a mixin's public API | Defining a helper type (e.g. `Constructor<T>`) |
| Augmenting global types (`HTMLElementTagNameMap`) | Creating component variant types |

**Rule of thumb:** Use `interface` for structural contracts (what methods and properties exist). Use `type` for unions and derived types (what values are valid).

```ts
// ✅ Good — interface for a structural contract
export interface SizedElementInterface {
  size: ElementSize;
}

// ✅ Good — type for a derived union
export type BadgeVariant = (typeof BADGE_VARIANTS)[number];

// ❌ Bad — using type for a structural contract
export type SizedElementInterface = {
  size: ElementSize;
};

// ❌ Bad — using interface for a union (not possible anyway)
// Interfaces cannot represent unions
```

## Mixin interfaces

Every mixin should have a matching interface that describes the public API it adds. This interface is used in the mixin's return type to provide type safety for consumers.

**Example — SizedMixin interface (sized-mixin.ts):**

```ts
export interface SizedElementInterface {
  size: ElementSize;
}

export interface SizedElementConstructor {
  readonly VALID_SIZES: readonly ElementSize[];
}
```

`SizedElementInterface` describes instance members (`size`). `SizedElementConstructor` describes static members (`VALID_SIZES`). Both are used in the return type of `SizedMixin`:

```ts
export function SizedMixin<T extends Constructor<ReactiveElement>>(
  constructor: T,
  options?: { ... }
): T & Constructor<SizedElementInterface> & SizedElementConstructor {
```

**Example — ObserveSlotText interface (observe-slot-text.ts):**

```ts
export interface SlotTextObservingInterface {
  slotHasContent: boolean;
  manageTextObservedSlot(): void;
}
```

**Example — ObserveSlotPresence interface (observe-slot-presence.ts):**

```ts
export interface SlotPresenceObservingInterface {
  slotContentIsPresent: boolean;
  getSlotContentPresence(selector: string): boolean;
  managePresenceObservedSlot(): void;
}
```

Key rules:

- Name the interface with the mixin's purpose plus `Interface` (e.g. `SizedElementInterface`)
- Include all public properties and methods the mixin adds
- Export the interface from the same file as the mixin
- Re-export from the barrel `index.ts`

## Global type augmentation

The SWC `index.ts` files augment the global `HTMLElementTagNameMap` interface. This tells TypeScript what type `document.querySelector('swc-badge')` returns.

```ts
declare global {
  interface HTMLElementTagNameMap {
    'swc-badge': Badge;
  }
}
```

This is the only place where `interface` is used with `declare global`. It is a TypeScript declaration merging feature — multiple files can add entries to `HTMLElementTagNameMap`, and TypeScript merges them all.

```ts
// ✅ Good — in the SWC index.ts file
declare global {
  interface HTMLElementTagNameMap {
    'swc-badge': Badge;
  }
}
defineElement('swc-badge', Badge);

// ❌ Bad — in the wrong file
// This belongs in the SWC index.ts, not in the base class or types file
```

## The Constructor type pattern

Mixins use a `Constructor` type to describe the base class they accept. This is defined locally in each mixin file:

```ts
type Constructor<T = Record<string, unknown>> = {
  new (...args: any[]): T;
  prototype: T;
};
```

This type says: "any class constructor that creates instances of type `T`." It allows the mixin to accept any `ReactiveElement` subclass:

```ts
function SizedMixin<T extends Constructor<ReactiveElement>>(
  constructor: T,
  options?: { ... }
): T & Constructor<SizedElementInterface> {
```

The `Constructor` type is currently defined separately in each mixin file. If a shared version is needed in the future, it could be extracted to a utility module.

## Naming rules

| Item | Convention | Example |
|------|-----------|---------|
| Mixin instance interface | `{Purpose}Interface` | `SizedElementInterface` |
| Mixin constructor interface | `{Purpose}Constructor` | `SizedElementConstructor` |
| Element base interface | `{Element}Interface` | `SpectrumInterface` |
| No `I` prefix | — | `SizedElementInterface`, not `ISizedElement` |
| No `T` prefix for types | — | `Constructor<T>`, not `TConstructor<T>` |

```ts
// ✅ Good
export interface SizedElementInterface { ... }
export interface SizedElementConstructor { ... }

// ❌ Bad — I prefix
export interface ISizedElement { ... }

// ❌ Bad — missing Interface suffix
export interface SizedElement { ... }
```
