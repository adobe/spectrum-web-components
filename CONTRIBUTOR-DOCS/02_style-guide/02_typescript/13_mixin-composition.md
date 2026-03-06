<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [2nd-gen TypeScript](README.md) / Mixin composition

<!-- Document title (editable) -->

# Mixin composition

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Mixin pattern](#mixin-pattern)
- [Composition order](#composition-order)
- [Options objects](#options-objects)
    - [SizedMixin options](#sizedmixin-options)
    - [ObserveSlotText options](#observeslottext-options)
    - [ObserveSlotPresence options](#observeslotpresence-options)
- [Available mixins](#available-mixins)
    - [SizedMixin](#sizedmixin)
    - [ObserveSlotText](#observeslottext)
    - [ObserveSlotPresence](#observeslotpresence)
- [Writing a new mixin](#writing-a-new-mixin)

</details>

<!-- Document content (editable) -->

This guide explains how mixins work in 2nd-gen and how to compose them correctly.

## Mixin pattern

A mixin is a function that takes a class and returns a new class with added behavior. In 2nd-gen, mixins follow this pattern:

```ts
function MyMixin<T extends Constructor<ReactiveElement>>(
  constructor: T,
  options?: { ... }
): T & Constructor<MyMixinInterface> {
  class MixedElement extends constructor {
    // Added properties and methods
  }
  return MixedElement;
}
```

The mixin:

1. Takes a constructor (the class to extend)
2. Optionally takes an options object
3. Returns a new class that extends the constructor
4. Adds properties, methods, or lifecycle callbacks

## Composition order

When a base class uses multiple mixins, they are **nested** — the outermost mixin wraps the innermost. The innermost mixin is closest to `SpectrumElement`.

```ts
// Innermost → outermost
export abstract class BadgeBase extends SizedMixin(
  ObserveSlotText(ObserveSlotPresence(SpectrumElement, '[slot="icon"]')),
  { validSizes: BADGE_VALID_SIZES, noDefaultSize: true }
) {
```

Reading inside out:

1. `SpectrumElement` — the base element
2. `ObserveSlotPresence(SpectrumElement, '[slot="icon"]')` — adds slot presence detection
3. `ObserveSlotText(...)` — adds slot text observation
4. `SizedMixin(...)` — adds the `size` property with options

The order matters when mixins depend on each other. For example, `ObserveSlotText` depends on the DOM being available, so it wraps after `ObserveSlotPresence`.

```ts
// ✅ Good — innermost → outermost
SizedMixin(
  ObserveSlotText(ObserveSlotPresence(SpectrumElement, '[slot="icon"]')),
  { validSizes: BADGE_VALID_SIZES }
)

// ❌ Bad — reversed order
ObserveSlotPresence(
  SizedMixin(ObserveSlotText(SpectrumElement), {}),
  '[slot="icon"]'
)
```

Not every component uses all three mixins. Use only the ones you need:

```ts
// Status Light — uses SizedMixin only
export abstract class StatusLightBase extends SizedMixin(SpectrumElement, {
  noDefaultSize: true,
}) {

// Divider — uses SizedMixin only
export abstract class DividerBase extends SizedMixin(SpectrumElement, {
  validSizes: DIVIDER_VALID_SIZES,
  noDefaultSize: true,
}) {

// Asset — no mixins at all
export abstract class AssetBase extends SpectrumElement {
```

## Options objects

Each mixin can accept an options object as the second argument. Options go directly in the `extends` clause.

### SizedMixin options

| Option | Type | Default | Purpose |
|--------|------|---------|---------|
| `validSizes` | `readonly ElementSize[]` | `['s', 'm', 'l', 'xl']` | Which sizes the component accepts |
| `noDefaultSize` | `boolean` | `false` | If `true`, the component has no default size |
| `defaultSize` | `ElementSize` | `'m'` | The default size when no size is set |

**Example — Badge with custom valid sizes and no default:**

```ts
SizedMixin(SpectrumElement, {
  validSizes: BADGE_VALID_SIZES,
  noDefaultSize: true,
})
```

**Example — Progress Circle with custom valid sizes:**

```ts
SizedMixin(SpectrumElement, {
  validSizes: PROGRESS_CIRCLE_VALID_SIZES,
})
```

### ObserveSlotText options

`ObserveSlotText` takes the slot name and excluded selectors as positional arguments (not an options object):

| Argument | Type | Default | Purpose |
|----------|------|---------|---------|
| `slotName` | `string \| undefined` | `undefined` (default slot) | Which slot to observe |
| `excludedSelectors` | `string[]` | `[]` | Elements to exclude from text detection |

**Example — Badge observing the default slot:**

```ts
ObserveSlotText(SpectrumElement)
```

### ObserveSlotPresence options

`ObserveSlotPresence` takes the light DOM selector as a positional argument:

| Argument | Type | Purpose |
|----------|------|---------|
| `lightDomSelector` | `string \| string[]` | Selector(s) for direct children to observe |

**Example — Badge observing the icon slot:**

```ts
ObserveSlotPresence(SpectrumElement, '[slot="icon"]')
```

## Available mixins

### SizedMixin

Adds a reactive `size` property with validation. When an invalid size is set, it falls back to the default. The size is reflected to the `size` attribute.

**File:** `core/mixins/sized-mixin.ts`

**Adds to the class:**

- `size` property (public getter/setter)
- `VALID_SIZES` static readonly array
- `update()` lifecycle override (sets default size attribute)

**Interface:** `SizedElementInterface` (`{ size: ElementSize }`)

### ObserveSlotText

Observes text content in a slot. Uses a `MutationController` to watch for character data changes. Sets `slotHasContent` to `true` when the slot has non-empty text.

**File:** `core/mixins/observe-slot-text.ts`

**Adds to the class:**

- `slotHasContent` property (boolean, not reflected)
- `manageTextObservedSlot()` method
- `update()` lifecycle override (checks child nodes before first render)
- `firstUpdated()` lifecycle override (manages slot content after first render)
- A `MutationController` observing `characterData` changes

**Interface:** `SlotTextObservingInterface` (`{ slotHasContent: boolean; manageTextObservedSlot(): void }`)

### ObserveSlotPresence

Observes whether specific elements are present in the light DOM. Uses a `MutationController` to watch for child list changes. Useful for detecting whether optional slots (like an icon slot) have content.

**File:** `core/mixins/observe-slot-presence.ts`

**Adds to the class:**

- `slotContentIsPresent` getter (boolean, throws if multiple selectors)
- `getSlotContentPresence(selector)` method (for multiple selectors)
- `managePresenceObservedSlot()` method
- A `MutationController` observing `childList` changes

**Interface:** `SlotPresenceObservingInterface` (`{ slotContentIsPresent: boolean; getSlotContentPresence(selector: string): boolean; managePresenceObservedSlot(): void }`)

## Writing a new mixin

When creating a new mixin, follow this pattern:

1. **Define an interface** for the public API the mixin adds
2. **Define a `Constructor` type** (or import the shared one)
3. **Write the mixin function** that takes a constructor and options, returns the extended class
4. **Export the mixin function and interface** from the barrel `index.ts`

```ts
import { ReactiveElement } from 'lit';

type Constructor<T = Record<string, unknown>> = {
  new (...args: any[]): T;
  prototype: T;
};

export interface MyBehaviorInterface {
  myProperty: string;
}

export function MyBehaviorMixin<T extends Constructor<ReactiveElement>>(
  constructor: T,
  options?: { defaultValue?: string }
): T & Constructor<MyBehaviorInterface> {
  class MyBehaviorElement extends constructor {
    public myProperty: string = options?.defaultValue ?? '';
  }
  return MyBehaviorElement;
}
```

Key rules:

- The mixin function takes `Constructor<ReactiveElement>` as the first argument
- The options object is the second argument (optional)
- The return type includes `Constructor<MyBehaviorInterface>` so consumers get type safety
- Define an interface that describes the public API
- Place the mixin in `core/mixins/` and export from `core/mixins/index.ts`
