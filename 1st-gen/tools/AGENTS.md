# 1st-Gen Tools — Agent Guide

Shared packages used by all 1st-gen components. Before writing any new utility, mixin, or controller logic in a component, check here first — the pattern you need likely already exists.

Tools are not components and are not registered as custom elements. They are imported as regular TypeScript modules.

---

## Packages

### `@spectrum-web-components/base`

**The foundation. Every component imports from here.**

Provides the `SpectrumElement` base class, `SizedMixin`, Lit re-exports, decorators, and directives. If a component needs `html`, `css`, `@property`, `@query`, or `classMap`, it comes from here — not from `lit` directly.

```typescript
import {
  html,
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
  when,
} from '@spectrum-web-components/base/src/directives.js';
import { SizedMixin } from '@spectrum-web-components/base/src/sized-mixin.js';
```

`SizedMixin` standardizes the `size` attribute (`s`, `m`, `l`, `xl`, etc.) across components. Pass `{ noDefaultSize: true }` when the component requires an explicit size.

### `@spectrum-web-components/shared`

**DOM utilities and mixins for common behaviors.**

Import directly from the source file rather than the package root:

| Export                | File                           | Use for                                          |
| --------------------- | ------------------------------ | ------------------------------------------------ |
| `Focusable`           | `src/focusable.js`             | Components that manage their own focus element   |
| `ObserveSlotText`     | `src/observe-slot-text.js`     | Detecting whether a slot has text content        |
| `ObserveSlotPresence` | `src/observe-slot-presence.js` | Detecting whether a slot has any content         |
| `LikeAnchor`          | `src/like-anchor.js`           | Button/link components that behave like anchors  |
| `getLabelFromSlot`    | `src/get-label-from-slot.js`   | Extracting accessible labels from slot content   |
| `firstFocusableIn`    | `src/first-focusable-in.js`    | Finding the first focusable element in a subtree |
| `randomId`            | `src/random-id.js`             | Generating unique IDs for ARIA relationships     |

Mixins compose by nesting — read inside-out:

```typescript
// Focusable is base; LikeAnchor wraps it; ObserveSlotText wraps that
export class ButtonBase extends ObserveSlotText(LikeAnchor(Focusable), '') { ... }
```

### `@spectrum-web-components/reactive-controllers`

**Lit Reactive Controllers for complex stateful UI patterns.**

Add to a component via the standard Lit controller API (`new XController(this)`). Do not reimplement these patterns inside individual components.

| Controller                     | Use for                                                               |
| ------------------------------ | --------------------------------------------------------------------- |
| `FocusGroupController`         | Managing focus across a group of elements (e.g. radio group, toolbar) |
| `RovingTabindexController`     | Keyboard arrow-key navigation within a container                      |
| `PendingStateController`       | Pending/loading state with visual feedback                            |
| `ColorController`              | Color value parsing, conversion, and state (used by color picker)     |
| `LanguageResolutionController` | Resolving the active locale from context or `<html lang>`             |
| `SystemContextResolution`      | Reading system theme context (e.g. light/dark from `sp-theme`)        |
| `MatchMedia`                   | Observing media query changes reactively                              |

```typescript
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';

private rovingTabindex = new RovingTabindexController(this, {
  elements: () => this.queryItems(),
});
```

### `@spectrum-web-components/styles`

**Global Spectrum design tokens as CSS files.**

Not imported by components directly — consumed by `sp-theme` and by the Storybook setup to apply global tokens. Contains typography styles, scale variants (`scale-medium.css`, `scale-large.css`), color theme files, and the token system (`tokens/` and `tokens-v2/`).

Do not edit files in this package manually. Token files are generated.

### `@spectrum-web-components/theme`

**The `sp-theme` custom element — the theming provider.**

Wraps application content and supplies CSS custom property tokens to all descendant components. Components do not import from theme; consumers do:

```html
<sp-theme color="light" scale="medium" system="spectrum">
  <sp-badge variant="positive">Active</sp-badge>
</sp-theme>
```

Supports `color` (`light`, `dark`), `scale` (`medium`, `large`), and `system` attributes. If a component's styles look broken in isolation, it likely needs to be wrapped in `sp-theme` to receive its tokens.
