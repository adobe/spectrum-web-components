# Focusgroup environment (`focusgroup-env`)

Utilities for the proposed HTML **`focusgroup`** attribute (Open UI / HTML). Use them with `CompositeFocusNavigationController` or on their own when you only need detection or attribute strings.

**Package:** `@spectrum-web-components/core/controllers/focusgroup-env.js`  
**Barrel:** also re-exported from `@spectrum-web-components/core/controllers/index.js`

## Feature detection

### `hasNativeFocusgroup(): boolean`

Returns `true` when `'focusgroup' in HTMLElement.prototype` (Chromium’s suggested check). If the IDL moves to `Element`, update this function only.

## Types

### `FocusgroupAxis`

`'inline' | 'block' | 'both'`

Logical axes included in the attribute string. `both` emits `inline` and `block`.

### `SwcCompositeKind`

Spectrum-oriented labels used to pick a **default** attribute string (not spec enums):

`'toolbar' | 'tablist' | 'menubar' | 'menu' | 'listbox' | 'radiogroup' | 'accordion-headers' | 'segmented-control' | 'generic-linear'`

### `FocusgroupMemoryMode`

`'memory' | 'nomemory'` — maps to presence of the `nomemory` token when `nomemory`.

### `NativeFocusgroupOptions`

| Field     | Type                   | Description                                                |
| --------- | ---------------------- | ---------------------------------------------------------- |
| `axis`    | `FocusgroupAxis`       | Which axes participate.                                    |
| `wrap?`   | `boolean`              | `true` → `wrap`, `false` → `nowrap`; omit → neither token. |
| `memory?` | `FocusgroupMemoryMode` | `nomemory` adds the `nomemory` token.                      |

## Functions

### `buildFocusgroupAttribute(options: NativeFocusgroupOptions): string`

Builds a space-separated `focusgroup` attribute value (e.g. `inline block nowrap`). **Token grammar is proposal-stage** — update when the explainer or Chrome implementation changes.

### `defaultFocusgroupForKind(kind: SwcCompositeKind): string`

Returns a default string for each `SwcCompositeKind` (e.g. toolbar → inline, no wrap; menu → block; radiogroup → inline + wrap). Extend the implementation when new composites adopt the controller.

## Maintainer notes

- Reconcile tokens with the latest Open UI focusgroup explainer and Chromium shipping notes before relying on behavior in production.
- These helpers are dependency-free (no Lit), so they are safe to import from low-level code.
