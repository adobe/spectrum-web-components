<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [gen2 TypeScript](README.md) / File organization

<!-- Document title (editable) -->

# File organization

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Copyright header](#copyright-header)
- [Import grouping and order](#import-grouping-and-order)
    - [Group 1: Lit and external packages](#group-1-lit-and-external-packages)
    - [Group 2: Internal packages](#group-2-internal-packages)
    - [Group 3: Side-effect imports](#group-3-side-effect-imports)
    - [Group 4: Relative imports](#group-4-relative-imports)
    - [Group 5: Style imports](#group-5-style-imports)
    - [Import extensions](#import-extensions)
- [Core utilities](#core-utilities)
- [File set per component](#file-set-per-component)
- [Where types files live](#where-types-files-live)
- [Export patterns](#export-patterns)
    - [Core index.ts](#core-indexts)
    - [SWC index.ts](#swc-indexts)
- [Element registration](#element-registration)
    - [Tag name and dependencies](#tag-name-and-dependencies)
    - [SWC registration file](#swc-registration-file)

</details>

<!-- Document content (editable) -->

This guide explains how to organize files in gen2 components. It covers the copyright header, how to order imports, what files each component needs, and how to set up exports.

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
import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import { SizedMixin } from '@adobe/spectrum-wc-core/mixins/index.js';
import { ObserveSlotPresence } from '@adobe/spectrum-wc-core/mixins/observe-slot-presence.js';
import { ObserveSlotText } from '@adobe/spectrum-wc-core/mixins/observe-slot-text.js';
```

### Group 3: Side-effect imports

Imports that run code but don't export a binding (e.g. polyfills or registration). These are less common in component files.

```ts
import './some-polyfill.js';
```

Component modules never import another component's `swc-*.js` registration file. Import the class and list it in `static dependencies` instead. See [Element registration](#element-registration).

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

CSS imports. These always come last. Always use `styles` as the import name for consistency:

```ts
// ✅ Good
import styles from './badge.css';

// ❌ Bad — component-specific name
import progressCircleStyles from './progress-circle.css';
import badgeStyles from './badge.css';
```

### Import extensions

Use `.js` extensions for relative imports, including imports of `.ts` and `.tsx` files. Never use `.ts` in import paths. The linter (`import/extensions`) enforces this for relative imports, including in gen2 Storybook config. It skips package imports, because each package's `exports` map defines its valid paths, so follow that package's documented paths (for example, `lit/decorators.js`).

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
import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import { SizedMixin } from '@adobe/spectrum-wc-core/mixins/index.js';
import { ObserveSlotPresence } from '@adobe/spectrum-wc-core/mixins/observe-slot-presence.js';
import { ObserveSlotText } from '@adobe/spectrum-wc-core/mixins/observe-slot-text.js';

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
} from '@adobe/spectrum-wc-core/components/badge';

// Group 5: Style imports
import styles from './badge.css';
```

## Core utilities

The core package provides utility functions that concrete classes may import for rendering:

| Utility | Import path | Purpose |
|---------|------------|---------|
| `capitalize` | `@adobe/spectrum-wc-core/utils/index.js` | Capitalize a string for CSS class generation |

**Example from Divider.ts:**

```ts
import { capitalize } from '@adobe/spectrum-wc-core/utils/index.js';

// Used in render
[`swc-Divider--static${capitalize(this.staticColor)}`]: this.staticColor != null,
```

When you need additional utilities (e.g., string formatting, value clamping), check if one already exists in `core/utils/` before creating your own.

## File set per component

Each component has files in two packages: **core** and **swc**.

| Package | File | Purpose |
|---------|------|---------|
| core | `Component.base.ts` | Abstract base class with behavior and API |
| core | `Component.types.ts` | Constant arrays and TypeScript types |
| core | `index.ts` | Re-exports base class and types |
| swc | `Component.ts` | Concrete class with styles and rendering |
| swc | `component.css` | Component stylesheet |
| swc | `index.ts` | Re-exports the concrete class |
| swc | `swc-<tag>.ts` | Registers the custom element and its dependencies |

The core package also lives at `gen2/packages/core/components/<name>/` and the swc package at `gen2/packages/swc/components/<name>/`.

**Example for Badge:**

| File | Location |
|------|----------|
| `Badge.base.ts` | `core/components/badge/Badge.base.ts` |
| `Badge.types.ts` | `core/components/badge/Badge.types.ts` |
| `index.ts` | `core/components/badge/index.ts` |
| `Badge.ts` | `swc/components/badge/Badge.ts` |
| `badge.css` | `swc/components/badge/badge.css` |
| `index.ts` | `swc/components/badge/index.ts` |
| `swc-badge.ts` | `swc/components/badge/swc-badge.ts` |

## Where types files live

Types files always live in the **core** package, not in swc. This keeps the behavior layer (core) and the rendering layer (swc) cleanly separated.

```text
gen2/packages/core/components/badge/Badge.types.ts     ✅ Correct
gen2/packages/swc/components/badge/Badge.types.ts      ❌ Wrong location
```

The concrete class in swc imports types from core through the package path:

```ts
import {
  type BadgeVariant,
} from '@adobe/spectrum-wc-core/components/badge';
```

## Export patterns

### Core index.ts

The core `index.ts` re-exports everything from the base class and the types file. It uses wildcard exports.

```ts
export * from './Badge.base.js';
export * from './Badge.types.js';
```

### SWC index.ts

The SWC `index.ts` only re-exports the concrete class. It doesn't register anything, so importing the class has no side effects.

```ts
export * from './Badge.js';
```

For more on type file patterns (naming, structure, S1/S2 split), see [Component types](08_component-types.md).

## Element registration

The concrete class declares its tag and the elements it needs as static fields, and its `swc-<tag>.ts` file registers it. With this pattern, the same class can register in the global registry or in a scoped registry. Apps use scoped registries when one page loads more than one version of Spectrum Web Components.

### Tag name and dependencies

Declare `tagName` as the first class member. If the component renders other SWC elements in its shadow root, or needs child elements to work, import their classes and list them in `dependencies`:

```ts
import { UiIcon } from '../ui-icons/UiIcon.js';

export class CloseButton extends ButtonBase {
  public static override readonly tagName = 'swc-close-button';
  public static override readonly dependencies = [UiIcon];

  // ...
}
```

`define()` registers the `dependencies` first, then the class. Leave out `dependencies` when the component renders only native elements and slots, like Badge.

- List an element in `dependencies` when the component renders it in its shadow root, like `UiIcon` in Close Button, or can't work without it as a child, like `Tab` and `TabPanel` in Tabs.
- Don't list children the consumer chooses, like the buttons in a button group.
- Never import another component's `swc-*.js` file from a component module. It registers that element globally as a side effect. ESLint's `no-restricted-imports` rule reports it.
- Render workflow icons with their `Icon_*` SVG function inside `<swc-icon>`, and list `Icon` in `dependencies`. Workflow icon element modules (`swc-icon-*.js`) register globally when imported.

### SWC registration file

The `swc-<tag>.ts` file imports the class, declares the element in `HTMLElementTagNameMap`, and calls `define()`. Keep other code out of it:

```ts
import { Badge } from './Badge.js';

declare global {
  interface HTMLElementTagNameMap {
    'swc-badge': Badge;
  }
}

Badge.define();
```

Without an argument, `define()` uses the global registry. Apps that use scoped registries call `Badge.define(registry)` instead; see the "Scoped registries" guide in Storybook.
