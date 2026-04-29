---
component: divider
tag: swc-divider
package: '@adobe/spectrum-wc/divider'
status: preview
since: 0.0.1
sizes: [s, m, l]
default_size: m
boolean_attributes: [vertical]
enum_attributes:
  static-color: [white, black]
slots: []
events: []
methods: []
peer_components: []
not_for: [decorative-spacing, list-separators-with-semantics]
---

## When to use

- Visual separation between sibling content sections (e.g., between two cards, between header and body, between toolbar groups).
- Vertical separator inside a horizontal toolbar.

## When NOT to use

- For pure spacing → use CSS `margin` / `gap`.
- For list-item separators where screen-reader semantics matter → use a `<hr>` or `role="separator"` directly.
- For decorative borders on containers → use CSS `border`.

## Canonical import

```js
import '@adobe/spectrum-wc/divider';
```

## Minimal correct examples

```html
<!-- Default horizontal divider -->
<swc-divider></swc-divider>

<!-- Sizes (control thickness) -->
<swc-divider size="s"></swc-divider>
<swc-divider size="m"></swc-divider>
<swc-divider size="l"></swc-divider>

<!-- Vertical orientation (use inside flex/inline contexts) -->
<div style="display: flex; align-items: center; gap: 12px; height: 24px;">
  <span>Left</span>
  <swc-divider vertical></swc-divider>
  <span>Right</span>
</div>

<!-- Static color for use over images / colored backgrounds -->
<swc-divider static-color="white"></swc-divider>
<swc-divider static-color="black"></swc-divider>
```

## Accessibility contract

- The component sets: implicit visual separator. Non-interactive, non-focusable.
- The consumer SHOULD: ensure the divider visually separates content groups that screen-reader users can also distinguish via headings or list semantics — divider alone is decorative to AT.
- High-contrast mode: respected via `forced-colors`.

## Composition rules

- **Pairs with**: any layout container (cards, side panels, toolbars).
- **Conflicts with**: nesting interactive elements inside a divider (it accepts no slots).
- For toolbars, use `vertical` and ensure parent has a defined height.

## Runtime constraints

- `static-color` valid values are `white` and `black`. Other values currently do not log a warning (validation TODO noted in `Divider.base.ts`), but only the documented values are supported.
- `vertical` requires a parent with a defined cross-axis size; otherwise the divider has zero length.

## Common LLM mistakes

- ❌ Using `<swc-divider>` for spacing — use CSS `margin` instead. Dividers carry visual weight.
- ❌ Setting `vertical` on a divider in a block-flow context without a height — divider collapses to nothing.
- ❌ Putting children inside `<swc-divider>...</swc-divider>` — there is no slot.
- ❌ Using arbitrary `static-color` values like `static-color="red"` — only `white` and `black` are supported.
- ❌ Adding ARIA roles like `role="separator"` manually — only do this if the surrounding semantics genuinely demand it; in most decorative cases, leave it off.

## Spectrum 1 → Spectrum 2 differences

| Area                   | S1 (`sp-divider`)                          | S2 (`swc-divider`)           |
| ---------------------- | ------------------------------------------ | ---------------------------- |
| Tag                    | `sp-divider`                               | `swc-divider`                |
| Package                | `@spectrum-web-components/divider`         | `@adobe/spectrum-wc/divider` |
| Custom-property prefix | `--mod-divider-*` / `--spectrum-divider-*` | `--swc-divider-*`            |

API surface is otherwise unchanged.
