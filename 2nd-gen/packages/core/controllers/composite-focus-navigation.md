# Composite focus navigation (`composite-focus-navigation`)

`CompositeFocusNavigationController` implements **linear** composite keyboard navigation for toolbars, tab lists, menus, accordion headers, and similar patterns.

**Package:** `@spectrum-web-components/core/controllers/composite-focus-navigation.js`  
**Barrel:** `@spectrum-web-components/core/controllers/index.js`

## Behavior

1. **Native path** — If `hasNativeFocusgroup()` is true and `forcePolyfill` is not set, the controller sets `focusgroup="…"` on the configured **root** (default: Lit host). The browser handles arrow keys and tab collapsing per the platform proposal.
2. **Polyfill path** — Otherwise a `LinearFocusgroupPolyfill` attaches `focusin`, `focusout`, and `keydown` on the root, manages roving `tabIndex` on `elements()`, and handles arrows + Home/End.

**Grids:** use `GridFocusNavigationController`; do not use this controller alone for full APG data-grid behavior.

## Class: `CompositeFocusNavigationController`

Implements Lit’s `ReactiveController`.

### Constructor

```typescript
new CompositeFocusNavigationController(
  host: ReactiveElement,
  config: CompositeFocusNavigationConfig
)
```

Registers itself with `host.addController(this)` immediately.

### Methods

| Method                                                       | Description                                                                                                                  |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `updateConfig(config: CompositeFocusNavigationConfig): void` | Replace the full config (e.g. new `elements()` closure after slot changes). Updates native attribute and syncs the polyfill. |
| `hostConnected()`                                            | Sets `focusgroup` or attaches polyfill listeners (Lit lifecycle).                                                            |
| `hostDisconnected()`                                         | Removes `focusgroup` or detaches listeners.                                                                                  |
| `hostUpdated()`                                              | Re-syncs native attribute or refreshes polyfill cache (Lit lifecycle).                                                       |

## `CompositeFocusNavigationConfig`

| Property                  | Type                                                | Description                                                                                               |
| ------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `elements`                | `() => HTMLElement[]`                               | **Required.** Ordered item roots for the polyfill; native path still uses this for authoring consistency. |
| `root?`                   | `HTMLElement \| (() => HTMLElement)`                | Listener / attribute target; defaults to host.                                                            |
| `direction?`              | `LinearDirection \| (() => LinearDirection)`        | Polyfill: `horizontal` (Left/Right), `vertical` (Up/Down), `both` (all four). Default `both`.             |
| `wrap?`                   | `boolean \| (() => boolean)`                        | Polyfill: wrap at ends. Default false.                                                                    |
| `isItemFocusable?`        | `(el: HTMLElement) => boolean`                      | Polyfill: skip items when false. Default all true.                                                        |
| `hostDelegatesFocus?`     | `boolean`                                           | Documented for future parity; polyfill currently applies roving `tabIndex` on item roots uniformly.       |
| `onNavigateToItem?`       | `(el: HTMLElement) => void`                         | Polyfill: called before `focus()` when moving via keyboard.                                               |
| `stopKeydownPropagation?` | `boolean`                                           | Polyfill: `stopPropagation` after handling.                                                               |
| `kind?`                   | `SwcCompositeKind`                                  | Native: default `focusgroup` string via `defaultFocusgroupForKind`.                                       |
| `nativeFocusgroup?`       | `NativeFocusgroupOptions \| (() => string \| null)` | Native: custom attribute; function form can return `null` to skip.                                        |
| `forcePolyfill?`          | `boolean`                                           | Force polyfill even when native exists (tests / rollout).                                                 |

## `LinearDirection`

`'horizontal' | 'vertical' | 'both'`

## Re-exports from `focusgroup-env`

Also exported from this module for convenience:

- `buildFocusgroupAttribute`, `defaultFocusgroupForKind`, `hasNativeFocusgroup`
- Types: `FocusgroupAxis`, `NativeFocusgroupOptions`, `SwcCompositeKind`

## Accessibility

This controller **moves focus only**. Authors must provide correct **roles**, **names**, and **states** (e.g. `aria-selected`, `aria-expanded`) per WAI-ARIA APG.

## Limits (polyfill)

- RTL and `writing-mode` logical mapping is incomplete; prefer the **native** path when available for those cases.
- Focus targets inside **shadow roots** of items are resolved via `composedPath()` / shadow host mapping; supply stable item roots in `elements()`.
