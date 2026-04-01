# Core controllers overview

This folder contains **Lit reactive controllers** and **focus utilities** shared by 2nd-gen Spectrum Web Components. They are published from `@spectrum-web-components/core/controllers` (and deep imports such as `@spectrum-web-components/core/controllers/composite-focus-navigation.js`).

## Packages

| Topic               | Module                          | Documentation                                                                       |
| ------------------- | ------------------------------- | ----------------------------------------------------------------------------------- |
| Locale              | `language-resolution.js`        | [language-resolution.md](./language-resolution.md) — `LanguageResolutionController` |
| Linear composites   | `composite-focus-navigation.js` | [composite-focus-navigation.md](./composite-focus-navigation.md)                    |
| 2D grids            | `grid-focus-navigation.js`      | [grid-focus-navigation.md](./grid-focus-navigation.md)                              |
| `focusgroup` tokens | `focusgroup-env.js`             | [focusgroup-env.md](./focusgroup-env.md)                                            |

## Import examples

```typescript
import {
  CompositeFocusNavigationController,
  hasNativeFocusgroup,
} from '@spectrum-web-components/core/controllers/index.js';

import { GridFocusNavigationController } from '@spectrum-web-components/core/controllers/index.js';

import {
  buildFocusgroupAttribute,
  defaultFocusgroupForKind,
} from '@spectrum-web-components/core/controllers/focusgroup-env.js';
```

## Storybook

In 2nd-gen Storybook, open **Core / Controllers** for Markdown API pages that mirror these files.

## Related source

Implementation lives next to this documentation as `.ts` files in the same directory. Prefer the TypeScript source and JSDoc when verifying behavior; update these `.md` files when public API or semantics change.
