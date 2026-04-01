# Grid focus navigation (`grid-focus-navigation`)

`GridFocusNavigationController` implements **two-dimensional**, row-major keyboard navigation for `role="grid"`-style layouts. It is an explicit **extension** beyond linear HTML `focusgroup`, which does not define full data-grid semantics.

**Package:** `@spectrum-web-components/core/controllers/grid-focus-navigation.js`  
**Barrel:** `@spectrum-web-components/core/controllers/index.js`

## Layout contract

`elements()` must return cell hosts in **row-major** order:

- Indices `0 … columnCount - 1` are row 0, then row 1, etc.
- The last row may be short; bounds clamp to `elements().length`.

## Class: `GridFocusNavigationController`

Implements Lit’s `ReactiveController`.

### Constructor

```typescript
new GridFocusNavigationController(
  host: ReactiveElement,
  config: GridFocusNavigationConfig
)
```

### Methods

| Method                                                  | Description                                            |
| ------------------------------------------------------- | ------------------------------------------------------ |
| `updateConfig(config: GridFocusNavigationConfig): void` | Replace config and clear cached `elements()`.          |
| `hostConnected()` / `hostDisconnected()`                | Add/remove `focusin`, `focusout`, `keydown` on `root`. |
| `hostUpdated()`                                         | Clears cached elements after render.                   |

## `GridFocusNavigationConfig`

| Property                  | Type                                 | Description                                                  |
| ------------------------- | ------------------------------------ | ------------------------------------------------------------ |
| `elements`                | `() => HTMLElement[]`                | **Required.** Cell roots in row-major order.                 |
| `columnCount`             | `number \| (() => number)`           | **Required.** Columns per row; minimum effective value is 1. |
| `isItemFocusable?`        | `(el: HTMLElement) => boolean`       | Skip cells when false.                                       |
| `wrap?`                   | `boolean \| (() => boolean)`         | Wrap within row or column slices when true.                  |
| `onNavigateToItem?`       | `(el: HTMLElement) => void`          | Called when focus moves to a new cell (keyboard path).       |
| `stopKeydownPropagation?` | `boolean`                            | `stopPropagation` after handling.                            |
| `root?`                   | `HTMLElement \| (() => HTMLElement)` | Event root; defaults to host.                                |

## Keys (current implementation)

| Key                    | Behavior                                                           |
| ---------------------- | ------------------------------------------------------------------ |
| ArrowLeft / ArrowRight | Previous / next cell in **current row** (respects short last row). |
| ArrowUp / ArrowDown    | Same column, **previous / next row**.                              |
| Home                   | First focusable cell in **current row**.                           |
| End                    | Last focusable cell in **current row**.                            |

**Not yet implemented:** Page Up/Down, Ctrl+Home/End, merged cells, virtualization, full RTL / logical grid mapping, edit-mode vs navigation-mode for cells that contain widgets.

## Accessibility

Same rule as linear navigation: **focus management only** — grid `role`, cell labels, and selection state remain the author’s responsibility per APG.

## Native `focusgroup`

Do not assume nested linear `focusgroup`s replace this controller for complex grids; validate with product QA and browser builds.
