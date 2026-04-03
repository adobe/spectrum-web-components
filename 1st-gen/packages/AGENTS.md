# 1st-Gen Packages — Agent Guide

This directory contains 69 packages: 59 component packages and 10 shared tool packages. Components are being migrated to 2nd-gen one at a time — see [`1st-gen/AGENTS.md`](../AGENTS.md) for context on the deprecation direction.

---

## Finding your way around

```text
packages/
├── accordion/         # Component packages (alphabetical)
├── badge/
├── button/
├── ...                # 59 total component packages
└── underlay/
```

```text
tools/
├── base/              # SpectrumElement, SizedMixin, Lit re-exports — imported by every component
├── shared/            # Focusable, ObserveSlot*, LikeAnchor, DOM utilities
├── reactive-controllers/  # FocusGroup, RovingTabindex, PendingState, ColorController, ...
├── styles/            # Global Spectrum tokens and CSS
├── theme/             # sp-theme provider component
├── bundle/
├── grid/
└── opacity-checkerboard/
```

**Components always live in `packages/`.** If you need shared behavior or utilities, look in `tools/` before writing new code — most common patterns are already implemented there.

---

## Component anatomy

Every component follows the same layout:

```text
packages/badge/
├── src/
│   ├── Badge.ts              # Component class — the main file
│   ├── index.ts              # Re-exports Badge
│   ├── badge.css             # Component-specific styles + @import of spectrum-badge.css
│   ├── badge-overrides.css   # Additional overrides (often minimal)
│   └── spectrum-badge.css    # Spectrum design CSS (generated from Spectrum CSS)
├── sp-badge.ts               # Element registration (customElements.define)
├── stories/
│   └── badge.stories.ts
├── test/
│   ├── badge.test.ts
│   ├── badge.a11y.spec.ts
│   └── benchmark/
└── package.json
```

More complex packages may include additional source files: a shared `ButtonBase.ts`, a `CheckboxMixin.ts`, or multiple element classes (`Accordion.ts` + `AccordionItem.ts`).

---

## Component class pattern

```typescript
// src/Badge.ts
import {
  CSSResultArray,
  html,
  nothing,
  TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import {
  BadgeBase,
  BADGE_VARIANTS_S1,
  type BadgeVariantS1,
} from '@spectrum-web-components/core/components/badge';
import styles from './badge.css.js';

export class Badge extends BadgeBase {
  static override readonly VARIANTS = BADGE_VARIANTS_S1;

  @property({ type: String, reflect: true })
  public override variant: BadgeVariantS1 = 'informative';

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      ${this.hasIcon
        ? html`
            <slot name="icon"></slot>
          `
        : nothing}
      <div class="label"><slot></slot></div>
    `;
  }
}
```

**Key rules:**

- Always import `html`, `CSSResultArray`, `TemplateResult` from `@spectrum-web-components/base` — not from `lit` directly
- Import decorators from `@spectrum-web-components/base/src/decorators.js`
- CSS is imported as `.css.js` — this is the build output of `.css` processed by PostCSS. Edit the `.css` source, not the generated file.
- Use `reflect: true` on all properties that map to HTML attributes
- Properties with hyphenated attribute names use the `attribute` option: `@property({ attribute: 'pending-label' })`

---

## Element registration

Each component has a top-level `sp-<name>.ts` file that imports the class and registers it:

```typescript
// sp-badge.ts
import { Badge } from './src/Badge.js';
export * from './src/index.js';
customElements.define('sp-badge', Badge);
```

The `sp-<name>.ts` file is what consumers import to register the element. It is listed as a side effect in `package.json` so bundlers don't tree-shake it.

---

## CSS structure

Each component has a three-layer CSS hierarchy:

| File                   | Purpose                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `spectrum-<name>.css`  | Spectrum design tokens and base styles (generated — treat as read-only)             |
| `<name>.css`           | Component-specific layout, slot sizing, and overrides; `@import`s the spectrum file |
| `<name>-overrides.css` | Additional overrides; often minimal or empty                                        |

Only edit `<name>.css` and `<name>-overrides.css`. The `spectrum-<name>.css` file is generated from Spectrum CSS and will be overwritten.

CSS custom properties follow the `--spectrum-*` prefix convention and rely on tokens provided by `@spectrum-web-components/theme`.

---

## Shared tools — when to use what

### `@spectrum-web-components/base`

The foundation. Every component imports from here.

```typescript
import {
  html,
  css,
  CSSResultArray,
  TemplateResult,
  nothing,
} from '@spectrum-web-components/base';
import {
  property,
  query,
  state,
} from '@spectrum-web-components/base/src/decorators.js';
import {
  ifDefined,
  classMap,
} from '@spectrum-web-components/base/src/directives.js';
```

Also provides `SizedMixin` for components with size variants:

```typescript
import { SizedMixin } from '@spectrum-web-components/base/src/sized-mixin.js';
export class Badge extends SizedMixin(BadgeBase, { noDefaultSize: true }) { ... }
```

### `@spectrum-web-components/shared`

Utilities and mixins for common behaviors. Import directly from the file, not the package root:

```typescript
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import { ObserveSlotText } from '@spectrum-web-components/shared/src/observe-slot-text.js';
import { ObserveSlotPresence } from '@spectrum-web-components/shared/src/observe-slot-presence.js';
import { LikeAnchor } from '@spectrum-web-components/shared/src/like-anchor.js';
```

Mixins compose using nesting:

```typescript
export class ButtonBase extends ObserveSlotText(LikeAnchor(Focusable), '') { ... }
```

### `@spectrum-web-components/reactive-controllers`

Controllers for complex stateful behaviors. Add to components via the Lit controller API:

```typescript
import { PendingStateController } from '@spectrum-web-components/reactive-controllers/src/PendingState.js';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';
import { FocusGroupController } from '@spectrum-web-components/reactive-controllers/src/FocusGroup.js';

