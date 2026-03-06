<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [2nd-gen TypeScript](README.md) / File organization

<!-- Document title (editable) -->

# File organization

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [File organization](#file-organization)
  - [Copyright header](#copyright-header)
  - [Import grouping and order](#import-grouping-and-order)
    - [Group 1: Lit and external packages](#group-1-lit-and-external-packages)
    - [Group 2: Internal packages](#group-2-internal-packages)
    - [Group 3: Side-effect imports](#group-3-side-effect-imports)
    - [Group 4: Relative imports](#group-4-relative-imports)
    - [Group 5: Style imports](#group-5-style-imports)
    - [Import extensions](#import-extensions)
  - [File set per component](#file-set-per-component)
  - [Export patterns](#export-patterns)
    - [Core index.ts](#core-indexts)
    - [SWC index.ts](#swc-indexts)
  - [Where types files live](#where-types-files-live)

</details>

<!-- Document content (editable) -->

This guide explains how to organize files in 2nd-gen components. It covers the copyright header, how to order imports, what files each component needs, and how to set up exports.

## Copyright header

Every TypeScript file starts with the Apache 2.0 copyright header. The template lives at [`linters/HEADER.js`](../../../linters/HEADER.js) and the `<%= YEAR %>` placeholder is replaced with the current year. The linter automatically adds this header to new files, so you do not need to copy it manually. Do not change the wording.

## Import grouping and order

Imports are sorted into five groups, separated by blank lines. This order is enforced by ESLint (`simple-import-sort/imports`), so the linter will fix the order for you. But it helps to know the groups so you can write them correctly the first time.

### Group 1: Lit and external packages

Imports from `lit`, `@lit`, and any external package that is **not** `@adobe/spectrum-wc` or `@spectrum-web-components`.

```ts
import { CSSResultArray, html, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
```

### Group 2: Internal packages

Imports from `@adobe/spectrum-wc` or `@spectrum-web-components`.

```ts
import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';
import { SizedMixin } from '@spectrum-web-components/core/mixins/index.js';
import { ObserveSlotPresence } from '@spectrum-web-components/core/mixins/observe-slot-presence.js';
import { ObserveSlotText } from '@spectrum-web-components/core/mixins/observe-slot-text.js';
```

### Group 3: Side-effect imports

Imports that run code but don't export a binding (e.g. polyfills or registration). These are less common in component files.

```ts
import './some-polyfill.js';
```

### Group 4: Relative imports

Imports from the same package using relative paths (starting with `./` or `../`).

```ts
import {
  BADGE_VARIANTS_SEMANTIC,
  type BadgeVariant,
  FIXED_VALUES,
  type FixedValues,
} from './Badge.types.js';
```

### Group 5: Style imports

CSS imports. These always come last.

```ts
import styles from './badge.css';
```

### Import extensions

Use `.js` extensions for all imports. Never use `.ts` in import paths. This is enforced by the linter (`import/extensions`).

```ts
// ✅ Good
import { BadgeBase } from './Badge.base.js';

// ❌ Bad
import { BadgeBase } from './Badge.base.ts';
import { BadgeBase } from './Badge.base';
```

**Complete example from Badge.base.ts:**

```ts
// Group 1: Lit and external
import { PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

// Group 2: Internal packages
import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';
import { SizedMixin } from '@spectrum-web-components/core/mixins/index.js';
import { ObserveSlotPresence } from '@spectrum-web-components/core/mixins/observe-slot-presence.js';
import { ObserveSlotText } from '@spectrum-web-components/core/mixins/observe-slot-text.js';

// Group 4: Relative imports
import {
  BADGE_VARIANTS_SEMANTIC,
  type BadgeVariant,
  FIXED_VALUES,
  type FixedValues,
} from './Badge.types.js';
```

**Complete example from Badge.ts (concrete class):**

```ts
// Group 1: Lit and external
import { CSSResultArray, html, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';

// Group 2: Internal packages
import {
  BADGE_VALID_SIZES,
  BADGE_VARIANTS,
  BADGE_VARIANTS_COLOR,
  BadgeBase,
  type BadgeVariant,
} from '@spectrum-web-components/core/components/badge';

// Group 5: Style imports
import styles from './badge.css';
```

## File set per component

Each component has files in two packages: **core** and **swc**.

| Package | File | Purpose |
|---------|------|---------|
| core | `Component.base.ts` | Abstract base class with shared behavior |
| core | `Component.types.ts` | Constant arrays and TypeScript types |
| core | `index.ts` | Re-exports base class and types |
| swc | `Component.ts` | Concrete class with styles and rendering |
| swc | `component.css` | Component stylesheet |
| swc | `index.ts` | Registers the custom element and re-exports |

The core package also lives at `2nd-gen/packages/core/components/<name>/` and the swc package at `2nd-gen/packages/swc/components/<name>/`.

**Example for Badge:**

| File | Location |
|------|----------|
| `Badge.base.ts` | `core/components/badge/Badge.base.ts` |
| `Badge.types.ts` | `core/components/badge/Badge.types.ts` |
| `index.ts` | `core/components/badge/index.ts` |
| `Badge.ts` | `swc/components/badge/Badge.ts` |
| `badge.css` | `swc/components/badge/badge.css` |
| `index.ts` | `swc/components/badge/index.ts` |

## Export patterns

### Core index.ts

The core `index.ts` re-exports everything from the base class and the types file. It uses wildcard exports.

```ts
export * from './Badge.base.js';
export * from './Badge.types.js';
```

### SWC index.ts

The SWC `index.ts` does three things:

1. Registers the custom element using `defineElement`.
2. Re-exports the concrete class.
3. Declares the element in the global `HTMLElementTagNameMap`.

```ts
import { defineElement } from '@spectrum-web-components/core/element/index.js';

import { Badge } from './Badge.js';

export * from './Badge.js';
declare global {
  interface HTMLElementTagNameMap {
    'swc-badge': Badge;
  }
}
defineElement('swc-badge', Badge);
```

## Where types files live

Types files always live in the **core** package, not in swc. This is because types are shared between 1st-gen and 2nd-gen.

```text
2nd-gen/packages/core/components/badge/Badge.types.ts     ✅ Correct
2nd-gen/packages/swc/components/badge/Badge.types.ts      ❌ Wrong location
```

The concrete class in swc imports types from core through the package path:

```ts
import {
  type BadgeVariant,
} from '@spectrum-web-components/core/components/badge';
```

For more on type file patterns (naming, structure, S1/S2 split), see [Component types](08_component-types.md).
