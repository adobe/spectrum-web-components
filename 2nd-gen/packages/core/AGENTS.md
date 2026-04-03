# Core Package — Agent Guide

`@spectrum-web-components/core` is the shared foundation for both 1st-gen and 2nd-gen Spectrum Web Components. It holds abstract base classes, types, mixins, controllers, and utilities — but **no rendering, no CSS, and no element registration**. Rendering and registration live in the SWC package (`2nd-gen/packages/swc/`) or in 1st-gen component packages.

---

## Directory structure

```
core/
├── element/          # SpectrumElement base class, defineElement helper, version tracking
├── mixins/           # SizedMixin, ObserveSlotPresence, ObserveSlotText
├── controllers/      # LanguageResolutionController
├── utils/            # capitalize, getLabelFromSlot
└── components/       # One folder per component
    └── badge/
        ├── Badge.base.ts    # Abstract base class — logic only, no render()
        ├── Badge.types.ts   # Const arrays, enums, TypeScript types
        └── index.ts         # Re-exports
```

Each component folder follows this exact three-file pattern. Do not deviate from it.

---

## How core relates to 1st-gen and 2nd-gen

Both generations **extend the same base class** from core. Core is the single source of truth for shared component logic.

```
core/Badge.base.ts (abstract)
    ├── 1st-gen/packages/badge/src/Badge.ts  → extends BadgeBase, S1 variants, 1st-gen render()
    └── 2nd-gen/packages/swc/badge/Badge.ts  → extends BadgeBase, S2 variants, 2nd-gen render()
```

1st-gen resolves `@spectrum-web-components/core/*` imports via a `tsconfig.json` path alias pointing at `2nd-gen/packages/core/*/dist`. **Core must be built before 1st-gen can compile.**

---

## Key patterns

### Mixin composition

Base classes are built by chaining mixins onto `SpectrumElement`:

```typescript
export abstract class BadgeBase extends SizedMixin(
  ObserveSlotText(ObserveSlotPresence(SpectrumElement, '[slot="icon"]'), ''),
  { noDefaultSize: true }
) { ... }
```

- `SpectrumElement` — extends `LitElement`; adds `dir`, `VERSION`, `CORE_VERSION`, and `hasVisibleFocusInTree()`
- `SizedMixin` — standardizes `size` attribute (`xxs`–`xxl`); validates against the component's `VALID_SIZES`
- `ObserveSlotPresence` — sets `slotContentIsPresent: boolean` when a selector is slotted
- `ObserveSlotText` — sets `slotHasContent: boolean` when a slot has non-empty text

### Variant and const arrays (types file)

Define canonical option lists as `const` arrays in `Component.types.ts`. The base class exposes them as `static readonly` fields. Separate S1 and S2 arrays where the options differ.

```typescript
// Badge.types.ts
export const BADGE_VARIANTS_COLOR_S1 = ['gray', 'red', ...]
export const BADGE_VARIANTS_COLOR_S2 = [...BADGE_VARIANTS_COLOR_S1, 'pink', 'turquoise', ...]
export const BADGE_VARIANTS_S1 = [...BADGE_VARIANTS_SEMANTIC, ...BADGE_VARIANTS_COLOR_S1]
export const BADGE_VARIANTS_S2 = [...BADGE_VARIANTS_SEMANTIC, ...BADGE_VARIANTS_COLOR_S2]
```

```typescript
// Badge.base.ts
static readonly VARIANTS_COLOR = BADGE_VARIANTS_COLOR_S2; // SWC overrides this
static readonly VARIANTS = BADGE_VARIANTS_S2;             // SWC overrides this
```

The SWC and 1st-gen concrete classes override these statics for their generation. Use the arrays for runtime validation, Storybook `argTypes`, and tests — never duplicate the values.

### Debug warnings (`window.__swc.warn()`)

Use debug-only warnings for invalid prop combinations or accessibility issues. These run only when `window.__swc?.DEBUG` is true and have no production cost.

```typescript
if (window.__swc?.DEBUG) {
  if (!this.VARIANTS.includes(this.variant)) {
    window.__swc.warn(
      this,
      `"${this.variant}" is not a valid variant.`,
      'https://...',
      { type: 'api' }
    );
  }
}
```

Place validation in `update()` or property setters. See `Badge.base.ts` for a complete example.

### Element registration

Registration happens in the SWC package, not core:

```typescript
// swc/components/badge/index.ts
import { defineElement } from '@spectrum-web-components/core/element/index.js';
defineElement('swc-badge', Badge);
```

`defineElement` warns in debug mode if an element name is registered more than once.

### Language/locale

For components that format numbers or dates, use `LanguageResolutionController`:

```typescript
private languageResolver = new LanguageResolutionController(this);
// Resolved locale: this.languageResolver.language
new Intl.NumberFormat(this.languageResolver.language, { style: 'percent' }).format(value);
```

Resolution order: `sp-language-context` event → `<html lang>` → `navigator.language` → `'en-US'`.

---

## Import paths

Always import from the top-level subpath exports, not from internal file paths:

```typescript
// Correct
import { BadgeBase } from '@spectrum-web-components/core/components/badge';
import { SizedMixin } from '@spectrum-web-components/core/mixins';
import { SpectrumElement } from '@spectrum-web-components/core/element';

// Wrong — do not import from dist or src directly
import { BadgeBase } from '@spectrum-web-components/core/components/badge/dist/Badge.base.js';
```

---

## Adding a new component to core

1. Create `core/components/<name>/` with `Component.base.ts`, `Component.types.ts`, and `index.ts`.
2. Add exports to `core/package.json` under `"exports"`.
3. Build core before testing any downstream imports from 1st-gen or SWC.

Use [Badge](./components/badge/) as the reference implementation.

---

## What does NOT belong in core

- `render()` — goes in the SWC concrete class
- CSS / `static get styles()` — goes in SWC
- `customElements.define()` / `defineElement()` — goes in SWC `index.ts`
- S2-only props (e.g. `subtle`, `outline`) — goes in SWC, with a `@todo` to move to base once 1st-gen is removed
