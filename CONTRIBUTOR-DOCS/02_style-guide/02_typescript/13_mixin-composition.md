<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [2nd-gen TypeScript](README.md) / Mixin composition

<!-- Document title (editable) -->

# Mixin composition

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Mixin pattern](#mixin-pattern)
- [Mixin depth limit](#mixin-depth-limit)
- [Composition order](#composition-order)
- [Options objects](#options-objects)
    - [SizedMixin options](#sizedmixin-options)
- [Available mixins](#available-mixins)
    - [SizedMixin](#sizedmixin)
    - [DisabledMixin](#disabledmixin)
    - [PendingMixin](#pendingmixin)
    - [LinearProgressMixin](#linearprogressmixin)
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

## Mixin depth limit

**Target: maximum 2 mixins** (plus `SpectrumElement`)

Complex mixin chains (3+ mixins deep) are harder to debug and understand. If a component needs more than 2 mixins worth of behavior, use a controller (composed as an instance field) for the rest instead of nesting a 3rd mixin.

**Acceptable (depth ≤ 2):**

```ts
// Depth 2: LinearProgressMixin → SizedMixin → SpectrumElement
export abstract class ProgressBarBase extends LinearProgressMixin(
  SizedMixin(SpectrumElement, {
    validSizes: LINEAR_PROGRESS_VALID_SIZES,
    defaultSize: 'm',
  })
) {
```

**Slot observation is a controller, not a mixin:**

Slot presence/text observation used to be handled by `ObserveSlotPresence`/`ObserveSlotText` mixins, which pushed some base classes past the depth-2 target when combined with `SizedMixin`. They were replaced by `SlotPresenceController`/`SlotTextController` (see [Controller composition](14_controller-composition.md)), composed as instance fields rather than nested in `extends`:

```ts
export abstract class BadgeBase extends SizedMixin(SpectrumElement, {
  noDefaultSize: true,
}) {
  protected slotPresence = new SlotPresenceController(this, '[slot="icon"]');
  protected slotText = new SlotTextController(this);
}
```

This is the general pattern: when a mixin's behavior doesn't need to add to the component's type/public API in a way subclasses override, prefer a controller so it doesn't count against mixin depth.

**Refactoring example:**

If you need focus management, validation, and locale-aware formatting:

```ts
// ❌ Too deep — 3 mixins
FocusableMixin(ValidatableMixin(LocaleMixin(SpectrumElement)))

// ✅ Better — 2 mixins + 1 controller
export abstract class MyComponentBase extends FocusableMixin(
  ValidatableMixin(SpectrumElement)
) {
  private localeController = new LanguageResolutionController(this);
}
```

## Composition order

When a base class uses multiple mixins, they are **nested** — the outermost mixin wraps the innermost. The innermost mixin is closest to `SpectrumElement`.

```ts
// Innermost → outermost
export abstract class ProgressBarBase extends LinearProgressMixin(
  SizedMixin(SpectrumElement, {
    validSizes: LINEAR_PROGRESS_VALID_SIZES,
    defaultSize: 'm',
  })
) {
```

Reading inside out:

1. `SpectrumElement` — the base element
2. `SizedMixin(SpectrumElement, {...})` — adds the `size` property
3. `LinearProgressMixin(...)` — adds `value`/`minValue`/`maxValue`, locale-aware formatting, and label/description slot-presence tracking

These two are orthogonal (no dependency ordering required), but `SizedMixin` is conventionally applied innermost since `size` is the most broadly shared property across components.

Not every component uses a mixin. Use only what you need:

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

`DisabledMixin`, `PendingMixin`, and `LinearProgressMixin` take no options object; they're configured entirely through the properties they add.

## Available mixins

For the full inventory (what each one does and which components use it), see [2nd-gen shared resources](../../01_contributor-guides/16_2nd-gen-shared-resources.md#mixins). Composition specifics:

### SizedMixin

Adds a reactive `size` property with validation. When an invalid size is set, it falls back to the default. The size is reflected to the `size` attribute.

**File:** `core/mixins/sized-mixin.ts`

**Adds to the class:**

- `size` property (public getter/setter)
- `VALID_SIZES` static readonly array
- `update()` lifecycle override (sets default size attribute)

**Interface:** `SizedElementInterface` (`{ size: ElementSize }`)

### DisabledMixin

Adds a reactive `disabled` property. Sets `aria-disabled` on the host (not the native `disabled` attribute), manages tabindex removal/restoration, and blurs the element if it's focused when disabled becomes `true`. See [Focus management](../../01_contributor-guides/14_focus-management.md#disabledmixin).

**File:** `core/mixins/disabled-mixin.ts`

**Adds to the class:**

- `disabled` property (boolean, reflected)

**Interface:** `DisabledInterface` (`{ disabled: boolean }`)

### PendingMixin

Adds `pending`/`pending-label` properties and capture-phase click suppression while pending, backed by a `PendingController` for delayed busy-state activation, size freeze, and accessible-name derivation. Applied on the concrete element rather than the shared `*Base` class, e.g. `Button extends PendingMixin(ButtonBase)`.

**File:** `core/mixins/pending-mixin.ts`

**Adds to the class:**

- `pending` property (boolean, reflected)
- `pendingLabel` property (string, attribute `pending-label`)
- `pendingActive` getter
- `getPendingAccessibleName()` method
- `renderPendingState()` method (renders the pending spinner)
- click-suppression listener wired in `connectedCallback()`/`disconnectedCallback()`

**Interface:** `PendingInterface`

### LinearProgressMixin

Shared value/label/percent-format logic for linear-progress-shaped components. Internally composes a `SlotPresenceController` to track `label`/`description` slot presence.

**File:** `core/mixins/linear-progress-mixin.ts`

**Adds to the class:**

- `value`, `minValue`, `maxValue` properties
- Locale-aware value formatting
- `label`/`description` slot-presence tracking

**Interface:** `LinearProgressInterface`

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