// Usage inside a component:
private pendingState = new PendingStateController(this);
```

Use `FocusGroupController` or `RovingTabindexController` for keyboard navigation in container components (menus, tabs, radio groups, etc.). Do not reimplement these patterns.

### `@spectrum-web-components/theme`

Provides `sp-theme` — the theming provider that wraps components and supplies CSS tokens. Components themselves do not import from theme; consumers wrap their app in `<sp-theme color="light" scale="medium">`.

---

## Mixin composition pattern

Multiple mixins are composed by nesting function calls, outermost first:

```typescript
export class MyComponent extends SizedMixin(
  ObserveSlotText(
    LikeAnchor(Focusable),
    ''
  ),
  { noDefaultSize: true }
) { ... }
```

Read the composition inside-out: `Focusable` is the base, `LikeAnchor` wraps it, `ObserveSlotText` wraps that, and `SizedMixin` is the outermost wrapper.

---

## Component dependencies

Components freely depend on and compose other components. Declare them in `package.json` dependencies and import their registration file:

```typescript
// Import registration side-effect — registers the element
import '@spectrum-web-components/action-menu/sp-action-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';

// Import the class for type usage
import { ActionMenu } from '@spectrum-web-components/action-menu';
```

Icons are always imported as side effects:

```typescript
import '@spectrum-web-components/icons-ui/icons/sp-icon-checkmark75.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-folder-open.js';
```

---

## Package exports pattern

Every component `package.json` exports a dual development/production bundle:

```json
{
  "exports": {
    ".": {
      "development": "./src/index.dev.js",
      "default": "./src/index.js"
    },
    "./sp-badge.js": {
      "development": "./sp-badge.dev.js",
      "default": "./sp-badge.js"
    }
  },
  "sideEffects": ["./sp-*.js", "./**/*.dev.js"]
}
```

The `.dev.js` files include additional debug information. The `sideEffects` array tells bundlers which files must never be tree-shaken.

---

## Deprecation conventions

Standalone const and type exports from 1st-gen packages are deprecated in favor of static properties on the element class. When you encounter deprecated exports, do not spread their use:

```typescript
/**
 * @deprecated Access Badge.VARIANTS from the constructor instead.
 */
export const BADGE_VARIANTS = BADGE_VARIANTS_S1;
```

New code should use `Badge.VARIANTS` directly — this aligns with 2nd-gen conventions.

---

## projects/

Non-component workspaces that support development but are not published as components:

| Project                  | Purpose                                      |
| ------------------------ | -------------------------------------------- |
| `css-custom-vars-viewer` | Interactive viewer for CSS custom properties |
| `documentation`          | Documentation site generator                 |
| `story-decorator`        | Storybook decorator components               |
| `templates`              | Starter templates                            |
| `types`                  | Shared TypeScript type definitions           |
| `vrt-compare`            | Visual regression testing comparison tool    |
